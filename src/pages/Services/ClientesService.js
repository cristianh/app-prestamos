export default class ClientesService {

    getAllClientesCobradores(id_admin, id) {
        return axios.get(`Cobradores?idadmin=${id_admin}&doc=${id}&sub=clientes`).then(response => response).catch(error => { return error });
    }

    actualizarPosicionCliente(id_admin, id_cobrador, id_cliente, data) {
        return axios.post(`actualizarPosicionClienteLista?idadmin=${id_admin}&doc=${id_cobrador}&subdoc=${id_cliente}`, data).then(response => response);
    }

    guardarClienteCobrador(id_admin, ui_cobrador, data) {
        return axios.post(`CobradoresGuardarClientes?idadmin=${id_admin}&doc=${ui_cobrador}`, data).then(response => response);
    }

    actualizarClienteCobrador(id_admin, id_cobrador, id_cliente, data) {
        return axios.post(`CobradoresClientesUpdate?idadmin=${id_admin}&doc=${id_cobrador}&subdoc=${id_cliente}`, data).then(response => response);
    }

    guardarObservacionNoPago(id_admin, ui_cobrador, id_cliente, data) {
        return axios.post(`CobradoresGuardarObservacionNoPago?idadmin=${id_admin}&doc=${ui_cobrador}&sub=${id_cliente}`, data).then(response => response);
    }

    eliminarPrestamoPago(id_admin, ui_cobrador, id_cliente, data) {
        return axios.post(`ClienteEliminarPrestamosPago?idadmin=${id_admin}&doc=${ui_cobrador}&sub=${id_cliente}`, data).then(response => response);
    }

}