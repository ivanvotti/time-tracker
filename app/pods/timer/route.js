import Ember from 'ember';
import moment from 'moment';

const { RSVP } = Ember;

export default Ember.Route.extend({
  model() {
    return RSVP.hash({
      timeEntries: this.store.findAll('time-entry'),
      tags: this.store.findAll('tag')
    });
  },

  async detachEntryTags(entry) {
    let entryTags = await entry.get('tags');
    let detachedTags = entryTags.toArray();
    entryTags.removeObjects(detachedTags);

    return RSVP.all(detachedTags.map((tag) => tag.save()));
  },

  createTagsFromMocks(tagMocks) {
    return tagMocks.map((tag) => {
      if (tag.get('isMock')) {
        return this.store.createRecord('tag', { name: tag.get('name') });
      }

      return tag;
    });
  },

  async updateEntryTags(entry, tagMocks) {
    let entryTags = await entry.get('tags');
    let formTags = this.createTagsFromMocks(tagMocks);
    let addedTags = formTags.filter((tag) => !entryTags.contains(tag));
    let removedTags = entryTags.filter((tag) => !formTags.contains(tag));

    entryTags.removeObjects(removedTags);
    entryTags.addObjects(addedTags);

    return RSVP.all(addedTags.concat(removedTags).map((tag) => tag.save()));
  },

  actions: {
    async addNewEntry(formData) {
      let entryTags = this.createTagsFromMocks(formData.tags);
      let newEntry = this.store.createRecord('time-entry', {
        name: formData.name,
        startedAt: new Date()
      });

      await newEntry.save();
      newEntry.get('tags').addObjects(entryTags);

      await RSVP.all(entryTags.map((tag) => tag.save()));
      return newEntry.save();
    },

    async restartEntry(sourceEntry) {
      let sourceTags = await sourceEntry.get('tags');
      let newEntry = this.store.createRecord('time-entry', {
        name: sourceEntry.get('name'),
        tags: sourceTags,
        startedAt: new Date()
      });

      await newEntry.save();
      return RSVP.all(sourceTags.map((tag) => tag.save()));
    },

    stopEntry(timeEntry) {
      let startedAt = timeEntry.get('startedAt');
      let endedAt = new Date();

      timeEntry.setProperties({
        endedAt,
        duration: moment(endedAt).diff(startedAt, 'seconds')
      });

      return timeEntry.save();
    },

    async updateEntry(timeEntry, formData) {
      timeEntry.setProperties({ name: formData.name });
      await this.updateEntryTags(timeEntry, formData.tags);
      return timeEntry.save();
    },

    async deleteEntry(timeEntry) {
      await this.detachEntryTags(timeEntry);
      return timeEntry.destroyRecord();
    }
  }
});
