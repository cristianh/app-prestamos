import qs from 'qs';
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
        return axios.post(`guardarJornadaInfoRuta?idadmin=${id_admin}&id_empresa=${id_empresa}&doc=${ui_cobrador}`, qs.stringify(data), {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
        }).then(response => response);
    }

    guardarGastoCobrador(id_admin, id_empresa, ui_cobrador, data) {
        return axios.post(`CobradoresGuardarGastos?id_admin=${id_admin}&id_empresa=${id_empresa}&ui_cobrador=${ui_cobrador}`, qs.stringify(data), {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
        }).then(response => response);
    }

    getAllGastoCobrador(id_admin, id_empresa, ui_cobrador) {
        return axios.get(`getCobradoresGastos?id_admin=${id_admin}&id_empresa=${id_empresa}&ui_cobrador=${ui_cobrador}`).then(response => response);
    }


    actualizarJornadaCobrador(id_admin, id_empresa, ui_rutacobrador, id_rutajornada, data) {

        return axios.post(`actualizarJornadaRutaDia?idadmin=${id_admin}&id_empresa=${id_empresa}&doc=${ui_rutacobrador}&subdoc=${id_rutajornada}`, qs.stringify(data), {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
        }).then(response => response);
    }

    getInformacionCobrador(id_admin, id_empresa, ui_rutacobrador) {
        return axios.get(`InformacionParaCobradores?idadmin=${id_admin}&doc=${id_empresa}&idcobrador=${ui_rutacobrador}`).then(response => response);
    }

    getInformeDia(id_admin, id_empresa, ui_rutacobrador, fecha) {
        return axios.post(`InformeDia?idadmin=${id_admin}&doc=${id_empresa}&idcobrador=${ui_rutacobrador}`, qs.stringify(fecha), {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
        }).then(response => response);
    }

    buscarCobradorPorZona(id_admin, idEmpresa, data_zona) {
        return axios.get(`buscarCobradorZona?idadmin=${id_admin}&doc=${idEmpresa}&zona=${data_zona}`).then(response => response).catch(error => { return error });
    }
}