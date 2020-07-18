

export default class CobradoresService {

	getAllCobradores() {
		return axios.get('Cobradores?doc=todos').then( response => response).catch(error => {return error});
	}

	buscarCobradorPorZona(idZona){
		return axios.get(`buscarCobradorZona?zona=${idZona}`).then( response => response).catch(error => {return error});
	}
}

