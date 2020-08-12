export default class TransaccionService {


    eliminarTransaccionEmpresa(id_admin, id_empresa, id_transaccion) {
        return axios.get(`EliminarTransaccionEmpresa?idadmin=${id_admin}&doc=${id_empresa}&subdoc=${id_transaccion}`).then(response => response);
    }

    eliminarTransaccionEmpresaZona(id_admin, id_empresa, id_zona, id_transaccion) {
        return axios.get(`EliminarTransaccionEmpresaZona?idadmin=${id_admin}&doc=${id_empresa}&idzona=${id_zona}&idtransaccion=${id_transaccion}`).then(response => response);
    }



    guardarHistorialTransaccion(id_admin, id_empresa, data) {
        return axios.post(`guardarHistorialTransaccion?idadmin=${id_admin}&doc=${id_empresa}`, data).then(response => response);
    }

    getTransaccionesPendiente(id_admin, id_empresa, id_zona) {
        return axios.get(`transaccionesPendientes?idadmin=${id_admin}&doc=${id_empresa}&subdoc=${id_zona}`).then(response => response);
    }

}