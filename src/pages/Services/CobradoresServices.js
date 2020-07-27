export default class CobradorServices {

    getAllInfoCobradores(id_admin, id) {
        return axios.get(`Cobradores?idadmin=${id_admin}&doc=${id}`).then(response => response).catch(error => { return error });
    }

    getZonaCobrador(id_admin, id) {
        return axios.get(`Cobradores?idadmin=${id_admin}&doc=${id}&subdoc=Rutas`).then(response => response);
    }

    getCobradoresClientesBuscar(id_admin, ui_cobrador, id_cliente) {
        return axios.get(`CobradoresClientesBuscar?idadmin=${id_admin}&doc=${ui_cobrador}&subdoc=${id_cliente}`).then(response => response);
    }

    guardarJornadaCobrador(id_admin, ui_cobrador, data) {
        return axios.post(`guardarJornadaInfoRuta?idadmin=${id_admin}&doc=${ui_cobrador}`, data).then(response => response);
    }

    actualizarJornadaCobrador(id_admin, ui_rutacobrador, id_rutajornada, data) {

        return axios.post(`actualizarJornadaRutaDia?idadmin=${id_admin}&doc=${ui_rutacobrador}&subdoc=${id_rutajornada}`, data).then(response => response);
    }
}