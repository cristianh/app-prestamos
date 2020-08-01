<template>
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
        <CCol md="12">
  <CCard>
    <CCardHeader>
      <slot name="header">
        <CIcon name="cil-grid"/> {{caption}}
      </slot>
    </CCardHeader>
    <CCardBody>
      <CDataTable
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
      </CDataTable>
    </CCardBody>
  </CCard>
        </CCol>
         <loading :active.sync="isLoading" 
        :can-cancel="true"
        color='#007BFF' 
        :on-cancel="onCancel"
        :is-full-page="fullPage"></loading>
  </CRow>
</template>

<script>
import Loading from 'vue-loading-overlay';
import TransaccionesService from '../Transferencias/Services/TransaccionServices.js';
import EmpresaService from '../Empresa/Services/EmpresasService.js';
export default {
  name: 'Table',
   components: {
            Loading
  },
  data() {
      return {
          isLoading: false,
          fullPage: true,
          loading:'Cargando...',
          items:[],
          transaccionservice:null,
          empresaservice:null,
          empresas:[{ value: 'Seleccione', label: 'Seleccione' }],
          usuarioOnLogin:'',
          usuario:{
            empresa:''
          },

      }
  },
  props: {
    fields: {
      type: Array,
      default () {
        return ['Envia','mensaje', 'estado_transaccion', 'fecha', 'hora','valor']
      }
    },
    caption: {
      type: String,
      default: 'Historial transacciones'
    },
    hover: Boolean,
    striped: Boolean,
    bordered: Boolean,
    small: Boolean,
    fixed: Boolean,
    dark: Boolean
  },
  created() {
       this.transaccionservice=new TransaccionesService();
       this.empresaservice=new EmpresaService();
  },
  beforeMount() {
    this.usuarioOnLogin=localStorage.getItem('id');
     this.empresaservice.getAllEmpresas(this.usuarioOnLogin).then((result)=>{
        let tamporal_empresas=[];
        tamporal_empresas=result.data;
          for (const key in tamporal_empresas) {
            if (tamporal_empresas.hasOwnProperty(key)) {
                 let element={ value: tamporal_empresas[key].id, label: tamporal_empresas[key].Nombre };
                 
                 this.empresas.push(element);
                 
                
            }
         }
        
        });
  
    //   let id_admin= localStorage.getItem('id');
   
  },
  methods: {
     onCancel() {
              console.log('User cancelled the loader.')
     },
       onSelectdEmpresa(){
           this.usuarioOnLogin=localStorage.getItem('id');
           this.isLoading = true;
           if(this.usuario.empresa!='Seleccione'){
             console.log(this.usuario.empresa);
           this.transaccionservice.getHistorialTransaccion(this.usuarioOnLogin,this.usuario.empresa).then((res)=>{
              console.log(res.data);
              this.isLoading = false;
              if(res.data!='Not Found'){
                this.items=Object.values(res.data);
              }else{
                this.items=[];
              }
               
           });
           }
           else{
             this.isLoading = false;
           }
          
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