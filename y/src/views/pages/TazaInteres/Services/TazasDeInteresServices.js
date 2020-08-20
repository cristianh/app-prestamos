import qs from 'qs';

export default class TazasDeInteresService {

    actualizarTazaDeInteres(id_admin, id_empresa, id_tazainteres, data) {
        return axios.post(`actualizarTazaseInteres?idadmin=${id_admin}&doc=${id_empresa}&subdoc=${id_tazainteres}`, qs.stringify(data), {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
        }).then(response => response).catch(error => { return error });
    }



}