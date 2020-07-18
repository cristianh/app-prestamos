
export default class EmpresaService {



	getAllEmpresas() {
		return axios.get('Empresas?doc=todos').then( response => response).catch(error => {return error});
	}

    // guardarZonaEmpresa(id,data) {
    //     return axios.post('EmpresasGuardarZonas?doc='+id+'&sub=zonas',data).then( response => response.data).catch(error => {return error}); 
	// }

	guardarEmpresa(data) {
		return axios.post('Empresas',data).then( response => response.data).catch(error => {return error}); 
	}

	guardarNuevoPlanEmpresa(data) {
		return axios.post('GuardarNuevoPlanEmpresa',data).then( response => response.data).catch(error => {return error}); 
	}

	getCarsLarge() {
		return axios.get('demo/data/cars-large.json').then(res => res.data.data);
	}
}