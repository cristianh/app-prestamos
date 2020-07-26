export default class CobradoresService {

    getAllCobradores(id_admin) {
        return axios.get(`Cobradores?idadmin=${id_admin}&doc=todos`).then(response => response).catch(error => { return error });
    }

    guardarCobrador(id_admin, data) {
        return axios.post(`Cobradores?idadmin=${id_admin}`, data).then(response => response).catch(error => { return error });
    }

    buscarCobradorPorZona(id_admin, idZona) {
        return axios.get(`buscarCobradorZona?idadmin=${id_admin}&zona=${idZona}`).then(response => response).catch(error => { return error });
    }
}