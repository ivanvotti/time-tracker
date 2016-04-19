import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    submitForm() {
      let entryName = this.get('entryName');

      if (!entryName) {
        return;
      }

      this.attrs.addNewEntry(entryName);
    }
  }
});
