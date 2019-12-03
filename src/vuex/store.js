import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import * as mutations from './mutations'

import auth from './modules/auth'
import blog from './modules/blog'
import menu from './modules/menu'
import products from './modules/products'
import cart from './modules/cart'
import filter from './modules/filter'
import layout from './modules/layout'

Vue.use(Vuex)


const state = {
    globalError: ''
   
}


export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations,
    modules: {
        auth,
        blog,
        menu,
        products,
        cart,
        filter,
        layout
      }
})