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
          <Column field="rol" header="Rol"></Column>
          <Column field="nombre" header="Nombre"></Column>
          <Column field="apellido" header="Apellido"></Column>
          <Column field="identificacion" header="Identificacion"></Column>
          <!-- <Column field="empresa" header="Empresa"></Column> -->
          <Column field="direccion1" header="Direccion" ></Column>
          <Column field="telefono" header="Telefono" ></Column>
          <Column>
        <template #body="items">
          <!-- @click="editProduct(slotProps.data)" -->
          <!-- @click="confirmDeleteProduct(slotProps.data)"  -->
            <!-- <Button icon="pi pi-pencil" class="p-button-rounded p-button-success p-mr-2" @click="editProduct(slotProps.data)"  />
            <Button icon="pi pi-trash" class="p-button-rounded p-button-warning" /> -->
            <!-- @click="onActuaizarEstadoTransaccion(items.data.id)" -->
            <CButton size="sm" class="m-2"   @click="editInfoCobrador(items)" color="warning">EDITAR</CButton>
            <!-- <CButton size="sm" class="m-2"  @click="confirmDeleteCobrador(items)"  color="danger">ELIMINAR</CButton> -->
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
        <strong>Editar informacion cobrador:</strong>
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
          label="Nombre:"
          placeholder="nombre"
          v-model="cobrador_edit_form.nombre"
        />
      </CCol>
    </CRow>
    <CRow>
      <CCol sm="12">
        <CInput
        label="Apellido:"
        placeholder="apellido"
        v-model="cobrador_edit_form.apellido"
         />
        
      </CCol>
    </CRow>
    <CRow>
      <CCol sm="12">
        <CInput
        label="Identificacion:"
        placeholder="identificacion"
        v-model="cobrador_edit_form.identificacion"
         />
        
      </CCol>
    </CRow>
    <CRow>
      <CCol sm="12">
        <CInput
        label="Direccion:"
        placeholder="direccion"
        v-model="cobrador_edit_form.direccion"
         />
        
      </CCol>
    </CRow>
    <CRow>
      <CCol sm="12">
        <CInput
                  label="Telefono:"
                  placeholder="telefono"
                  v-model="cobrador_edit_form.telefono"
         />
        
      </CCol>
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
    import CobradorService from '../Cobradores/Services/CobradoresService';
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
        idCobrador:'',
        displayConfirmation:false,
        cobrador_edit_form:{
          nombre:'',
          apellido:'',
          identificacion:'',
          direccion:'',
          telefono:'' 
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
       cobradoreservice:null,
       usuarioOnLogin:'',
       empresas:[{ value: 'Seleccione', label: 'Seleccione' }],
      }
  },
  props: {
    fields: {
      type: Array,
      default () {
        return ['rol','nombre','apellido', 'identificacion','telefono','direccion1']
      }
    },
    caption: {
      type: String,
      default: 'Cobradores'
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
      this.cobradoreservice=new CobradorService();
  },
  methods: {
    oncloseConfirmation(){
      this.displayConfirmation=false
    },
    onConfirmacion(){
      this.displayConfirmation=false
      let posicion=this.items.findIndex(x=>x.id==this.idCobrador);
            this.items.splice(posicion,1);
            let adminId=localStorage.getItem('id');
            this.cobradoreservice.getBorrarCobrador(adminId,this.idEmpresa,this.idCobrador).then((resp)=>{
                this.$toast.add({severity:'info', summary: 'Atencion!.', detail:resp.data.mensaje, life: 5000});

            });
            
            // db.collection('usuarios').doc(adminId).collection('empresas').doc(this.idEmpresa).collection('parametros_cobros').doc(this.idCobrador).delete().then(res => {
            //   console.log(res);
              
              
            //     // return response.status(200).send(JSON.stringify({ mensaje: 'Plan de pago actualizado', id: res.id })).end();
            // }).catch((error) => {
            //     // return response.status(500).send(error);
            // });
    },
     onActualizar(){
      //  alert(product);
       this.warningModal=false
       let adminId=localStorage.getItem('id');
       let data= this.cobrador_edit_form;
       console.log(data);
       console.log(this.idCobrador);
       this.cobradoreservice.getUpdateInfoCobradores(adminId,this.idEmpresa,this.idCobrador,this.cobrador_edit_form).then((resp)=>{
        console.log(resp);
   
      this.$toast.add({severity:'success', summary: 'Correcto!.', detail:resp.data.mensaje, life: 5000});
       let posicion=this.items.findIndex(x=>x.id==this.idCobrador);
       this.items[posicion].nombre=this.cobrador_edit_form.nombre
       this.items[posicion].apellido=this.cobrador_edit_form.apellido
       this.items[posicion].identificacion=this.cobrador_edit_form.identificacion
       this.items[posicion].direccion1=this.cobrador_edit_form.direccion
       this.items[posicion].telefono=this.cobrador_edit_form.telefono

      this.cobrador_edit_form={
          nombre:'',
          apellido:'',
          identificacion:'',
          direccion:'',
          telefono:'' 
      }
      })
     },
      editInfoCobrador(infocobrador) {
           this.warningModal=true
          //  console.log(interes);
           this.idEmpresa=this.usuario.empresa
           this.idCobrador=infocobrador.data.id
           this.cobrador_edit_form.nombre=infocobrador.data.nombre
           this.cobrador_edit_form.apellido=infocobrador.data.apellido
           this.cobrador_edit_form.identificacion=infocobrador.data.identificacion
           this.cobrador_edit_form.telefono=infocobrador.data.telefono
           this.cobrador_edit_form.direccion=infocobrador.data.direccion1
      },
        confirmDeleteCobrador(interes) {
            this.warningModal=false
            this.displayConfirmation=true

           this.idEmpresa=this.usuario.empresa
           this.idCobrador=infocobrador.data.id
           this.cobrador_edit_form.nombre=infocobrador.data.nombre
           this.cobrador_edit_form.apellido=infocobrador.data.apellido
           this.cobrador_edit_form.identificacion=infocobrador.data.identificacion
           this.cobrador_edit_form.telefono=infocobrador.data.telefono
           this.cobrador_edit_form.direccion=infocobrador.data.direccion1
            
             
      },
      onSelectdEmpresa(){
        //   =localStorage.getItem('id');
          this.isLoading = true;
           this.cobradoreservice.getAllCobradores(this.usuarioOnLogin,this.usuario.empresa).then((response) => {
            
            
            console.log(response.data);
                this.isLoading = false;
                if(response.data!='Not Found'){ 
                 this.items=response.data;
                }else{
                    this.items=[];
                    
                }
                
                
                console.table(response.data);

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
