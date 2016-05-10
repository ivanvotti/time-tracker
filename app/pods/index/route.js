import Route from 'ember-route';

export default Route.extend({
  beforeModel() {
    this.transitionTo('timer');
  }
});
