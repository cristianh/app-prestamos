
export default class ClientesService {

	getAllClientesCobradores(id) {
		return axios.get(`Cobradores?doc=${id}&sub=Clientes`).then( response => response).catch(error => {return error});
	}

	actualizarPosicionCliente(id_cobrador,id_cliente,data) {
        return axios.post(`actualizarPosicionClienteLista?doc=${id_cobrador}&subdoc=${id_cliente}`,data).then( response => response); 
	}

	guardarClienteCobrador(ui_cobrador,data) {
        return axios.post(`CobradoresGuardarClientes?doc=${ui_cobrador}&sub=Clientes`,data).then( response => response); 
	}

	actualizarClienteCobrador(id_cobrador,id_cliente,data) {
        return axios.post(`CobradoresClientesUpdate?doc=${id_cobrador}&subdoc=${id_cliente}`,data).then( response => response); 
	}

	guardarObservacionNoPago(ui_cobrador,id_cliente,data) {
        return axios.post(`CobradoresGuardarObservacionNoPago?doc=${ui_cobrador}&sub=${id_cliente}`,data).then( response => response); 
	}

	eliminarPrestamoPago(ui_cobrador,id_cliente,data) {
        return axios.post(`ClienteEliminarPrestamosPago?doc=${ui_cobrador}&sub=${id_cliente}`,data).then( response => response); 
	}

}