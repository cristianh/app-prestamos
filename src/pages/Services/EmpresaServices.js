
export default class EmpresaServices {

	getAllInfoEmpresa(id) {
		return axios.get(`Empresas?doc=${id}`).then( response => response).catch(error => {return error});
	}

	getAllInfoEmpresaZona(idEmpresa,idZona) {
        return axios.get(`getEmpresaZonaDoc?doc=${idEmpresa}&subdoc=${idZona}`).then( response => response); 
	}

	getAllTazaeInteres() {
        return axios.get(`getTazaseInteres`).then( response => response); 
	}

}