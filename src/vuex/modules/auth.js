import { Auth } from 'aws-amplify';

const state = {
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

}

const getters = {
    signedIn: (state) => {
        return state.web_user.authenticated||state.app_user.authenticated;
    },
    webUserAuthed: state => {
        return state.web_user.authenticated;
    },
    appUserAuthed: state => {
        return state.app_user.authenticated;
    },    
    getAppUserToken: state => state.app_user.access_token
}
const mutations = {
    findUser: async (state) => {
        try {
            const user = await Auth.currentAuthenticatedUser();
            state.web_user.authenticated = true;
            state.web_user.user = user;
            state.app_user.authenticated = false;
        }
        catch (err) {
            state.web_user.authenticated = false;
            state.web_user.user = null;
        }
    },
    setAppUserToken: (state, payload) => {
        state.app_user.access_token = payload.data.appat;
        state.app_user.longitude = payload.data.longitude;
        state.app_user.latitude = payload.data.latitude;
        state.app_user.authenticated = true;
        state.web_user.authenticated = false;
    },
    setAppUserData: (state, payload) =>{
        state.app_user.user = payload.data
        state.app_user.temp_user = false;
    }

}

const actions = {
    findUser: (context) => {
        context.commit("findUser")
    },
    setAppUserToken: (context, payload) => {
        context.commit('setAppUserToken', payload)
    },
    setAppUserData: (context, payload) =>{
        context.commit('setAppUserData', payload)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}