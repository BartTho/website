import { formatPrice } from '@data/shared';
import createVueApp from '@helpers/createVueApp';

const el = document.getElementById('vue-at-a-glance');

const data = {
  products: [],
  selectedIndex: 0,
};

const methods = {
  formatPrice,
  onKeyDown(e) {
    switch (e.key) {
      case 'ArrowLeft':
      case 'ArrowUp':
      case 'Left':
      case 'Up':
        e.preventDefault();
        this.selectTab(this.selectedIndex - 1, true);

        break;

      case 'ArrowDown':
      case 'ArrowRight':
      case 'Down':
      case 'Right':
        e.preventDefault();
        this.selectTab(this.selectedIndex + 1, true);

        break;
      default:
    }
  },
  selectTab(index, viaKeyboard) {
    if (index < 0 || index > this.products.length - 1) {
      return;
    }

    this.selectedIndex = index;

    if (viaKeyboard) {
      this.$nextTick(() => {
        this.$refs[`tabTrigger-${this.selectedIndex}`].focus();
      });
    }
  },
};

export default (function (opts = {}) {
  return createVueApp(el, opts);
}({ data, methods }));
