import qs from 'qs';
export default class PasswordService {

    // GET     /passwords         Solicita todas las entradas.
    // GET     /passwords/:id     Solicita una entrada por id.
    // POST    /passwords         Crea una entrada.
    // PUT     /passwords/:id     Actualiza una entrada.
    // DELETE  /passwords/:id     Elimina una entrada.

    getTazaseInteres(id) {}


    guardarAbonosCobros(id_admin, id_empresa, ui_cobrador, id_cliente, data) {
        return axios.post(`CobradoresGuardarCobros?idadmin=${id_admin}&id_empresa=${id_empresa}&doc=${ui_cobrador}&sub=${id_cliente}`, qs.stringify(data), {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
        }).then(response => response);
    }

    guardarAbonosPrestamos(id_admin, id_empresa, ui_cobrador, id_cliente, data) {
        return axios.post(`CobradoresGuardarPrestamos?idadmin=${id_admin}&id_empresa=${id_empresa}&doc=${ui_cobrador}&sub=${id_cliente}`, qs.stringify(data), {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
        }).then(response => response);
    }

    actualizarValorPrestamos(id_admin, id_empresa, ui_cobrador, id_cliente, data) {
        return axios.post(`CobradoresActualizarPrestamos?idadmin=${id_admin}&id_empresa=${id_empresa}&doc=${ui_cobrador}&sub=${id_cliente}`, qs.stringify(data), {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
        }).then(response => response);
    }


}