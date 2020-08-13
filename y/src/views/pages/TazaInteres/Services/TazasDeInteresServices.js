export default class TazasDeInteresService {

    actualizarTazaDeInteres(id_admin, id_empresa, id_tazainteres, data) {
        return axios.post(`actualizarTazaseInteres?idadmin=${id_admin}&doc=${id_empresa}&subdoc=${id_tazainteres}`, data).then(response => response).catch(error => { return error });
    }



}