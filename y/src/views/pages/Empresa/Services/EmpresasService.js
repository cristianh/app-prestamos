export default class EmpresaService {

    getAllEmpresas(id_admin) {
        return axios.get(`Empresas?idadmin=${id_admin}&doc=todos`).then(response => response).catch(error => { return error });
    }

    getEmpresaPorId(id_admin, IdEmpresa) {
        return axios.get(`Empresas?idadmin=${id_admin}&doc=${IdEmpresa}`).then(response => response).catch(error => { return error });
    }

    guardarEmpresa(id_admin, data) {
        // return axios.post('Empresas', data).then(response => response.data).catch(error => { return error });
        return axios.post(`Empresas?idadmin=${id_admin}`, data).then(response => response.data).catch(error => { return error });
    }

    guardarNuevoPlanEmpresa(id_admin, data) {
        return axios.post(`GuardarNuevoPlanEmpresa?idadmin=${id_admin}`, data).then(response => response.data).catch(error => { return error });
    }

}