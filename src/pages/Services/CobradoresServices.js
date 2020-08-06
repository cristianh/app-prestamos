export default class CobradorServices {

    getAllInfoCobradores(id_admin, id) {
        return axios.get(`Cobradores?idadmin=${id_admin}&doc=${id}`).then(response => response).catch(error => { return error });
    }

    getZonaCobrador(id_admin, id) {
        return axios.get(`Cobradores?idadmin=${id_admin}&doc=${id}&subdoc=Rutas`).then(response => response);
    }

    getCobradoresClientesBuscar(id_admin, id_empresa, ui_cobrador, id_cliente) {
        return axios.get(`CobradoresClientesBuscar?idadmin=${id_admin}&id_empresa=${id_empresa}&doc=${ui_cobrador}&subdoc=${id_cliente}`).then(response => response);
    }

    guardarJornadaCobrador(id_admin, id_empresa, ui_cobrador, data) {
        return axios.post(`guardarJornadaInfoRuta?idadmin=${id_admin}&id_empresa=${id_empresa}&doc=${ui_cobrador}`, data).then(response => response);
    }

    actualizarJornadaCobrador(id_admin, id_empresa, ui_rutacobrador, id_rutajornada, data) {
        console.table(id_admin, id_empresa, ui_rutacobrador, id_rutajornada);
        return axios.post(`actualizarJornadaRutaDia?idadmin=${id_admin}&id_empresa=${id_empresa}&doc=${ui_rutacobrador}&subdoc=${id_rutajornada}`, data).then(response => response);
    }

    buscarCobradorPorZona(id_admin, idEmpresa, data_zona) {
        return axios.get(`buscarCobradorZona?idadmin=${id_admin}&doc=${idEmpresa}&zona=${data_zona}`).then(response => response).catch(error => { return error });
    }
}