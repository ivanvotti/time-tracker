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

  didRender() {
    this._super(...arguments);
    this.resetActiveItem();
  },

  didInsertElement() {
    this._super(...arguments);
    this.activateKeyboard();
  },

  activateKeyboard() {
    this.setProperties({
      keyboardActivated: true,
      keyboardFirstResponder: true
    });
  },

  resetActiveItem() {
    let $items = this.$('.js-tag-picker__list-item');
    $items.removeClass('is-active');

    if (this.get('inputValue')) {
      $items.first().addClass('is-active');
    }
  },

  @on(keyUp('ArrowUp'))
  onArrowUp() {
    let $current = this.$('.is-active');
    let $previous = $current.prev();

    if ($previous.length) {
      $current.removeClass('is-active');
      $previous
        .addClass('is-active')
        .get(0)
        .scrollIntoViewIfNeeded(false);
    }
  },

  @on(keyUp('ArrowDown'))
  onArrowDown() {
    let $current = this.$('.is-active');
    let $next = $current.next();

    if (!$current.length) {
      this.$('.js-tag-picker__list-item')
        .first()
        .addClass('is-active')
        .get(0)
        .scrollIntoViewIfNeeded(false);
    } else if ($next.length) {
      $current.removeClass('is-active');
      $next
        .addClass('is-active')
        .get(0)
        .scrollIntoViewIfNeeded(false);
    }
  },

  @on(keyUp('Enter'))
  onEnter() {
    this.$('.is-active').click();
  },

  @on(keyUp('Escape'))
  onEscape() {
    this.get('close')();
  }
});
