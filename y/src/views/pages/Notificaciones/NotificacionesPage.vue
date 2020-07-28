<template>
    <div>

         <CCard v-for="(notificacion,index,key) in getDatosTransferencia" :key="key">
           <CCardHeader>
        <strong>Transaccion realizada por:</strong>
     
      </CCardHeader>
        <CCardBody>
          <CAlert show :color="estado_transaccion">
            <h4 class="alert-heading">{{notificacion.nombreCobradorEnvia}}</h4>
            <h6 class="alert-heading">Fecha: {{notificacion.fecha}}- Hora: {{notificacion.hora}} </h6>
            <p>
             Mensaje: {{notificacion.mensaje}}
            </p>
            <hr>
            <p class="mb-0">
             Saldo de la transaccion: <b>${{notificacion.valor}}</b>
            </p>
          </CAlert>
        </CCardBody>
            <CCardFooter>
      <CRow>
       <CCol col="4" sm="4" md="2" xl class="mb-3 mb-xl-0">
            <CButton type="submit" size="sm" @click="onAceptarTransferencia" color="success" >ACEPTAR</CButton>
          </CCol>
    </CRow>
    </CCardFooter>
      </CCard>
        {{getDatosTransferencia}}
    </div>
</template>

<script>
import EmpresaService from '../Empresa/Services/EmpresasService.js';
import TransaccionesService from '../Transferencias/Services/TransaccionServices.js';
export default {
    data() {
        return {
            estado_transaccion:'warning',
            empresaservice:null,
            transaccionservice:null,
            empresas:[{ value: 'Seleccione', label: 'Seleccione' }],
        }
    },
    created() {
        this.empresaservice=new EmpresaService();
        this.transaccionservice=new TransaccionesService();
    },
    methods: {
  updateValorBalance(idEmpresa,saldoActualEmpresa,saldoTransaccion,transaccionDatos){
       let id_admin= localStorage.getItem('id');
       let nuevoSaldoEmpresa=Number(saldoActualEmpresa)+Number(saldoTransaccion)
       

       // Get a new write batch
var batch = db.batch();

// Update the population of 'SF'
// /usuarios/Nf05nKycByv8CrjrzfL6/empresas/mhVF3FZqPlNAx1sV9c0o/Zonas/SmhRYXL86AUXG2JBZaNU
var sfRef = db.collection("usuarios").doc(id_admin).collection("empresas").doc(idEmpresa);
batch.update(sfRef, {"Balance": nuevoSaldoEmpresa});



// Commit the batch
batch.commit().then( () =>{
    // ...
    console.log('balance actualizado');
        this.transaccionservice.elminiarTransaccionEmpresa(id_admin,idEmpresa);
        transaccionDatos.estado_transaccion=true;
        this.transaccionservice.guardarHistorialTransaccion(id_admin,idEmpresa,transaccionDatos);
        this.estado_transaccion='success'
   });
  
    },
        onAceptarTransferencia(){
            let id_infotransferencia= this.$store.getters.getDatosTransferencia;
            let id_admin= localStorage.getItem('id');
           
            this.empresaservice.getEmpresaPorId(id_admin,id_infotransferencia[0].idEmpresa).then((response)=>{
                console.log(response.data.Balance);
                this.updateValorBalance(id_infotransferencia[0].idEmpresa,response.data.Balance,id_infotransferencia[0].valor,id_infotransferencia[0]);
            })
        }
    },
    computed: {
        getDatosTransferencia(){
            return this.$store.getters.getDatosTransferencia
        }
    },
}
</script>