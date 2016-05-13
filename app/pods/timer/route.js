import Route from 'ember-route';
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
      if (tag.get('isMock')) {
        return this.store.createRecord('tag', { name: tag.get('name') });
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
      newEntry.get('tags').addObjects(entryTags);
      await RSVP.all(entryTags.map((tag) => tag.save()));

      return newEntry.save();
    },

    async updateEntry(entry, formData) {
      let entryTags = await entry.get('tags');
      let formTags = this.createTagsFromMocks(formData.tags);
      await this.updateEntryTags(entryTags, formTags);

      entry.setProperties({
        name: formData.name
      });

      return entry.save();
    },

    async destroyEntry(entry) {
      let entryTags = await entry.get('tags');
      await this.detachEntryTags(entryTags);

      return entry.destroyRecord();
    },

    async restartEntry(sourceEntry) {
      let sourceTags = await sourceEntry.get('tags');
      let newEntry = this.store.createRecord('time-entry', {
        name: sourceEntry.get('name'),
        tags: sourceTags,
        startedAt: new Date()
      });

      await newEntry.save();
      await RSVP.all(sourceTags.map((tag) => tag.save()));

      return newEntry;
    },

    stopEntry(entry) {
      let startedAt = entry.get('startedAt');
      let endedAt = new Date();

      entry.setProperties({
        endedAt,
        duration: moment(endedAt).diff(startedAt, 'seconds')
      });

      return entry.save();
    }
  }
});
