import axios from 'axios'

export default class ZonaService {


    guardarZonaEmpresa(id,data) {
        return axios.post('https://us-central1-manifest-life-279516.cloudfunctions.net/EmpresasGuardarZonas?doc='+id +'&sub=zonas',data).then( response => response.data).catch(error => {return error}); 
	}

	getAllZonasEmpresa(id_empresa,subdocu) {
		return axios.get('https://us-central1-manifest-life-279516.cloudfunctions.net/EmpresasZonas?doc='+id_empresa+'&sub='+subdocu).then(res => res.data.data);
	}

	getCarsMedium() {
		return axios.get('demo/data/cars-medium.json').then(res => res.data.data);
	}

	getCarsLarge() {
		return axios.get('demo/data/cars-large.json').then(res => res.data.data);
	}
}