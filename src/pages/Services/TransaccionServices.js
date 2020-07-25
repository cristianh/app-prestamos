export default class TransaccionService {


    elminiarTransaccion(id_empresa, id_zona) {
        return axios.get(`EliminarTransaccion?doc=${id_empresa}&subdoc=${id_zona}`).then(response => response);
    }

    guardarHistorialTransaccion(id_empresa, data) {
        return axios.post(`guardarHistorialTransaccion?doc=${id_empresa}`, data).then(response => response);
    }

}