import vQuantityChanger from '@components/quantityChanger/';
import createVueApp from '@helpers/createVueApp';
import { addToCart } from '@utils/cart';

const el = document.getElementById('vue-product-detail');

const data = {
  skus: {},
};

const components = {
  vQuantityChanger,
};

const methods = {
  addToCart(id, quantity) {
    addToCart(id, quantity);
  },
};

export default (function (opts = {}) {
  return createVueApp(el, opts);
}({ data, components, methods }));
