
export default class CobradorServices {

	getAllInfoCobradores(id) {
		return axios.get(`Cobradores?doc=${id}`).then( response => response).catch(error => {return error});
	}

	getZonaCobrador(id) {
        return axios.get(`Cobradores?doc=${id}&sub=Rutas`).then( response => response); 
	}

	guardarClienteCobrador(){
		
	}
}