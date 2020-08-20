import qs from 'qs';
export default class TransaccionService {


    elminiarTransaccion(id_admin, id_empresa, id_zona) {
        return axios.get(`EliminarTransaccion?idadmin=${id_admin}&doc=${id_empresa}&subdoc=${id_zona}`).then(response => response);
    }

    elminiarTransaccionEmpresa(id_admin, id_empresa, id_transaccion) {
        return axios.get(`EliminarTransaccionEmpresa?idadmin=${id_admin}&doc=${id_empresa}&subdoc=${id_transaccion}`).then(response => response);
    }

    guardarHistorialTransaccion(id_admin, id_empresa, data) {
        return axios.post(`guardarHistorialTransaccion?idadmin=${id_admin}&doc=${id_empresa}`, qs.stringify(data), {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
        }).then(response => response);
    }

    getHistorialTransaccion(id_admin, id_empresa) {
        return axios.get(`getHistorialTransacciones?idadmin=${id_admin}&doc=${id_empresa}`).then(response => response);
    }

    actualizarEstadoTransaccion(id_admin, id_empresa, id_trasaccion, estado_trasaccion) {
        return axios.get(`actualizarEstadoTransaccion?idadmin=${id_admin}&doc=${id_empresa}&subdoc=${id_trasaccion}&estado_transaccion=${estado_trasaccion}`).then(response => response);
    }



}