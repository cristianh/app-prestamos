import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
    sidebarShow: 'responsive',
    sidebarMinimize: false,
    usuario_login: {}
}

const mutations = {
    toggleSidebarDesktop(state) {
        const sidebarOpened = [true, 'responsive'].includes(state.sidebarShow)
        state.sidebarShow = sidebarOpened ? false : 'responsive'
    },
    toggleSidebarMobile(state) {
        const sidebarClosed = [false, 'responsive'].includes(state.sidebarShow)
        state.sidebarShow = sidebarClosed ? true : 'responsive'
    },
    set(state, [variable, value]) {
        state[variable] = value
    },
    setUsurioLogin(state, usuarioLogin) {
        state.usuario_login = usuarioLogin
    }
}

const getters = {
    getUsurioLogin(state) {
        return state.usuario_login
    },
    getUsurioLoginId(state) {
        return state.usuario_login.id
    }

}

export default new Vuex.Store({
    state,
    mutations,
    getters
})