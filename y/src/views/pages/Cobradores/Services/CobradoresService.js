import qs from 'qs';

export default class CobradoresService {

    getAllCobradores(id_admin, id_empresa) {
        https: //us-central1-manifest-life-279516.cloudfunctions.net/getAllCobradores?idadmin=rPmEcBvQTRjJZrgmpqJ2&idempresa=hQPTik3wZ0yK2i5y6tdX
            return axios.get(`getAllCobradores?idadmin=${id_admin}&idempresa=${id_empresa}`).then(response => response).catch(error => { return error });
    }

    getUpdateInfoCobradores(id_admin, id_empresa, id_documento, info_cobrador) {
        https: //us-central1-manifest-life-279516.cloudfunctions.net/getAllCobradores?idadmin=rPmEcBvQTRjJZrgmpqJ2&idempresa=hQPTik3wZ0yK2i5y6tdX
            return axios.post(`updateInfoCobradores?idadmin=${id_admin}&idempresa=${id_empresa}&doc=${id_documento}`, qs.stringify(info_cobrador), {
            method: 'post',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
        }).then(response => response).catch(error => { return error });
    }

    getZonaCobrador(id_admin, id_empresa, id_zona) {
        return axios.get(`buscarZonaCobrador?idadmin=${id_admin}&idempresa=${id_empresa}&zona=${id_zona}`).then(response => response).catch(error => { return error });
    }

    getBorrarCobrador(id_admin, id_empresa, id_documento) {
        https: //us-central1-manifest-life-279516.cloudfunctions.net/getAllCobradores?idadmin=rPmEcBvQTRjJZrgmpqJ2&idempresa=hQPTik3wZ0yK2i5y6tdX
            return axios.get(`eliminarCobradores?idadmin=${id_admin}&idempresa=${id_empresa}&doc=${id_documento}`).then(response => response).catch(error => { return error });
    }

    // db.collection('usuarios').doc(request.query.idadmin).collection('empresas').doc(request.query.doc).collection('cobradores').get();


    guardarCobrador(id_admin, idEmpresa, data_cobrador) {
        return axios.post(`CobradoresGuardar?idadmin=${id_admin}&doc=${idEmpresa}`, qs.stringify(data_cobrador), {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
        }).then(response => response).catch(error => { return error });
    }

    buscarCobradorPorZona(id_admin, idEmpresa, data_zona) {
        return axios.get(`buscarCobradorZona?idadmin=${id_admin}&doc=${idEmpresa}&zona=${data_zona}`).then(response => response).catch(error => { return error });
    }
}
// https://us-central1-manifest-life-279516.cloudfunctions.net/buscarCobradorZona?idadmin=rPmEcBvQTRjJZrgmpqJ2&doc=hQPTik3wZ0yK2i5y6tdX&zona=4rPV9a3klSx6WQCxpNBO