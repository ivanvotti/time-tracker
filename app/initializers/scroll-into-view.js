/**
  Polyfill for scrollIntoViewIfNeeded
  taken from https://gist.github.com/hsablonniere/2581101
*/

export function initialize() {
  if (!Element.prototype.scrollIntoViewIfNeeded) {
    Element.prototype.scrollIntoViewIfNeeded = function (isCentered) {
      function isWithinBounds(value, min, max, extent) {
        if (isCentered === false || max <= value + extent && value <= min + extent) {
          return Math.min(max, Math.max(min, value));
        }

        return (min + max) / 2;
      }

      function makeArea(left, top, width, height) {
        return {
          left,
          top,
          width,
          height,
          right: left + width,
          bottom: top + height,

          translate(x, y) {
            return makeArea(x + left, y + top, width, height);
          },

          relativeFromTo(_lhs, _rhs) {
            let newLeft = left;
            let newTop = top;
            let lhs = _lhs.offsetParent;
            let rhs = _rhs.offsetParent;

            if (lhs === rhs) {
              return this;
            }

            for (; lhs; lhs = lhs.offsetParent) {
              newLeft += lhs.offsetLeft + lhs.clientLeft;
              newTop += lhs.offsetTop + lhs.clientTop;
            }

            for (; rhs; rhs = rhs.offsetParent) {
              newLeft -= rhs.offsetLeft + rhs.clientLeft;
              newTop -= rhs.offsetTop + rhs.clientTop;
            }

            return makeArea(newLeft, newTop, width, height);
          }
        };
      }

      let elem = this;
      let parent = elem.parentNode;
      let area = makeArea(this.offsetLeft, this.offsetTop,
                          this.offsetWidth, this.offsetHeight);

      while (parent instanceof HTMLElement) {
        let clientLeft = parent.offsetLeft + parent.clientLeft;
        let clientTop = parent.offsetTop + parent.clientTop;

        // Make area relative to parent's client area.
        area = area.relativeFromTo(elem, parent)
          .translate(-clientLeft, -clientTop);

        parent.scrollLeft = isWithinBounds(
          parent.scrollLeft,
          area.right - parent.clientWidth,
          area.left,
          parent.clientWidth
        );

        parent.scrollTop = isWithinBounds(
          parent.scrollTop,
          area.bottom - parent.clientHeight,
          area.top,
          parent.clientHeight
        );

        // Determine actual scroll amount by reading back scroll properties.
        area = area.translate(
          clientLeft - parent.scrollLeft,
          clientTop - parent.scrollTop
        );

        elem = parent;
        parent = elem.parentNode;
      }
    };
  }
}

export default {
  name: 'scroll-into-view',
  initialize
};
