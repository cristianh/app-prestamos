<template>
<div>
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
        isLoading: false,
       fullPage: true,
       loading:'',
       items:[],
       empresaservice:null,
       usuarioOnLogin:'' 
      }
  },
  props: {
    fields: {
      type: Array,
      default () {
        return ['id','Nombre', 'Balance']
      }
    },
    caption: {
      type: String,
      default: 'Empresas'
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
      this.isLoading = true;
      this.empresaservice=new EmpresaService();
    this.empresaservice.getAllEmpresas(this.usuarioOnLogin).then( (response) =>  {
          this.isLoading = false;
        if(response.data!='Not Found'){ 
          this.items=response.data;
        }
        
        
        console.table(response.data);
        this.isLoadUsers= true;
    }).catch(error => {
        console.log(error);
    });
    
  },
  methods: {
     onCancel() {
              
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
