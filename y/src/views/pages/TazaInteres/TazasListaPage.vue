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
   <loading :active.sync="isLoading" 
        :can-cancel="true"
        color='#007BFF' 
        :on-cancel="onCancel"
        :is-full-page="fullPage"></loading>
</div>
</template>

<script>
// Import component
    import Loading from 'vue-loading-overlay';
    // Import stylesheet
    import 'vue-loading-overlay/dist/vue-loading.css';
    import EmpresaService from '../Empresa/Services/EmpresasService.js';
export default {
  name: 'Table',
  components: {
            Loading
  },
  data() {
      return {
          usuario:{
              empresa:''
          },
       isLoading: false,
       fullPage: true,
       loading:'',
       items:[],
       empresaservice:null,
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
        
        tamporal_empresas=result.data;
        console.log(tamporal_empresas);
          for (const key in tamporal_empresas) {
            if (tamporal_empresas.hasOwnProperty(key)) {
                 let element={ value: tamporal_empresas[key].id, label: tamporal_empresas[key].Nombre };
                 
                 this.empresas.push(element);
                 
                
            }
         }
        
        });
   
    
  },
  created() {
      this.empresaservice=new EmpresaService();
  },
  methods: {
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
