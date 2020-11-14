import qs from 'qs';

export default class SupervisoresService {

    guardarSupervisor(id_admin, idEmpresa, data_supervisor) {
        return axios.post(`SupervisorGuardar?idadmin=${id_admin}&doc=${idEmpresa}`, qs.stringify(data_supervisor), {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
        }).then(response => response).catch(error => { return error });
    }


}