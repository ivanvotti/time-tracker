/**
  The adapter below tells ember-data to automatically load all records into
  memory as they arrive.

  By default, to avoid slowdowns, ember-pouch only automatically reloads records
  that have already been used by ember-data. All new records are saved in
  the local database, but ember-data is not told to load them into memory.
*/
import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
  unloadedDocumentChanged(obj) {
    let store = this.get('store');
    let recordTypeName = this.getRecordTypeName(store.modelFor(obj.type));

    this.get('db').rel.find(recordTypeName, obj.id).then(function(doc) {
      store.pushPayload(recordTypeName, doc);
    });
  }
});
