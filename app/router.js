import EmberRouter from 'ember-router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('timer');
});

export default Router;
