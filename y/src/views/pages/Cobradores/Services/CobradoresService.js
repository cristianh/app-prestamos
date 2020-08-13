export default class CobradoresService {

    getAllCobradores(id_admin) {
        return axios.get(`Cobradores?idadmin=${id_admin}&doc=todos`).then(response => response).catch(error => { return error });
    }

    guardarCobrador(id_admin, idEmpresa, data_cobrador) {
        return axios.post(`CobradoresGuardar?idadmin=${id_admin}&doc=${idEmpresa}`, data_cobrador).then(response => response).catch(error => { return error });
    }

    buscarCobradorPorZona(id_admin, idEmpresa, data_zona) {
        return axios.get(`buscarCobradorZona?idadmin=${id_admin}&doc=${idEmpresa}&zona=${data_zona}`).then(response => response).catch(error => { return error });
    }
}
// https://us-central1-manifest-life-279516.cloudfunctions.net/buscarCobradorZona?idadmin=rPmEcBvQTRjJZrgmpqJ2&doc=hQPTik3wZ0yK2i5y6tdX&zona=4rPV9a3klSx6WQCxpNBO