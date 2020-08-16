<template>
<div>
    <CRow>
        <CCol md="12">
        <CCard>
         <CCardBody>
              <CSelect
                  label="Empresas"
                  :options="empresas"
                  :value.sync="usuario.empresa"
                  @change="onSelectdEmpresa"
                />
         </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  <CCard>
    <CCardHeader>
      <slot name="header">
        <CIcon name="cil-grid"/> {{caption}}
      </slot>
    </CCardHeader>
    
    <CCardBody>
      <!-- <CDataTable
        :hover="hover"
        :striped="striped"
        :bordered="bordered"
        :small="small"
        :fixed="fixed"
        :items="items"
        :fields="fields"
        :items-per-page="small ? 10 : 5"
        :dark="dark"
        pagination
      >
        <template #status="{item}">
          <td>
            <CBadge :color="getBadge(item.status)">{{item.status}}</CBadge>
          </td>
        </template>
      </CDataTable> -->
        <DataTable :value="items" :loading="loading"  :paginator="items.length==0?estadopaginado=false:estadopaginado=true" :rows="5">
          <template #loading>
              Cargando transacciones
          </template>
          <!-- <Column field="nombre_zona_envia" header="Zona"></Column> -->
          <!-- <Column v-for="col of columns" :field="col.field" :header="col.header" :key="col.field"></Column> -->
          <Column field="nombre" header="Nombre"></Column>
          <Column field="interes" header="Interes"></Column>
          <!-- <Column field="empresa" header="Empresa"></Column> -->
          <Column field="plazo" header="Plazo(dias)" ></Column>
          <Column>
        <template #body="items">
          <!-- @click="editProduct(slotProps.data)" -->
          <!-- @click="confirmDeleteProduct(slotProps.data)"  -->
            <!-- <Button icon="pi pi-pencil" class="p-button-rounded p-button-success p-mr-2" @click="editProduct(slotProps.data)"  />
            <Button icon="pi pi-trash" class="p-button-rounded p-button-warning" /> -->
            <!-- @click="onActuaizarEstadoTransaccion(items.data.id)" -->
            <CButton size="sm" class="m-2"   @click="editProduct(items)" color="warning">EDITAR</CButton>
            <CButton size="sm" class="m-2"  @click="confirmDeleteProduct(items)"  color="danger">ELIMINAR</CButton>
        </template>
        </Column>
          <!-- <Column field="year" header="Year"></Column> -->
    <!-- <Column field="brand" header="Brand"></Column>
    <Column field="color" header="Color"></Column> -->
      </DataTable>
    </CCardBody>
  </CCard>
   <loading :active.sync="isLoading" 
        :can-cancel="true"
        color='#007BFF' 
        :on-cancel="onCancel"
        :is-full-page="fullPage"></loading>

          <CModal
      title="Editar"
      color="info"
      :show.sync="warningModal"
      :centered=true
    >
       <CCard>
         <CCardHeader>
        <strong>Editar plan de pago:</strong>
        <div class="card-header-actions">
          <a 
            href="https://coreui.io/vue/docs/components/button-components" 
            class="card-header-action" 
            rel="noreferrer noopener" 
            target="_blank"
          >
            
          </a>
        </div>
      </CCardHeader>
         <CCardBody>
    <CRow alignHorizontal="start">
      <CCol sm="12">
          
        <CInput
          label="Nombre del plan"
          placeholder="ingrese el nombre del nuevo plan."
          v-model="planpago_edit_form.nombre"
        />
      </CCol>
    </CRow>
    <CRow>
      <CCol sm="12">
        <CInput
                  label="Interes del plan"
                  placeholder="Ingrese el interes del plan"
                  v-model="planpago_edit_form.interes"
         />
        
      </CCol>
    </CRow>
     <CRow>
      <CCol sm="12">
      <CInput
                description="Ingrese los dias de plazo del plan"
                label="Plazo plan (dias)"
                placeholder="dias."
                v-model="planpago_edit_form.plazo"
              />
      </CCol>
     </CRow>
      <CRow>
      <!-- <CCol md="12">
        <CSelect
                  label="Empresas"
                  :options="empresas"
                  :value.sync="planpago_edit_form.empresa"
                />
      </CCol> -->
      </CRow>
    
    </CCardBody>
     </CCard>
     <template #footer>
      <CRow>
       <CCol col="4" sm="4" md="2" xl class="mb-3 mb-xl-0">
            <CButton color="success"  @click="onActualizar" >ACTUALIZAR</CButton>
          </CCol>
    </CRow>
     </template>
    </CModal>
    <Dialog header="Confirmacion" :visible.sync="displayConfirmation" :style="{width: '350px'}" :modal="true">
    <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
        <span>Seguro desea eliminar?</span>
    </div>
    <template #footer>
        <Button label="No" icon="pi pi-times" @click="oncloseConfirmation" class="p-button-text"/>
        <Button label="Si" icon="pi pi-check" @click="onConfirmacion" class="p-button-text" autofocus />
    </template>
</Dialog>
    <Toast  autoZIndex position="bottomright" />
</div>
</template>

<script>
// Import component
import Dialog from 'primevue/dialog';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';
    import Loading from 'vue-loading-overlay';
    // Import stylesheet
    import 'vue-loading-overlay/dist/vue-loading.css';
    import EmpresaService from '../Empresa/Services/EmpresasService.js';
    import TazaInteresService from '../TazaInteres/Services/TazasDeInteresServices.js';
