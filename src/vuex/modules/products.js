import products from '../../../data/products'

const state = {
  productslist: products.data,
  products: products.data,
  wishlist: [],
  compare: [],
  currency: {
    curr: 'usd',
    symbol: '$'
  },
  order: [],
  locale: 'en',
  searchProduct: [],
  loaded:false
}
// getters
const getters = {
  getLoaded:state=>{
    return state.loaded
  },
  getcollectionProduct: (state) => {
    return collection => state.products.filter((product) => {
      return collection === product.collection
    })
  },
  getProductById: (state) => id => {
    for(let group of state.products) {
      var product = group.products.find((obj)=> obj.id === +id)   
      if(product) return product
    }
    return {}
  },
  getProductByProductId:(state)=>productId=>{
    for(let group of state.products) {
      var product = group.products.find((obj)=> obj.productId === +productId)   
      if(product) return product
    }
    return {}
  },
  compareItems: (state) => {
    return state.compare
  },
  wishlistItems: (state) => {
    return state.wishlist
  },
  changeCurrency: (state) => {
    if (state.currency.curr === 'eur') {
      state.currency.curr = 0.90
      return state.currency
    } else if (state.currency.curr === 'inr') {
      state.currency.curr = 70.93
      return state.currency
    } else if (state.currency.curr === 'gbp') {
      state.currency.curr = 0.78
      return state.currency
    } else if (state.currency.curr === 'usd') {
      state.currency.curr = 0.01
      return state.currency
    }
  },
  getOrder: (state) => {
    return state.order
  }
}
// mutations
const mutations = {
  setProducts:(state,payload)=>{
    state.products = payload
    state.productslist = payload    
    state.loaded = true
  },
  changeCurrency: (state, payload) => {
    state.currency = payload
  },
  addToWishlist: (state, payload) => {
    const product = state.products.find(item => item.id === payload.id)
    const wishlistItems = state.wishlist.find(item => item.id === payload.id)
    if (!wishlistItems) {
      state.wishlist.push({
        ...product
      })
    }
  },
  removeWishlistItem: (state, payload) => {
    const index = state.wishlist.indexOf(payload)
    state.wishlist.splice(index, 1)
  },
  addToCompare: (state, payload) => {
    const product = state.products.find(item => item.id === payload.id)
    const compareItems = state.compare.find(item => item.id === payload.id)
    if (!compareItems) {
      state.compare.push({
        ...product
      })
    }
  },
  removeCompareItem: (state, payload) => {
    const index = state.compare.indexOf(payload)
    state.compare.splice(index, 1)
  },
  searchProduct: (state, payload) => {
    payload = payload.toLowerCase()
    state.searchProduct = []
    if (payload.length) {
      state.products.filter((product) => {
        if (product.title.toLowerCase().includes(payload)) {
          state.searchProduct.push(product)
        }
      })
    }
  },
  createOrder: (state, payload) => {
    state.order = payload
  }
}
// actions
const actions = {
  setProducts:(context,payload) =>{
    context.commit('setProducts',payload)
  },
  changeCurrency: (context, payload) => {
    context.commit('changeCurrency', payload)
  },
  addToWishlist: (context, payload) => {
    context.commit('addToWishlist', payload)
  },
  removeWishlistItem: (context, payload) => {
    context.commit('removeWishlistItem', payload)
  },
  addToCompare: (context, payload) => {
    context.commit('addToCompare', payload)
  },
  removeCompareItem: (context, payload) => {
    context.commit('removeCompareItem', payload)
  },
  searchProduct: (context, payload) => {
    context.commit('searchProduct', payload)
  },
  createOrder: (context, payload) => {
    context.commit('createOrder', payload)
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
