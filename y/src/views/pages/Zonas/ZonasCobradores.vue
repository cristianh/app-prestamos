<template>
    <div>
        {{selectionItem}}
        <PickList v-model="cobradores" :dataKey="cobradores.id"  @move-to-target="getItems"  @move-to-source="setItems" :selection.sync="selection">
            <template #sourceHeader>
        Cobradores
    </template>
    <template #targetHeader>
        Seleccionados
    </template>
    <template #item="slotProps">
        <div class="p-caritem">
            <!-- <img :src="'demo/images/car/' + slotProps.item.brand + '.png'"> -->
            <div>
                <!-- <span class="p-caritem-vin">Id:{{slotProps.item.id}}</span> -->
                <!-- {{slotProps.item}} -->
               
                 <span><b>Identificacion:</b> {{slotProps.item.Identificacion}}</span>
                  <span><b>Nombre:</b> {{slotProps.item.Nombre}} {{slotProps.item.Apellido}}</span>
                 <span><b>Telefono:</b> {{slotProps.item.Telefono}}</span>
                 <span><b>Direccion:</b> {{slotProps.item.Direccion1}}</span>
                <!-- <span>Nombre:{{slotProps.item}}</span>
                <span>Apellido:{{slotProps.item}}</span>
                 <span>Identificacion:{{slotProps.item.Identificacion}}</span> -->
            </div>
        </div>
    </template>
</PickList>
{{selection}}

        <!-- <CCard>
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
      <CCol sm="12"> -->
      <!-- <CSelect
                  label="Empresas"
                  :options="empresas"
                  :value.sync="zonas_form.empresa"
                /> -->
      <!-- </CCol>
    </CRow>
    
    </CCardBody>
    <CCardFooter>
      <CRow>
       <CCol col="4" sm="4" md="2" xl class="mb-3 mb-xl-0">
            <CButton color="success"  @click="guardar" >GUARDAR</CButton>
          </CCol>
    </CRow>
    </CCardFooter>
     </CCard> -->
    </div>
</template>

<script>
import ZonaService from './Services/ZonaService.js';
import CobradoresService from '../Cobradores/Services/CobradoresService.js';

export default {
    data() {
        return {
        zonas_form:{
          nombre:'',
          balance:'',
          fecha:'',
          empresa:''
        },
        zonas_empresas:[],
        cobradores:[],
        zonaService:null,
        cobradoresService:null,
        selection:[],
        selectionItem:[]
        
        }
    },
     created() {
        this.zonaService = new ZonaService();
        this.cobradoresService = new CobradoresService();
    },
    beforeMount() {
   
        let cobradores = this.cobradoresService.getAllCobradores();
         cobradores.then((response)=>{
            //
            this.cobradores= [response.data.slice(0,5),[]]
            console.log(this.cobradores);
       
             
         });




       let datos=this.zonaService.getAllZonasEmpresa('C5WpImx3HINVzZ2fPJyd','zonas');
       let tamporal=[];
        datos.then((response)=>{
            tamporal=response;
            //console.log(response.datadocument);
          
            
        });
    },
    methods:{
        guardar(){
      
        },
        getItems(event){
            this.selectionItem.unshift(event.items);
            console.log(event.items);
        },
        setItems(event){
            this.selectionItem.pop(event.items);
            console.log(event.items);
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