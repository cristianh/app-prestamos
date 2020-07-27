export default class AbonoService {

    getTazaseInteres(id) {}

    guardarAbonosCobros(id_admin, ui_cobrador, id_cliente, data) {
        return axios.post(`CobradoresGuardarCobros?idadmin=${id_admin}&doc=${ui_cobrador}&sub=${id_cliente}`, data).then(response => response);
    }

    guardarAbonosPrestamos(id_admin, ui_cobrador, id_cliente, data) {
        return axios.post(`CobradoresGuardarPrestamos?idadmin=${id_admin}&doc=${ui_cobrador}&sub=${id_cliente}`, data).then(response => response);
    }

    actualizarValorPrestamos(id_admin, ui_cobrador, id_cliente, data) {
        return axios.post(`CobradoresActualizarPrestamos?idadmin=${id_admin}&doc=${ui_cobrador}&sub=${id_cliente}`, data).then(response => response);
    }


}