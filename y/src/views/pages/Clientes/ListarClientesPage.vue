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
</CRow>
</template>

<script>
export default {
  name: 'Table',
  data() {
      return {
         items:[],
       usuario:{
            empresa:'',
       },
        empresas:[{ value: 'Seleccione', label: 'Seleccione' }], 
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
    //      axios.get('https://us-central1-manifest-life-279516.cloudfunctions.net/Empresas?doc=todos')
    // .then( (response) =>  {
        
    //     this.items=response.data;
    //     console.table(response.data);
    //     this.isLoadUsers= true;
    // }).catch(error => {
    //     console.log(error);
    // });
  },
  methods: {
     onSelectdEmpresa(){
        //     this.isEnabled=false;
        //     this.zonas=[{ value: 'Seleccione', label: 'Seleccione' }];
        //     let tamporal_Zonas=[];
            
        //     this.zonaService.getAllZonasEmpresa(this.usuario.empresa,'Zonas').then((response)=>{
        //     //console.log(response);
        //     tamporal_Zonas=response;
        //     for (const key in tamporal_Zonas) {
        //     if (tamporal_Zonas.hasOwnProperty(key)) {
                
        //           let element={ value: tamporal_Zonas[key].id, label: tamporal_Zonas[key].nombre };
        //           this.zonas.push(element);
        //           // console.log(this.zonas);
        //     }
        // }   
             
        // });

            
      }
    // getBadge (status) {
    //   return status === 'Active' ? 'success'
    //     : status === 'Inactive' ? 'secondary'
    //       : status === 'Pending' ? 'warning'
    //         : status === 'Banned' ? 'danger' : 'primary'
    // }
  }
}
</script>
