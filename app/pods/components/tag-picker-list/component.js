import Ember from 'ember';
import computed, { on } from 'ember-computed-decorators';
import { EKMixin, keyUp } from 'ember-keyboard';

const { setDiff, sort } = Ember.computed;

export default Ember.Component.extend(EKMixin, {
  tags: null,
  selectedTags: null,
  inputValue: null,

  tagsSorting: ['name'],
  classNames: ['c-tag-picker__list'],

  availableTags: setDiff('tags', 'selectedTags'),

  sortedFilteredTags: sort('filteredTags', 'tagsSorting'),

  @computed('inputValue', 'availableTags.@each.name')
  filteredTags(inputValue, tags) {
    if (inputValue) {
      let upperInputValue = inputValue.toUpperCase();

      return tags.filter((tag) => (
        tag.get('name').toUpperCase().startsWith(upperInputValue)
      ));
    }

    return tags;
  },

  @computed('inputValue', 'tags.[]')
  canCreateTag(inputValue, tags) {
    if (!inputValue) {
      return false;
    }

    let upperInputValue = inputValue.toUpperCase();
    let isTagNameUnique = !tags.any((tag) => (
      tag.get('name').toUpperCase() === upperInputValue
    ));

    return isTagNameUnique;
  },

  @on(keyUp('ArrowUp'))
  onArrowUp() {
    let $current = this.$('.is-active');
    let $previous = $current.prev();

    if ($previous.length) {
      $current.removeClass('is-active');
      $previous.addClass('is-active');
    }
  },

  @on(keyUp('ArrowDown'))
  onArrowDown() {
    let $current = this.$('.is-active');
    let $next = $current.next();

    if (!$current.length) {
      this.$('.c-tag-picker__list-item').first().addClass('is-active');
    } else if ($next.length) {
      $current.removeClass('is-active');
      $next.addClass('is-active');
    }
  },

  @on(keyUp('Enter'))
  onEnter() {
    this.$('.is-active').click();
  },

  @on(keyUp('Escape'))
  onEscape() {
    this.get('close')();
  },

  @on('didInsertElement')
  activateKeyboard() {
    this.setProperties({
      keyboardActivated: true,
      keyboardFirstResponder: true
    });
  },

  @on('didRender')
  resetActiveItem() {
    let $items = this.$('.c-tag-picker__list-item');
    $items.removeClass('is-active');

    if (this.get('inputValue')) {
      $items.first().addClass('is-active');
    }
  }
});
