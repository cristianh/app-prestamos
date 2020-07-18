
export default class ClientesService {

	getAllClientesCobradores(id) {
		return axios.get(`Cobradores?doc=${id}&sub=Clientes`).then( response => response).catch(error => {return error});
	}
    
	getCarsMedium() {
		return axios.get('demo/data/cars-medium.json').then(res => res.data.data);
	}

	getCarsLarge() {
		return axios.get('demo/data/cars-large.json').then(res => res.data.data);
	}
}