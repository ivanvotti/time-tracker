import Component from 'ember-component';
import get from 'ember-metal/get';
import { setProperties } from 'ember-metal/set';
import { setDiff, sort } from 'ember-computed';
import computed, { on } from 'ember-computed-decorators';
import { EKMixin, keyUp } from 'ember-keyboard';

export default Component.extend(EKMixin, {
  classNames: ['c-tag-picker__list'],
  allTags: null,
  selectedTags: null,
  inputValue: null,
  tagsSorting: ['name'],

  availableTags: setDiff('allTags', 'selectedTags'),
  sortedFilteredTags: sort('filteredAvailableTags', 'tagsSorting'),

  @computed('inputValue', 'availableTags.@each.name')
  filteredAvailableTags(inputValue, availableTags) {
    if (inputValue) {
      let upperInputValue = inputValue.toUpperCase();

      return availableTags.filter((tag) => (
        get(tag, 'name').toUpperCase().startsWith(upperInputValue)
      ));
    }

    return availableTags;
  },

  @computed('inputValue', 'allTags.[]', 'selectedTags.[]')
  canCreateTag(inputValue, allTags, selectedTags) {
    if (!inputValue) {
      return false;
    }

    let upperInputValue = inputValue.toUpperCase();
    let isTagNameUniqueInAll = !allTags.any((tag) => (
      get(tag, 'name').toUpperCase() === upperInputValue
    ));
    let isTagNameUniqueInSelected = !selectedTags.any((tag) => (
      get(tag, 'name').toUpperCase() === upperInputValue
    ));

    return isTagNameUniqueInAll && isTagNameUniqueInSelected;
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
    setProperties(this, {
      keyboardActivated: true,
      keyboardFirstResponder: true
    });
  },

  resetActiveItem() {
    let $items = this.$('.js-tag-picker-list-item');
    $items.removeClass('is-active');

    if (get(this, 'inputValue')) {
      $items.first().addClass('is-active');
    }
  },

  @on(keyUp('ArrowUp'))
  onArrowUp() {
    let $selectedItem = this.$('.is-active');
    let $newSelectedItem = $selectedItem.prev();

    if ($newSelectedItem.length) {
      $selectedItem.removeClass('is-active');
      $newSelectedItem
        .addClass('is-active')
        .get(0)
        .scrollIntoViewIfNeeded(false);
    }
  },

  @on(keyUp('ArrowDown'))
  onArrowDown() {
    let $selectedItem = this.$('.is-active');
    let $newSelectedItem = $selectedItem.next();

    if ($newSelectedItem.length) {
      $selectedItem.removeClass('is-active');
      $newSelectedItem
        .addClass('is-active')
        .get(0)
        .scrollIntoViewIfNeeded(false);
    } else if (!$selectedItem.length) {
      this.$('.js-tag-picker-list-item')
        .first()
        .addClass('is-active');
    }
  },

  @on(keyUp('Enter'))
  onEnter() {
    let $selectedItem = this.$('.is-active');

    if ($selectedItem.length) {
      $selectedItem.click();
      get(this, 'element').scrollTop = 0;
    } else if (!get(this, 'inputValue')) {
      this.attrs.onEmptyEnter();
    }
  },

  @on(keyUp('Escape'))
  onEscape() {
    this.attrs.onEscape();
  }
});
