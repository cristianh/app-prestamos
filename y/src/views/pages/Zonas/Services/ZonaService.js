import axios from 'axios'

export default class ZonaService {


    guardarZonaEmpresa(id,data) {
        return axios.post('EmpresasGuardarZonas?doc='+id +'&sub=zonas',data).then( response => response.data).catch(error => {return error}); 
	}

	getAllZonasEmpresa(id_empresa,subdocu) {
		return axios.get('EmpresasZonas?doc='+id_empresa+'&sub='+subdocu).then(res => res.data);
	}

	getCarsMedium() {
		return axios.get('demo/data/cars-medium.json').then(res => res.data.data);
	}

	getCarsLarge() {
		return axios.get('demo/data/cars-large.json').then(res => res.data.data);
	}
}