export default {
  name: 'Table',
  components: {
    Dialog,
            Loading,
            DataTable,
            Column,
            ColumnGroup
  },
  data() {
      return {
        idEmpresa:'',
        idPlan:'',
        displayConfirmation:false,
        planpago_edit_form:{
          nombre:'',
          interes:'',
          plazo:'' 
      },
         warningModal: false,
          usuario:{
              empresa:''
          },
       isLoading: false,
       fullPage: true,
       loading:false,
       items:[],
       empresaservice:null,
       tazainteresservice:null,
       usuarioOnLogin:'',
       empresas:[{ value: 'Seleccione', label: 'Seleccione' }],
      }
  },
  props: {
    fields: {
      type: Array,
      default () {
        return ['nombre','empresa','interes', 'plazo']
      }
    },
    caption: {
      type: String,
      default: 'Planes'
    },
    hover: Boolean,
    striped: Boolean,
    bordered: Boolean,
    small: Boolean,
    fixed: Boolean,
    dark: Boolean
  },
  beforeMount(){
    this.usuarioOnLogin=localStorage.getItem('id');
      
   let tamporal_empresas=[];
      this.empresaservice.getAllEmpresas(this.usuarioOnLogin).then((result)=>{
        this.isLoading=false
        if(result.data!='Not Found'){
        tamporal_empresas=result.data;
        console.log(tamporal_empresas);
          for (const key in tamporal_empresas) {
            if (tamporal_empresas.hasOwnProperty(key)) {
                 let element={ value: tamporal_empresas[key].id, label: tamporal_empresas[key].Nombre };
                 
                 this.empresas.push(element);
                 
                
            }
         }
        }
        
        });
   
    
  },
  created() {
      this.empresaservice=new EmpresaService();
      this.tazainteresservice=new TazaInteresService();
  },
  methods: {
    oncloseConfirmation(){
      this.displayConfirmation=false
    },
    onConfirmacion(){
      this.displayConfirmation=false
      let posicion=this.items.findIndex(x=>x.id==this.idPlan);
            this.items.splice(posicion,1);
            let adminId=localStorage.getItem('id');
             this.$toast.add({severity:'error', summary: 'Atencion!.', detail:'Plan eliminado', life: 5000});
            db.collection('usuarios').doc(adminId).collection('empresas').doc(this.idEmpresa).collection('parametros_cobros').doc(this.idPlan).delete().then(res => {
              console.log(res);
              
              
                // return response.status(200).send(JSON.stringify({ mensaje: 'Plan de pago actualizado', id: res.id })).end();
            }).catch((error) => {
                // return response.status(500).send(error);
            });
    },
     onActualizar(){
      //  alert(product);
       this.warningModal=false
       let adminId=localStorage.getItem('id');
       let data= this.planpago_edit_form;
       console.log(data);
       db.collection('usuarios').doc(adminId).collection('empresas').doc(this.idEmpresa).collection('parametros_cobros').doc(this.idPlan).update(
         {
           nombre:this.planpago_edit_form.nombre,
           interes:this.planpago_edit_form.interes,
           plazo:this.planpago_edit_form.plazo
          }).then(res => {
            this.$toast.add({severity:'warn', summary: 'Atencion!.', detail:'Plan actualizado', life: 5000});
            let posicion=this.items.findIndex(x=>x.id==this.idPlan);
            this.items[posicion].nombre=this.planpago_edit_form.nombre
            this.items[posicion].interes=this.planpago_edit_form.interes
            this.items[posicion].plazo=this.planpago_edit_form.plazo
                // return response.status(200).send(JSON.stringify({ mensaje: 'Plan de pago actualizado', id: res.id })).end();
            }).catch((error) => {
                // return response.status(500).send(error);
            });
      //  this.tazainteresservice.actualizarTazaDeInteres(adminId,this.idEmpresa,this.idPlan,this.planpago_edit_form).then((resp)=>{
      //   console.log(resp);
      // })
     },
      editProduct(interes) {
           this.warningModal=true
          //  console.log(interes);
           this.idEmpresa=interes.data.empresa
           this.idPlan=interes.data.id
           this.planpago_edit_form.nombre=interes.data.nombre
           this.planpago_edit_form.plazo=interes.data.plazo
           this.planpago_edit_form.interes=interes.data.interes
      },
        confirmDeleteProduct(interes) {
            this.warningModal=false
            this.displayConfirmation=true
            this.idEmpresa=interes.data.empresa
           this.idPlan=interes.data.id
           
           this.planpago_edit_form.nombre=interes.data.nombre
           this.planpago_edit_form.plazo=interes.data.plazo
           this.planpago_edit_form.interes=interes.data.interes
            
             
      },
      onSelectdEmpresa(){
        //   =localStorage.getItem('id');
          this.isLoading = true;
           this.empresaservice.getAllTazaeInteres(this.usuarioOnLogin,this.usuario.empresa).then((response) => {
            
            
            console.log(response.data);
                this.isLoading = false;
                if(response.data!='Not Found'){ 
                 this.items=response.data;
                }else{
                    this.items=[];
                    
                }
                
                
                console.table(response.data);
    //     this.isLoadUsers= true;

            // for (const key in tazaseinteres) {
            //     if (tazaseinteres.hasOwnProperty(key)) {
            //         const element = tazaseinteres[key];
            //         //this.clientes.push(element);
            //         this.$store.state.tasaseinteres.unshift(element);

            //         ///this.clientes_nombres.push(element.data.usuario.nombre);

            //     }
            // }
    });
      },
     onCancel() {
              console.log('User cancelled the loader.')
     },
    getBadge (status) {
      return status === 'Active' ? 'success'
        : status === 'Inactive' ? 'secondary'
          : status === 'Pending' ? 'warning'
            : status === 'Banned' ? 'danger' : 'primary'
    }
  }
}
</script>
