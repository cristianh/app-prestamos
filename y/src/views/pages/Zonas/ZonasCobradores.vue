<template>
    <div>
        <PickList v-model="cars" dataKey="vin">
    <template #item="slotProps">
        <div class="p-caritem">
            <img :src="'demo/images/car/' + slotProps.item.brand + '.png'">
            <div>
                <span class="p-caritem-vin">{{slotProps.item.vin}}</span>
                <span>{{slotProps.item.year}} - {{slotProps.item.color}}</span>
            </div>
        </div>
    </template>
</PickList>
        <CCard>
         <CCardHeader>
        <strong>Zona:</strong>
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
    <CRow form class="form-group" alignHorizontal="start">
      <CCol sm="12">
        <CInput
          label="Nombre"
          placeholder="Ingresa el nombre de la empresa"
          v-model.lazy="zonas_form.nombre"
        />
      </CCol>
    </CRow>
    <CRow>
      <CCol sm="12">
        <CInput
                  label="Balance"
                  append=".000"
                  description="Ingresa del balance inicial"
                  prepend="$"
                  v-model.number="zonas_form.balance"
         />
      </CCol>
      <CCol sm="12">
             <CInput
                label="Date"
                type="date"
                v-model.lazy="zonas_form.fecha"
              />
      </CCol>
      <CCol sm="12">
      <CSelect
                  label="Empresas"
                  :options="empresas"
                  :value.sync="zonas_form.empresa"
                />
      </CCol>
    </CRow>
    
    </CCardBody>
    <CCardFooter>
      <CRow>
       <CCol col="4" sm="4" md="2" xl class="mb-3 mb-xl-0">
            <CButton color="success"  @click="guardar" >GUARDAR</CButton>
          </CCol>
    </CRow>
    </CCardFooter>
     </CCard>
     {{$data.zonas_form}}
    </div>
</template>

<script>
import ZonaService from './Services/ZonaService.js';
export default {
    props:{
            nombre:String,
            balance:Number,
            fecha:String,
            empresa:String
    },
    data() {
        return {
        zonas_form:{
          nombre:'',
          balance:'',
          fecha:'',
          empresa:''
        },
        empresas:[]
        
        }
    },
    beforeMount() {
                  axios.get('https://us-central1-manifest-life-279516.cloudfunctions.net/Empresas?doc=todos')
    .then( (response) =>  {
        let tamporal = response.data;
        

        for (const key in tamporal) {
            if (tamporal.hasOwnProperty(key)) {
                 let element={ value: tamporal[key].id, label: tamporal[key].Nombre };
                 this.empresas.push(element);
                
            }
        }
        //this.empresas=Object.values(response.data[0].Nombre);

        console.table(Object.values(response.data[0].Nombre));
        
    }).catch(error => {
        console.log(error);
    });
    },
    methods:{
        guardar(){
        // const config = {
        //     headers: {
        //       'Content-Type': 'application/x-www-form-urlencoded'
        //     }
        //   }
        axios.post('https://us-central1-manifest-life-279516.cloudfunctions.net/EmpresasGuardarZonas?doc='+this.zonas_form.empresa+'&sub=zonas',this.zonas_form).then( (response) =>  {
        
        console.log(response);
       
    }).catch(error => {
        console.log(error);
    }); 
    }
    }
}
</script>

<style lang="less">
.p-caritem {
    display: flex;
    align-items: center;

    div {
        display: flex;
        flex-direction: column;
    }

    .p-caritem-vin {
        font-weight: 600;
        display: block;
        margin-bottom: .25rem;
    }

    img {
        width: 48px;
        height: 48px;
        margin-right: .5rem;
    }
}
    
</style>