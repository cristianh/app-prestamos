
export default class ClientesService {

	getAllClientesCobradores(id) {
		return axios.get(`Cobradores?doc=${id}&sub=Clientes`).then( response => response).catch(error => {return error});
	}

	guardarClienteCobrador(ui_cobrador,data) {
        return axios.post(`CobradoresGuardarClientes?doc=${ui_cobrador}&sub=Clientes`,data).then( response => response); 
	}

	guardarActualizarClienteCobrador(id_cobrador,id_cliente,data) {
        return axios.post(`CobradoresClientesUpdate?doc=${id_cobrador}&subdoc=${id_cliente}`,data).then( response => response); 
	}

}