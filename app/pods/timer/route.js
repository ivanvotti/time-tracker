import Route from 'ember-route';
import get from 'ember-metal/get';
import set, { setProperties } from 'ember-metal/set';
import RSVP from 'rsvp';
import moment from 'moment';

export default Route.extend({
  model() {
    return RSVP.hash({
      timeEntries: this.store.findAll('time-entry'),
      tags: this.store.findAll('tag')
    });
  },

  createTagsFromMocks(tagMocks) {
    return tagMocks.map((tag) => {
      if (get(tag, 'isMock')) {
        return this.store.createRecord('tag', { name: get(tag, 'name') });
      }

      return tag;
    });
  },

  async detachEntryTags(entryTags) {
    let detachedTags = entryTags.toArray();
    entryTags.removeObjects(detachedTags);

    return RSVP.all(detachedTags.map((tag) => tag.save()));
  },

  async updateEntryTags(entryTags, formTags) {
    let addedTags = formTags.filter((tag) => !entryTags.contains(tag));
    let removedTags = entryTags.filter((tag) => !formTags.contains(tag));

    entryTags.removeObjects(removedTags);
    entryTags.addObjects(addedTags);

    return RSVP.all(addedTags.concat(removedTags).map((tag) => tag.save()));
  },

  actions: {
    async createEntry(formData) {
      let newEntry = this.store.createRecord('time-entry', {
        name: formData.name,
        startedAt: new Date()
      });
      await newEntry.save();

      let entryTags = this.createTagsFromMocks(formData.tags);
      get(newEntry, 'tags').addObjects(entryTags);
      await RSVP.all(entryTags.map((tag) => tag.save()));

      return newEntry.save();
    },

    async updateEntry(entry, formData) {
      let entryTags = await get(entry, 'tags');
      let formTags = this.createTagsFromMocks(formData.tags);

      await this.updateEntryTags(entryTags, formTags);
      set(entry, 'name', formData.name);

      return entry.save();
    },

    async destroyEntry(entry) {
      let entryTags = await get(entry, 'tags');
      await this.detachEntryTags(entryTags);

      return entry.destroyRecord();
    },

    async restartEntry(sourceEntry) {
      let sourceTags = await get(sourceEntry, 'tags');
      let newEntry = this.store.createRecord('time-entry', {
        name: get(sourceEntry, 'name'),
        tags: sourceTags,
        startedAt: new Date()
      });

      await newEntry.save();
      await RSVP.all(sourceTags.map((tag) => tag.save()));

      return newEntry;
    },

    stopEntry(entry) {
      let startedAt = get(entry, 'startedAt');
      let endedAt = new Date();

      setProperties(entry, {
        endedAt,
        duration: moment(endedAt).diff(startedAt, 'seconds')
      });

      return entry.save();
    }
  }
});
