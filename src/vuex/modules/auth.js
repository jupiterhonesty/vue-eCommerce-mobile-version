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
        return state.web_user.authenticated;
    },
    webUserAuthed: state =>{
        return state.web_user.authenticated;
    },
    appUserAuthed: state =>{
        return state.app_user.authenticated;
    }
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
    }

}

const actions = {
    findUser: (context) => {
        context.commit("findUser")
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}