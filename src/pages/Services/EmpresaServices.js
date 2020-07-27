export default class EmpresaServices {

    getAllInfoEmpresa(id_admin, id) {
        return axios.get(`Empresas?idadmin=${id_admin}&doc=${id}`).then(response => response).catch(error => { return error });
    }

    getAllInfoEmpresaZona(id_admin, idEmpresa, idZona) {
        return axios.get(`getEmpresaZonaDoc?idadmin=${id_admin}&doc=${idEmpresa}&subdoc=${idZona}`).then(response => response);
    }

    getAllTazaeInteres(id_admin) {
        return axios.get(`getTazaseInteres?idadmin=${id_admin}`).then(response => response);
    }

    getEmpresaPorId(id_admin, IdEmpresa) {
        return axios.get(`Empresas?idadmin=${id_admin}&doc=${IdEmpresa}`).then(response => response).catch(error => { return error });
    }


}