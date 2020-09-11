import qs from 'qs';
export default class ClientesService {


    getAllClientesCobradores(id_admin, id) {
        return axios.get(`Cobradores?idadmin=${id_admin}&doc=${id}&sub=clientes`).then(response => response).catch(error => { return error });
    }

    actualizarPosicionCliente(id_admin, id_empresa, id_cobrador, id_cliente, data) {
        return axios.post(`actualizarPosicionClienteLista?idadmin=${id_admin}&id_empresa=${id_empresa}&doc=${id_cobrador}&subdoc=${id_cliente}`, qs.stringify(data), {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
        }).then(response => response);
    }

    guardarClienteCobrador(id_admin, id_empresa, ui_cobrador, data) {
        return axios.post(`CobradoresGuardarClientes?idadmin=${id_admin}&doc=${id_empresa}&subdoc=${ui_cobrador}`, qs.stringify(data), {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
        }).then(response => response);
    }

    actualizarClienteCobrador(id_admin, id_empresa, id_cobrador, id_cliente, data) {
        return axios.post(`CobradoresClientesUpdate?idadmin=${id_admin}&id_empresa=${id_empresa}&doc=${id_cobrador}&subdoc=${id_cliente}`, qs.stringify(data), {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
        }).then(response => response);
    }

    eliminarClienteCobro(id_admin, id_empresa, id_cobrador, id_cliente, id_cobro, data) {
        return axios.post(`ClienteEliminarCobro?idadmin=${id_admin}&id_empresa=${id_empresa}&doc=${id_cobrador}&subdoc=${id_cliente}&idcobro=${id_cobro}`, qs.stringify(data), {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
        }).then(response => response);
    }


    guardarListaGenerada(id_admin, id_empresa, id_cobrador, data) {
        return axios.post(`CobradoresGuardarListaDia?idadmin=${id_admin}&id_empresa=${id_empresa}&doc=${id_cobrador}`, qs.stringify(data), {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
        }).then(response => response);
    }

    consultarListaGenerada(id_admin, id_empresa, id_cobrador, id_lista) {
        return axios.get(`CobradoresConsultarLista?idadmin=${id_admin}&id_empresa=${id_empresa}&doc=${id_cobrador}&subdoc=${id_lista}`).then(response => response);
    }

    guardarObservacionNoPago(id_admin, id_empresa, ui_cobrador, id_cliente, data) {
        return axios.post(`CobradoresGuardarObservacionNoPago?idadmin=${id_admin}&id_empresa=${id_empresa}&doc=${ui_cobrador}&sub=${id_cliente}`, qs.stringify(data), {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
        }).then(response => response);
    }

    eliminarPrestamoPago(id_admin, id_empresa, ui_cobrador, id_cliente, data) {
        return axios.post(`ClienteEliminarPrestamosPago?idadmin=${id_admin}&id_empresa=${id_empresa}&doc=${ui_cobrador}&sub=${id_cliente}`, qs.stringify(data), {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
        }).then(response => response);
    }

}