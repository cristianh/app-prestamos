<template>
<CRow>
        <CCol md="12">
          <CRow>
      <CCol>
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
      <CCol>
         <CCard>
         <!-- <CCardHeader>
           Zonas:
         </CCardHeader> -->
         
         <CCardBody>
            <CSelect
                  label="Zonas"
                  :options="zonas"
                   :value.sync="usuario.zonas"
                  :disabled=isEnabled
                  @change="onSelectedZona"
                />
               
         </CCardBody>
        </CCard>
      </CCol>
    </CRow>
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
  // Import component
    import Loading from 'vue-loading-overlay';
    // Import stylesheet
    import 'vue-loading-overlay/dist/vue-loading.css';
    
import ZonaService from '../Zonas/Services/ZonaService.js';
import ClientesService from './Services/ClientesServices.js';
import EmpresaService from '../Empresa/Services/EmpresasService.js';
import CobradoresService from '../Cobradores/Services/CobradoresService.js';


export default {
  name: 'Table',
  components: {
            Loading
  },
  data() {
      return {
       isLoading: false,
       fullPage: true,
       loading:'',
       items:[],
       isEnabled:true,
       clienteservices:null,
       empresaservice:null,
       zonaservice:null,
       cobradorservice:null,   
       items:[],    
       usuario:{
            empresa:'',
            zona:''
       },
        empresas:[{ value: 'Seleccione', label: 'Seleccione' }],
        zonas:[{ value: 'Seleccione', label: 'Seleccione' }]
      }
  },
  props: {
    fields: {
      type: Array,
      default () {
        return ['nombre', 'apellido','identificacion','telefono','oficio']
      }
    },
    caption: {
      type: String,
      default: 'Clientes'
    },
    hover: Boolean,
    striped: Boolean,
    bordered: Boolean,
    small: Boolean,
    fixed: Boolean,
    dark: Boolean
  },
  created() {
    this.empresaservice= new EmpresaService();
    this.clienteservices = new ClientesService();
    this.zonaservice = new ZonaService();
    this.cobradorservice= new CobradoresService();
  },
  beforeMount(){
     this.empresaservice.getAllEmpresas().then((result)=>{
        let tamporal_empresas=[];
        tamporal_empresas=result.data;
          for (const key in tamporal_empresas) {
            if (tamporal_empresas.hasOwnProperty(key)) {
                 let element={ value: tamporal_empresas[key].id, label: tamporal_empresas[key].Nombre };
                 
                 this.empresas.push(element);
                 
                
            }
         }
        
        });
  },
  methods: {
     onCancel() {
              console.log('User cancelled the loader.')
     },
     onSelectdEmpresa(){
            this.isEnabled=false;
            this.zonas=[{ value: 'Seleccione', label: 'Seleccione' }];
            let tamporal_Zonas=[];
            
            this.zonaservice.getAllZonasEmpresa(this.usuario.empresa,'Zonas').then((response)=>{
            //console.log(response);
            tamporal_Zonas=response;
            for (const key in tamporal_Zonas) {
            if (tamporal_Zonas.hasOwnProperty(key)) {
                
                  let element={ value: tamporal_Zonas[key].id, label: tamporal_Zonas[key].nombre };
                  this.zonas.push(element);
                  // console.log(this.zonas);
            }
        }   
             
        });
     },
     onSelectedZona(){
         let tamporal_Clientes=[];
            this.cobradores=[{ value: 'Seleccione', label: 'Seleccione' }];
             this.isLoading = true;
            console.log(this.usuario.zonas);
            this.cobradorservice.buscarCobradorPorZona(this.usuario.zonas).then((response)=>{ 
          
              this.clienteservices.getAllClientesCobradores(response.data).then((response)=>{
              console.log(response);
              this.isLoading = false;
            // tamporal_Clientes=response;
            // for (const key in tamporal_Clientes) {
            // if (tamporal_Clientes.hasOwnProperty(key)) {
                
            //       let element={ value: tamporal_Clientes[key].id, label: tamporal_Clientes[key].nombre };
            //       this.cobradores.push(element);
            //       // console.log(this.zonas);
            //  }
            // }
            let usuarios=[];
            
            response.data.forEach(element => {
              console.log(element.data);
            // console.log(typeof(usuarios));
            // console.log(Object.values(usuarios));
                this.items.push(element.data.usuario);
            });
            
               
            });
             
            });
           
     },
     onSelectedCobrador(){

     }
  }
}       
</script>
