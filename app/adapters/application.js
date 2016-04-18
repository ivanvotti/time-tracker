import { Adapter } from 'ember-pouch';
import PouchDB from 'pouchdb';
import config from 'time-tracker/config/environment';

function setupDb() {
  let localDb = new PouchDB(config.emberPouch.localDb);

  if (config.emberPouch.remoteDb) {
    let remoteDb = new PouchDB(config.emberPouch.remoteDb);

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
    this.set('db', setupDb());
  }
});
