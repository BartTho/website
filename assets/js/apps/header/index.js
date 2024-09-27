import Headroom from 'headroom.js';

import eventBus from '@apps/eventBus';
import vIconButton from '@components/iconButton/';
import createVueApp from '@helpers/createVueApp';
import { formatPrice } from '@data/shared';
import html from '@helpers/html';
import { getCartCount, getCartSubTotal } from '@utils/cart';

const el = document.getElementById('vue-header');

const data = {
  accountIsExpanded: false,
  cartCount: 0,
  cartSubTotal: 400,
  expandedSubMenus: {},
  homePage: false,
  navigationIsExpanded: false,
  staticStickyHeader: false,
  userIsLoggedIn: false,
};

const components = {
  vIconButton,
};

const methods = {
  toggleAccount() {
    this.accountIsExpanded = !this.accountIsExpanded;

    this.$nextTick(() => {
      if (this.accountIsExpanded) {
        this.$refs.account.focus();
      }
    })
  },
  toggleNavigation() {
    this.navigationIsExpanded = !this.navigationIsExpanded;

    this.$nextTick(() => {
      if (this.navigationIsExpanded) {
        this.$refs.navigation.focus();
      }
    })
  },
  toggleSubMenu(href) {
    this.expandedSubMenus[href] = !this.expandedSubMenus[href];

    this.$nextTick(() => {
      if (this.expandedSubMenus[href]) {
        this.$refs[href].focus();
      }
    })
  },
  updateCartDetails() {
    this.cartCount = getCartCount();
    this.cartSubTotal = formatPrice(getCartSubTotal());
  },
};

const lifecycleHooks = {
  created() {
    this.updateCartDetails();
  },
  mounted() {
    if (!this.staticStickyHeader) {
      const headroom = new Headroom(this.$el, {
        offset: this.homePage ? 240 : 110,
        classes: {
          notTop: 'g-sticky-header',
        },
      });

      headroom.init();
    }

    eventBus.$on('set_cart', this.updateCartDetails);
  },
};

export default (function (opts = {}) {
  return createVueApp(el, opts);
}({ data, components, methods, ...lifecycleHooks }));
