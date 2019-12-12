import * as api from '@/api'
const state = {
  base_cart: null,
  cart: [],
  cart_count: 0,
  payment_type: 1,
  app_link:null,
  order_id:null,
  message:""
}
// getters
const getters = {
  isDebit:state=>state.payment_type==1?true:false,
  cartItems: (state) => {
    return state.cart
  },
  cartTotalAmount: (state) => {
    // return state.cart.reduce((total, product) => {
    //   return total + (product.priceInMinorUnits * product.qty)
    // }, 0)
    return state.base_cart.web_total_lines.find(e=>e.type==='ordertotal').value_show
  },
  subTotalAmount:state=>state.base_cart.web_total_lines.find(e=>e.type==='subtotal').value_show,
  webTotalLines: (state)=>state.base_cart.web_total_lines,
  taxAmount: state=>state.base_cart.web_total_lines.find(e=>e.type==='taxesfees').value_show,
  deliverAmount: state=>state.base_cart.web_total_lines.find(e=>e.type==='delivery').value_show,  
  webTotalDetails: state=>state.base_cart.web_total_details

}
// mutations
const mutations = {
  paymentSelectAndOder: (state, payload) =>{
    state.payment_type = payload.payment_type
    api.updatePayment({to_payment_type: payload.payment_type},{'authorization': payload.token}).then(val=>{
      api.shopingcartOrder({longitude:payload.appUser.longitude, latitude:payload.appUser.latitude},{'authorization': payload.token}).then(res=>{
        var order_status = res.data;

        if(order_status.status === "OK") {
            state.message = "Your shopping cart order was placed!";
            state.order_id = order_status.order_id;
            state.app_link = "highland://?confirmation=1312";
        } else {
            state.message = "Problem with your shopping cart order! ";
        }
        state.base_cart = null
        state.cart = [];
        state.cart_count = 0;
      })
    })
  },
  setShoppingCart: (state, payload) => {

    state.base_cart = payload.data
    state.cart_count = payload.data.cart_count
    state.cart = payload.data.items
  },
  addToCart: (state, payload) => {
    const product = payload.product
    const cartItems = state.cart.find(item => +item.id === +payload.product.productId)
    const qty = payload.qty ? payload.qty : 1    
    if (cartItems) {
      cartItems.qty = qty+cartItems.qty
      api.updateShopingcart({productid:product.productId,qtyplusone:cartItems.qty},{'authorization': payload.token}).then(val=>{
        state.base_cart = val.data
        state.cart_count = val.data.cart_count
        state.cart = val.data.items
      })
    } else {
      api.shopingcartAdd({product_id:product.productId},{'authorization': payload.token}).then(val=>{
        state.base_cart = val.data
        state.cart_count = val.data.cart_count
        state.cart = val.data.items
      })
      // state.cart.push({
      //   ...product,
      //   qty
      // })   
    }
    product.quantity--
  },
  updateCartQuantity: (state, payload) => {
    // Calculate Product stock Counts
    function calculateStockCounts(product, quantity) {
      const qty = product.qty + quantity
      const stock = product.quantity
      if (stock < qty) {
        return false
      }
      return true
    }
    state.cart.find((items, index) => {
      if (items.id === payload.product.productId) {
        const qty = state.cart[index].qty + payload.qty
        const stock = calculateStockCounts(state.cart[index], payload.qty)
        if (qty !== 0 && stock) {
          state.cart[index].qty = qty
          api.updateShopingcart({productid:payload.product.productId,qtyplusone:qty},{'authorization': payload.token}).then(val=>{
            state.base_cart = val.data
            state.cart_count = val.data.cart_count
            state.cart = val.data.items
          })
        } else {
          // state.cart.push({
          //   ...product,
          //   quantity: qty
          // })
        }
        return true
      }
    })
  },
  removeCartItem: (state, payload) => {
    // const index = state.cart.indexOf(payload)
    // state.cart.splice(index, 1)
    api.updateShopingcart({productid:payload.id,qtyplusone:0},{'authorization': payload.token}).then(val=>{
      state.base_cart = val.data
      state.cart_count = val.data.cart_count
      state.cart = val.data.items
    })

  }
}
// actions
const actions = {
  paymentSelectAndOder: (context, payload) =>{
    
    context.commit('paymentSelectAndOder',{...payload, token:context.rootGetters['auth/getAppUserToken'],appUser:context.rootState.auth.app_user})
  },
  setShoppingCart: (context, payload) => {
    context.commit('setShoppingCart', payload)
  },
  addToCart: (context, payload) => {
    context.commit('addToCart', {...payload, token:context.rootGetters['auth/getAppUserToken']})
  },
  updateCartQuantity: (context, payload) => {
    context.commit('updateCartQuantity', {...payload,token:context.rootGetters['auth/getAppUserToken']})
  },
  removeCartItem: (context, payload) => {
    context.commit('removeCartItem', {...payload,token:context.rootGetters['auth/getAppUserToken']})
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
