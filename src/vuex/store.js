import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'

Vue.use(Vuex)


const state = {
    globalError: '',

    // switch to allow non sign in flow = false plus check router.js
    must_be_signed_in: true,

    app_user: {
        authenticated: false,
        access_token: null,
        longitude: null,
        latitude: null,
        user: null,
        temp_user: false,
    },

    web_user: {
        authenticated: false,
        access_token: null,
        user: null,
    },

    products: {
        listing: null,
        loaded: false,
    },

    shoppingcart: {
        cart: null,
        cart_count: 0,
    },

    api_base_url: 'https://happydelivery.io/webapi/V1/',
}

const mutations = {
    setGlobalError(state, error) {
        state.globalError = error
    },
    LOGOUT(state) {
        state.app_user = {}
        state.web_user = {}
    }
}

export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations
})