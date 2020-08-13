<template>
    <div>
        <CRow>
    <CCol>
        <!-- <pre>{{items}}</pre> -->
        <!-- <pre>{{getDatosTransferencia}}</pre> -->
        <DataTable :value="items" :loading="loading"  :paginator="items.length==0?estadopaginado=false:estadopaginado=true" :rows="5">
          <template #loading>
              Cargando transacciones
          </template>
          <!-- <Column field="nombre_zona_envia" header="Zona"></Column> -->
          <!-- <Column v-for="col of columns" :field="col.field" :header="col.header" :key="col.field"></Column> -->
          <Column field="data.enviado_por" header="Enviado por"></Column>
          <Column field="data.nombre_zona_recibe" header="Envia a"></Column>
          <!-- <Column field="data.idCobrador_recibe" header="Recibe" headerStyle="width: 24%"></Column> -->
          <Column field="data.fecha" header="Fecha"  headerStyle="width: 14%"></Column>
          <Column field="data.hora" header="Hora"></Column>
          <Column field="data.mensaje" header="Mensaje"></Column>
            <Column field="data.valor" header="Valor"></Column>
          <Column>
        <template #body="items">
          <!-- @click="editProduct(slotProps.data)" -->
          <!-- @click="confirmDeleteProduct(slotProps.data)"  -->
            <!-- <Button icon="pi pi-pencil" class="p-button-rounded p-button-success p-mr-2" @click="editProduct(slotProps.data)"  />
            <Button icon="pi pi-trash" class="p-button-rounded p-button-warning" /> -->
            <CButton size="sm" class="m-2" @click="onActuaizarEstadoTransaccion(items.data.id)" color="success">ACEPTAR</CButton>
            <CButton size="sm" class="m-2"  @click="onAbortarTransaccion(items.data.id)" color="warning">ABORTAR</CButton>
        </template>
        </Column>
          <!-- <Column field="year" header="Year"></Column> -->
    <!-- <Column field="brand" header="Brand"></Column>
    <Column field="color" header="Color"></Column> -->
      </DataTable>
     
      </CCol>
    
    </CRow>
     
        <!-- {{getDatosTransferencia}} -->
         <loading :active.sync="isLoading" 
        :can-cancel="true"
        color='#007BFF' 
        :on-cancel="onCancel"
        :is-full-page="fullPage"></loading>
    </div>
</template>

