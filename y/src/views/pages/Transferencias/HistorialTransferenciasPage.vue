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
    <!-- {{items}} -->
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
        <template #estado_transaccion="{item}">
          <td>
            <!-- {{item}} -->
            <CBadge :color="getBadge(item.estado_transaccion)">{{getBadgeText(item.estado_transaccion)}}</CBadge>
          </td>
        </template>
        <!-- <template #dias_con_mora="{item}">
          <td style="text-aling:center">
            <CBadge :color="getBadge(item.dias_con_mora)">{{item.dias_con_mora==undefined?'NA':item.dias_con_mora}}</CBadge>
          </td>
        </template> -->
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
import 'vue-loading-overlay/dist/vue-loading.css';
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
        return ['envia','recibe','mensaje','estado_transaccion', 'fecha', 'hora','valor']
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
             
     },
       onSelectdEmpresa(){
           this.usuarioOnLogin=localStorage.getItem('id');
           this.isLoading = true;
           if(this.usuario.empresa!='Seleccione'){
             
           this.transaccionservice.getHistorialTransaccion(this.usuarioOnLogin,this.usuario.empresa).then((res)=>{
             
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
      
      // return status == 1 ? 'success':'danger'

       switch (Number(status)) {
           case 0:
             return 'info'
             break;
           case 1:
             return 'success'
             break;
           case 2:
             return 'danger'
             break;
         
           default:
             break;
         }
        
    },
    getBadgeText (status) {
      // return status == 1 ? 'Aprobado' : 'Cancelado'
       switch (Number(status)) {
           case 0:
             return 'Pendiente'
             break;
           case 1:
             return 'Aprobado'
             break;
           case 2:
             return 'Cancelado'
             break;
         
           default:
             break;
         }
        
    }
    
  }
}
</script>