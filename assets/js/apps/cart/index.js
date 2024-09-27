import vCartRow from '@components/cartRow/';
import { productsById, skusById } from '@data/products';
import { formatPrice } from '@data/shared';
import createVueApp from '@helpers/createVueApp';
import { getCart, setCart } from '@utils/cart';

const el = document.getElementById('vue-cart');

const data = {
  cartItems: [],
  cartSubTotal: 0,
};

const components = {
  vCartRow,
};

const computed = {
  subTotal() {
    return formatPrice(this.cartSubTotal);
  },
};

const methods = {
  getCart() {
    const cart = getCart();

    this.cartItems = cart.items;
    this.cartSubTotal = cart.subTotal;
  },
  getProductFromSku(id) {
    return productsById[skusById[id].productId];
  },
  getSkuFromId(id) {
    return skusById[id];
  },
  goToCheckout() {
    location = '/checkout/';
  },
  removeFromCart(index) {
    this.cartItems = this.cartItems.filter((item, idx) => idx !== index);
    this.updateCart();
  },
  updateCart() {
    setCart(this.cartItems, this.getCart);
  },
};

const lifecycleHooks = {
  created() {
    this.getCart();
  },
};

export default (function (opts = {}) {
  return createVueApp(el, opts);
}({ data, components, computed, methods, ...lifecycleHooks }));
