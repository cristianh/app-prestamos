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
      <template #valor="{item}">
          <td style="text-aling:center">
          
            {{item.valor==undefined?'NA':item.valor}}
          </td>
        </template>
        <template #dias_con_mora="{item}">
          <td style="text-aling:center">
            <CBadge :color="getBadge(item.dias_con_mora)">{{item.dias_con_mora==undefined?'NA':item.dias_con_mora}}</CBadge>
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
      usuarioOnLogin:'',
       isLoading: false,
       fullPage: true,
       loading:'',
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
        return ['nombre', 'apellido','identificacion','telefono','oficio','valor','dias_con_mora']
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
  },
  methods: {
     getBadge (dias_con_mora) {
      return dias_con_mora==0 ? 'success'
        : dias_con_mora===1 || dias_con_mora===2 ? 'primary'
          : dias_con_mora==3 ? 'warning'
            :dias_con_mora>5 ? 'danger' : 'secondary'
    },
     onCancel() {
              console.log('User cancelled the loader.')
     },
     onSelectdEmpresa(){
            this.isEnabled=false;
            this.zonas=[{ value: 'Seleccione', label: 'Seleccione' }];
            let tamporal_Zonas=[];
            
            this.zonaservice.getAllZonasEmpresa(this.usuarioOnLogin,this.usuario.empresa,'Zonas').then((response)=>{
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
            console.log("...",this.usuario.zonas);
            this.cobradorservice.buscarCobradorPorZona(this.usuarioOnLogin,this.usuario.zonas).then((response)=>{ 
              console.log(response);
              this.clienteservices.getAllClientesCobradores(this.usuarioOnLogin,response.data).then((response)=>{
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
            let Usuario=element.data.usuario;
            let Prestamos=element.data.prestamos[0];
            let Completo=Object.assign(Usuario, Prestamos);
                this.items.push(Completo);
            });
            
               
            });
             
            });
           
     },
     onSelectedCobrador(){

     }
  }
}       
</script>
