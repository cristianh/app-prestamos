import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
    sidebarShow: 'responsive',
    sidebarMinimize: false,
    datos_transeferencia: [],
    usuario_login: {},
    contador_transacciones: 0
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
    },
    setAumentaContadorTransacciones(state) {

        state.contador_transacciones++

    },
    setDisminuyeContadorTransacciones(state) {
        if (state.contador_transacciones == 0) {

        } else {
            state.contador_transacciones--
        }

    },
    setReiniciarContadorTransacciones(state) {
        state.contador_transacciones = 0
    },
    setDatosTransferencia(state, data_transferencia) {
        state.datos_transeferencia.push(data_transferencia)
    },
    setEliminarDatosTransferencia(state) {
        state.datos_transeferencia = []
    },
    setEliminarDatoTransferencia(state, id) {
        let posicion = state.datos_transeferencia.findIndex(x => x.data.id == id)
        state.datos_transeferencia.splice(posicion, 1)
    },
    setEliminarDatoTransferenciaPorId(state, idTransaccion) {
            let posicion = state.datos_transeferencia.findIndex(x => x.data.id_transaccion == idTransaccion)
            state.datos_transeferencia.splice(posicion, 1)
    },
    setEstadoTransferencia(state, estadotransferencia) {
        state.datos_transeferencia[0].estado_transaccion = estadotransferencia
    }
}

const getters = {
    getUsurioLogin(state) {
        return state.usuario_login
    },
    getUsurioLoginId(state) {
        return state.usuario_login.id
    },
    getContadorTransacciones(state) {
        return state.contador_transacciones
    },
    getDatosTransferencia: state => {
        return state.datos_transeferencia;
    }

}

export default new Vuex.Store({
    state,
    mutations,
    getters
})