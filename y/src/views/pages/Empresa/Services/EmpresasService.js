export default class EmpresaService {

    getAllEmpresas(id_admin) {
        return axios.get(`Empresas?idadmin=${id_admin}&doc=todos`).then(response => response).catch(error => { return error });
    }

    getAllInfoEmpresaZona(id_admin, idEmpresa, idZona) {
        return axios.get(`getEmpresaZonaDoc?idadmin=${id_admin}&doc=${idEmpresa}&subdoc=${idZona}`).then(response => response);
    }

    getEmpresaPorId(id_admin, IdEmpresa) {
        return axios.get(`Empresas?idadmin=${id_admin}&doc=${IdEmpresa}`).then(response => response).catch(error => { return error });
    }

    guardarEmpresa(id_admin, data) {
        // return axios.post('Empresas', data).then(response => response.data).catch(error => { return error });
        return axios.post(`Empresas?idadmin=${id_admin}`, data).then(response => response.data).catch(error => { return error });
    }

    getAllTazaeInteres(id_admin, id_empresa) {
        return axios.get(`getTazaseInteres?idadmin=${id_admin}&doc=${id_empresa}`).then(response => response);
    }

    guardarNuevoPlanEmpresa(id_admin, IdEmpresa, data) {
        return axios.post(`GuardarNuevoPlanEmpresa?idadmin=${id_admin}&doc=${IdEmpresa}`, data).then(response => response.data).catch(error => { return error });
    }

}