import { productsById, skusById } from '@data/products';
import createVueApp from '@helpers/createVueApp';
import { addToCart } from '@utils/cart';

const el = document.getElementById('vue-olc');

const data = {
  categories: new Array(productsById.p10.variants.categories.length),
};

const methods = {
  addToCart() {
    const selectedOptions = this.categories.join('');

    productsById.p10.skus.forEach((sku) => {
      if (sku.options.join('') === selectedOptions) {
        addToCart(sku.id, 1);
      }
    });
  },
};

export default (function (opts = {}) {
  return createVueApp(el, opts);
}({ data, methods }));
