
export default class AbonoService {

	getTazaseInteres(id) {
		return axios.get(`Cobradores?doc=${id}&sub=Clientes`).then( response => response).catch(error => {return error});
	}

	guardarAbonosCobros(ui_cobrador,id_cliente,data) {
        return axios.post(`CobradoresGuardarCobros?doc=${ui_cobrador}&sub=${id_cliente}`,data).then( response => response); 
	}
}