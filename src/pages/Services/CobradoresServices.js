
export default class CobradorServices {

	getAllInfoCobradores(id) {
		return axios.get(`Cobradores?doc=${id}`).then( response => response).catch(error => {return error});
	}

	getZonaCobrador(id) {
        return axios.get(`Cobradores?doc=${id}&subdoc=Rutas`).then( response => response); 
	}

	guardarClienteCobrador(){
		
	}

	guardarJornadaCobrador(ui_cobrador,data) {
        return axios.post(`guardarJornadaInfoRuta?doc=${ui_cobrador}`,data).then( response => response); 
	}

	actualizarJornadaCobrador(ui_rutacobrador,id_rutajornada,data) {
		
        return axios.post(`actualizarJornadaRutaDia?doc=${ui_rutacobrador}&subdoc=${id_rutajornada}`,data).then( response => response); 
	}
}