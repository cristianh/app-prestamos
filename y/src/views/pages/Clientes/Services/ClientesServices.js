export default class ClientesService {

    getAllClientesCobradores(id_admin, id) {
        return axios.get(`Cobradores?idadmin=${id_admin}&doc=${id}&sub=clientes`).then(response => response).catch(error => { return error });
    }

    // getAllClientesCobradores(id_admin, id) {
    //     return axios.get(`Cobradores?idadmin=${id_admin}&doc=${id}&sub=clientes`).then(response => response).catch(error => { return error });
    // }
}