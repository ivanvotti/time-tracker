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

  detachEntryTags(entry) {
    return entry.get('tags').then((entryTags) => {
      let detachedTags = entryTags.toArray();
      entryTags.removeObjects(detachedTags);

      return RSVP.all(detachedTags.map((tag) => tag.save()));
    });
  },

  updateEntryTags(entry, _formTags) {
    return entry.get('tags').then((entryTags) => {
      let formTags = _formTags.map((tag) => {
        if (tag.get('isMock')) {
          return this.store.createRecord('tag', { name: tag.get('name') });
        }

        return tag;
      });

      let addedTags = formTags.filter((tag) => !entryTags.contains(tag));
      let removedTags = entryTags.filter((tag) => !formTags.contains(tag));

      entryTags.removeObjects(removedTags);
      entryTags.addObjects(addedTags);

      let promises = addedTags.concat(removedTags).map((tag) => tag.save());

      return RSVP.all(promises);
    });
  },

  actions: {
    addNewEntry(entryName) {
      return this.store.createRecord('time-entry', {
        name: entryName,
        startedAt: new Date()
      }).save();
    },

    restartEntry(sourceEntry) {
      return sourceEntry.get('tags').then((sourceEntryTags) => {
        let newEntry = this.store.createRecord('time-entry', {
          name: sourceEntry.get('name'),
          tags: sourceEntryTags,
          startedAt: new Date()
        });

        return newEntry.save().then(() => (
          RSVP.all(sourceEntryTags.map((tag) => tag.save()))
        ));
      });
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

    updateEntry(timeEntry, formData) {
      timeEntry.setProperties({ name: formData.name });

      return this.updateEntryTags(timeEntry, formData.tags)
        .then(() => timeEntry.save());
    },

    deleteEntry(timeEntry) {
      return this.detachEntryTags(timeEntry)
        .then(() => timeEntry.destroyRecord());
    }
  }
});
