export default class ZonaService {


    guardarZonaEmpresa(id_admin, id, info) {
        return axios.post(`EmpresasZonasGuardar?idadmin=${id_admin}&doc=${id}&sub=Zonas`, info).then(response => response.data);
    }

    guardarCobradoresZona(id_admin, id_doc, sub_doc, info) {
        return axios.post(`ZonasGuardarCobradores?idadmin=${id_admin}&doc=${id_doc}&subdoc=${sub_doc}`, info).then(response => response.data).catch(error => { return error });
    }

    getAllZonasEmpresa(id_admin, id_empresa, subdocu) {
        return axios.get(`EmpresasZonas?idadmin=${id_admin}&doc=${id_empresa}&sub=${subdocu}`).then(res => res.data);
    }

}