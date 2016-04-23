import Ember from 'ember';
import computed from 'ember-computed-decorators';
import moment from 'moment';
import { task, timeout } from 'ember-concurrency';
import formatDuration from 'time-tracker/utils/format-duration';

export default Ember.Component.extend({
  timeEntry: null,
  duration: 0,
  classNames: ['c-time-entry', 'c-time-entry--current'],

  @computed('duration')
  durationDisplay(duration) {
    return formatDuration(duration);
  },

  didReceiveAttrs() {
    this._super(...arguments);

    let durationCountingTask = this.get('durationCountingTask');

    if (this.get('timeEntry')) {
      durationCountingTask.perform();
    } else {
      durationCountingTask.cancelAll();
    }
  },

  durationCountingTask: task(function* () {
    this.resetDuration();

    while (true) {
      yield timeout(1000);
      this.incrementProperty('duration');
    }
  }).restartable(),

  resetDuration() {
    let startedAt = this.get('timeEntry.startedAt');
    let duration = 0;

    if (startedAt) {
      duration = moment().diff(startedAt, 'seconds');
    }

    this.set('duration', duration);
  }
});
