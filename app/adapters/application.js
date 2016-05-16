import set from 'ember-metal/set';
import get from 'ember-metal/get';
import { Adapter } from 'ember-pouch';
import PouchDB from 'pouchdb';
import config from 'time-tracker/config/environment';

function setupDb() {
  let localDb = new PouchDB(config.emberPouch.localDb);

  if (config.emberPouch.remoteDb) {
    let remoteDb = new PouchDB(config.emberPouch.remoteDb, {
      ajax: { timeout: 20000 }
    });

    localDb.sync(remoteDb, {
      live: true,
      retry: true
    });
  }

  return localDb;
}

export default Adapter.extend({
  init() {
    this._super(...arguments);
    set(this, 'db', setupDb());
  },

  // Load all records into memory as they arrive.
  unloadedDocumentChanged(obj) {
    let store = get(this, 'store');
    let recordTypeName = this.getRecordTypeName(store.modelFor(obj.type));

    get(this, 'db').rel.find(recordTypeName, obj.id).then(function(doc) {
      store.pushPayload(recordTypeName, doc);
    });
  }
});
