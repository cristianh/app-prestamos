

export default class CobradoresService {

	getAllCobradores() {
		return axios.get('Cobradores?doc=todos').then( response => response).catch(error => {return error});
	}

    guardarZonaEmpresa(id,data) {
        return axios.post('EmpresasGuardarZonas?doc='+id +'&sub=zonas',data).then( response => response.data).catch(error => {return error}); 
	}

	getCarsMedium() {
		return axios.get('demo/data/cars-medium.json').then(res => res.data.data);
	}

	getCarsLarge() {
		return axios.get('demo/data/cars-large.json').then(res => res.data.data);
	}
}