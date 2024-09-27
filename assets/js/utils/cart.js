import eventBus from '@apps/eventBus';
import { productsById, skusById } from '@data/products';

const cartKey = 'cart20190804';

const calculateSubTotal = (cartItems) => {
  return cartItems.reduce((total, item) => {
    const sku = skusById[item.id];
    const price = sku.price || sku.options.reduce((olcTotal, key) => {
      return olcTotal += productsById[sku.productId].variants.options[key].price;
    }, 0);

    return total += (item.quantity * price);
  }, 0);
};

export const addToCart = (id, quantity) => {
  const cartItems = getCart().items;

  const existingSkuIndex = cartItems.findIndex((sku) => sku.id === id);

  if (existingSkuIndex > -1) {
    cartItems[existingSkuIndex].quantity += quantity;
  }
  else {
    cartItems.push({
      id,
      quantity,
    });
  }

  setCart(cartItems);
};

export const clearCart = () => {
  localStorage.removeItem(cartKey);
};

export const clearSessionCart = () => {
  sessionStorage.removeItem(cartKey);
};

export const copyCartToSession = () => {
  sessionStorage.setItem(cartKey, getCart());
};

export const getCart = () => JSON.parse(localStorage.getItem(cartKey)) || {
  items: [],
  subTotal: 0,
};

export const getCartCount = () => {
  const cartItems = getCart().items;
  let count = 0;

  if (cartItems.length) {
    count = cartItems.reduce((count, item) => count += item.quantity, count);
  }

  return count;
};

export const getCartSubTotal = () => getCart().subTotal;

export const setCart = (cartItems, callback) => {
  const cart = {
    items: cartItems,
    subTotal: calculateSubTotal(cartItems),
  };

  localStorage.setItem(cartKey, JSON.stringify(cart));
  eventBus.$emit('set_cart');

  if (callback) {
    callback();
  }
}
