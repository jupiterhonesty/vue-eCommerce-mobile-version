import * as api from '@/api'
const state = {
  base_cart: null,
  cart: [],
  cart_count: 0,
  payment_type: 0,
  app_link: null,
  order_id: null,
  message: "",
  ordered: false,
  orderhistory: null,
  last_order: [],
  delivery_address_text:""
}
// getters
const getters = {
  isDebit: state => state.payment_type == 1 ? true : false,
  cartItems: (state) => {
    return state.cart
  },
  webTotalTitle: state=> state.base_cart && state.base_cart.web_total_title,
  webTotalLegalText:state=> state.base_cart && state.base_cart.web_total_legal_text,
  webTotalLegalUrl:state=> state.base_cart && state.base_cart.web_total_legal_url,
  webTotalLines: (state) => state.base_cart && state.base_cart.web_total_lines,
  cartTotalAmount: (state) => state.base_cart && state.base_cart.web_total_lines.find(e => e.type === 'ordertotal').value_show,
  subTotalAmount: state => state.base_cart && state.base_cart.web_total_lines.find(e => e.type === 'subtotal').value_show,
  taxAmount: state => state.base_cart && state.base_cart.web_total_lines.find(e => e.type === 'taxesfees').value_show,
  deliverAmount: state => state.base_cart && state.base_cart.web_total_lines.find(e => e.type === 'delivery').value_show,
  webTotalDetails: state => state.base_cart && state.base_cart.web_total_details,
  getOrderID: state => state.order_id,
  ordered: state => state.ordered,
  order_history: state => state.orderhistory,
  paymenttype: state => state.payment_type

}
// mutations
const mutations = {
  setOrderhistory: (state, payload) => {
    state.orderhistory = payload.data
  },
  paymentSelect: (state, payload) => {
    api.updatePayment({ to_payment_type: payload.payment_type }, { 'authorization': payload.token }).then(val => {
      state.base_cart = val.data
      state.cart_count = val.data.cart_count
      state.cart = val.data.items
      state.payment_type = val.data.payment_type
    })
  },
  setDeliveryAddressText: (state, payload) => {
    state.delivery_address_text = payload.delivery_address_text;
  },
  order: (state, payload) => {
    api.shopingcartOrder({
      longitude: payload.appUser.longitude,
      latitude: payload.appUser.latitude,
      delivery_address_text: state.delivery_address_text,
      special_instructions_message: payload.special_instructions_message
    },
      { 'authorization': payload.token }
    ).then(res => {
      var order_status = res.data;

      if (order_status.status === "OK") {
        state.message = "Your shopping cart order was placed!";
        state.order_id = order_status.order_id;
        state.app_link = "highland://?confirmation=1312";
        state.ordered = true
      } else {
        state.message = "Problem with your shopping cart order! ";
      }
      state.cart = [];
      state.cart_count = 0;

      api.orderHistory({ order_id: state.order_id }, { 'authorization': payload.token }).then(val => {
        state.last_order = val.data
      })

    })

  },
  setShoppingCart: (state, payload) => {

    state.base_cart = payload.data
    state.cart_count = payload.data.cart_count
    state.cart = payload.data.items
    state.payment_type = payload.data.payment_type
  },
  addToCart: (state, payload) => {
    const product = payload.product
    const cartItems = state.cart.find(item => +item.id === +payload.product.productId)
    const qty = payload.qty ? payload.qty : 1
    if (cartItems || qty != 1) {
      cartItems.qty = qty + cartItems.qty
      api.updateShopingcart({ productid: product.productId, qtyplusone: cartItems.qty }, { 'authorization': payload.token }).then(val => {
        state.base_cart = val.data
        state.cart_count = val.data.cart_count
        state.cart = val.data.items
        state.payment_type = val.data.payment_type
      })
    } else {
      api.shopingcartAdd({ product_id: product.productId }, { 'authorization': payload.token }).then(val => {
        state.base_cart = val.data
        state.cart_count = val.data.cart_count
        state.cart = val.data.items
        state.payment_type = val.data.payment_type
      })
      // state.cart.push({
      //   ...product,
      //   qty
      // })   
    }
    product.quantity--
  },
  updateCartQuantity: (state, payload) => {

    var { cart, token } = payload

    const qty =  parseInt(cart.qty, 10) + payload.qty
    cart.qty = qty;
    if (qty !== 0) {
      api.updateShopingcart({ productid: cart.id, qtyplusone: qty }, { 'authorization': token }).then(val => {
        state.base_cart = val.data
        state.cart_count = val.data.cart_count
        state.cart = val.data.items
        state.payment_type = val.data.payment_type
      })
    } else {
      // state.cart.push({
      //   ...product,
      //   quantity: qty
      // })
    }
    return true
  },
  removeCartItem: (state, payload) => {
    api.updateShopingcart({ productid: payload.id, qtyplusone: 0 }, { 'authorization': payload.token }).then(val => {
      state.base_cart = val.data
      state.cart_count = val.data.cart_count
      state.cart = val.data.items
      state.payment_type = val.data.payment_type
    })

  }
}
// actions
const actions = {
  setOrderhistory: (context, payload) => {
    context.commit('setOrderhistory', payload)
  },
  order: (context, payload) => {

    context.commit('order', { ...payload, token: context.rootGetters['auth/getAppUserToken'], appUser: context.rootState.auth.app_user })
  },
  setDeliveryAddressText: (context, payload) => {
    context.commit('setDeliveryAddressText', payload);
  },
  paymentSelect: (context, payload) => {

    context.commit('paymentSelect', { ...payload, token: context.rootGetters['auth/getAppUserToken'], appUser: context.rootState.auth.app_user })
  },
  setShoppingCart: (context, payload) => {
    context.commit('setShoppingCart', payload)
  },
  addToCart: (context, payload) => {
    context.commit('addToCart', { ...payload, token: context.rootGetters['auth/getAppUserToken'] })
  },
  updateCartQuantity: (context, payload) => {
    context.commit('updateCartQuantity', { ...payload, token: context.rootGetters['auth/getAppUserToken'] })
  },
  removeCartItem: (context, payload) => {
    context.commit('removeCartItem', { ...payload, token: context.rootGetters['auth/getAppUserToken'] })
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
