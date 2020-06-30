export default class ZonaService {


    guardarZonaEmpresa(id,info) {
        return axios.post(`EmpresasZonasGuardar?doc=${id}&sub=Zonas`,info).then( response => response.data); 
	}

	guardarCobradoresZona(id_doc,sub_doc,info) {
        return axios.post('ZonasGuardarCobradores?doc='+id_doc+'&subdoc='+sub_doc,info).then( response => response.data).catch(error => {return error}); 
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