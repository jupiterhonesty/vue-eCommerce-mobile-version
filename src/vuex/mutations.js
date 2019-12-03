export const setGlobalError = (state, payload) => {
    state.globalError = payload.value
}

export const logout = (state) => {
    state.app_user = {}
    state.web_user = {}
}

