export default class TransaccionService {


    elminiarTransaccion(id_admin, id_empresa, id_zona) {
        return axios.get(`EliminarTransaccion?idadmin=${id_admin}&doc=${id_empresa}&subdoc=${id_zona}`).then(response => response);
    }

    guardarHistorialTransaccion(id_admin, id_empresa, data) {
        return axios.post(`guardarHistorialTransaccion?idadmin=${id_admin}&doc=${id_empresa}`, data).then(response => response);
    }

}