<script>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';
import EmpresaService from '../Empresa/Services/EmpresasService.js';
import TransaccionesService from '../Transferencias/Services/TransaccionServices.js';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
export default {
    components: {
    DataTable,
    Column,
    ColumnGroup,
    Loading
  },
    data() {
        return {
          isLoading: false,
          fullPage: true,
            loading: false,
            estadopaginado:true,
            items:[],
            estado_transaccion:'warning',
            empresaservice:null,
            transaccionservice:null,
            empresas:[{ value: 'Seleccione', label: 'Seleccione' }],
        }
    },
    created() {
        this.empresaservice=new EmpresaService();
        this.transaccionservice=new TransaccionesService();
             let datos= this.$store.getters.getDatosTransferencia;
             this.loading = true;
      console.log(datos);
      if(datos!=''){
                // this.items=Object.values(datos);
                // datos.filter(x=>x.estado_transaccion!==true)
                this.items=datos;
                 
              }else{
                this.items=[];
        }
        this.loading = false;
    },
   
    beforeMount() {
      this.$store.watch(() => this.$store.getters.getDatosTransferencia, Transacciones => { 
        console.log('watched: ', Transacciones) 
        this.items=Transacciones
        })

    },
    methods: {
     onCancel() {
              console.log('User cancelled the loader.')
     },
      stockClass(data) {
            return [
                {
                    'status-false': data.estado_transaccion === false,
                    'status-tru': data.estado_transaccion === true
                 }
            ];
        },
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
        
        transaccionDatos.estado_transaccion=true;
        this.transaccionservice.guardarHistorialTransaccion(id_admin,idEmpresa,transaccionDatos);
        this.estado_transaccion='success'
         this.isLoading=false;
   });
  
    },
    onAbortarTransaccion(IdTransaferencia){
       this.isLoading=true;
        // console.log("---------------",itemsInfo);
        let id_admin= localStorage.getItem('id');
         let posicion_transacciones=this.items.findIndex(x=>x.id==IdTransaferencia)
         console.log(posicion_transacciones);
         let itemsInfo=this.items[posicion_transacciones]
        if(itemsInfo.data.idEmpresa==""){

        

        this.transaccionservice.actualizarEstadoTransaccion(id_admin,itemsInfo.data.idEmpresa_cobrador,itemsInfo.id,3).then((resp)=>{
        // console.log(resp);
        // this.$store.commit('setDisminuyeContadorTransacciones');
      
        //No
        // let posicion=this.items.findIndex(x=>x.data.id==itemsInfo.data.data.id);
        // this.items.splice(posicion,1);
        // this.$store.commit('setEliminarDatoTransferencia',itemsInfo.data.data.id); 
            itemsInfo.data.estado_cancelado=true;
            this.transaccionservice.guardarHistorialTransaccion(id_admin,itemsInfo.data.idEmpresa_cobrador,itemsInfo.data).then(()=>{
            this.transaccionservice.elminiarTransaccionEmpresa(id_admin,itemsInfo.data.idEmpresa_cobrador,itemsInfo.id);
            let posicion=this.items.findIndex(x=>x.id==itemsInfo.id);
            this.items.splice(posicion,1);
            this.$store.commit('setDisminuyeContadorTransacciones');
            this.$store.commit('setEliminarDatoTransferencia',itemsInfo.id);
            });
           
           
        
         })
        
       
        }else{

        this.transaccionservice.actualizarEstadoTransaccion(id_admin,itemsInfo.data.idEmpresa,itemsInfo.id,3).then((resp)=>{
        // console.log(resp);
        // this.$store.commit('setDisminuyeContadorTransacciones');
      
        //No
        // let posicion=this.items.findIndex(x=>x.data.id==itemsInfo.data.data.id);
        // this.items.splice(posicion,1);
        // this.$store.commit('setEliminarDatoTransferencia',itemsInfo.data.data.id); 
            itemsInfo.data.estado_cancelado=true;
            this.transaccionservice.guardarHistorialTransaccion(id_admin,itemsInfo.data.idEmpresa,itemsInfo.data).then(()=>{
            this.transaccionservice.elminiarTransaccionEmpresa(id_admin,itemsInfo.data.idEmpresa,itemsInfo.id);
            let posicion=this.items.findIndex(x=>x.id==itemsInfo.id);
            this.items.splice(posicion,1);
            this.$store.commit('setDisminuyeContadorTransacciones');
            this.$store.commit('setEliminarDatoTransferencia',itemsInfo.id);
            });
           
           
        
         })
         
        }
    },
     onActuaizarEstadoTransaccion(IdTransaferencia){
        //  console.log(this.items);
        this.isLoading=true;
         let posicion_transacciones=this.items.findIndex(x=>x.id==IdTransaferencia)
        //  console.log(posicion_transacciones);
         let itemsInfo=this.items[posicion_transacciones]
         console.log("--------------------------onActuaizarEstadoTransaccion",itemsInfo);
        if(itemsInfo.data.idEmpresa==""){
            let id_admin= localStorage.getItem('id');
           
          this.transaccionservice.actualizarEstadoTransaccion(id_admin,itemsInfo.data.idEmpresa_cobrador,itemsInfo.id,1).then((resp)=>{
        // console.log(resp);
        this.isLoading=false;
        let posicion=this.items.findIndex(x=>x.id==IdTransaferencia);
        this.items.splice(posicion,1);
        this.$store.commit('setDisminuyeContadorTransacciones');
      
        //No
        // let posicion=this.items.findIndex(x=>x.data.id==itemsInfo.data.data.id);
        // this.items.splice(posicion,1);
        // this.$store.commit('setEliminarDatoTransferencia',itemsInfo.data.data.id); 
        
        
         })
        }else{
        // let id_infotransferencia= this.$store.getters.getDatosTransferencia;
            let id_admin= localStorage.getItem('id');
          //  console.log(itemsInfo.data);
          //  console.log(this.items);
            let posicion_transacciones=this.items.findIndex(x=>x.id==IdTransaferencia)
              console.log(posicion_transacciones);
              let itemsInfo=this.items[posicion_transacciones]
                
                this.$store.commit('setEliminarDatoTransferencia',itemsInfo.id); 
           this.transaccionservice.actualizarEstadoTransaccion(id_admin,itemsInfo.data.idEmpresa_cobrador,itemsInfo.id,1).then((resp)=>{
            this.empresaservice.getEmpresaPorId(id_admin,itemsInfo.data.idEmpresa).then((response)=>{
                console.log(response.data);
                this.$store.commit('setDisminuyeContadorTransacciones');
                this.transaccionservice.guardarHistorialTransaccion(id_admin,itemsInfo.data.idEmpresa,itemsInfo.data).then(()=>{
                this.transaccionservice.elminiarTransaccionEmpresa(id_admin,itemsInfo.data.idEmpresa,itemsInfo.id);
                this.items.splice(posicion_transacciones,1);
                this.updateValorBalance(itemsInfo.data.idEmpresa,response.data.Balance,itemsInfo.data.valor,itemsInfo.data);
            })
           })
          })  
        }
         
      },
        onAceptarTransferencia(){
           
        }
    },
    computed: {
        getDatosTransferencia(){
            return this.$store.getters.getDatosTransferencia
        }
    },
}
</script>

<style lang="less" scoped>
.status-false{
background-color: red;
}
.status-true{
background-color: green;
}
</style>