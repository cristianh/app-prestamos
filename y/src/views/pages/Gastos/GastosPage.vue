<template>
            <div>
                <empresazonaselected  :allInfoZona=false :isVisibleZona=true @onSelectedEmpresa="onEmpresaSeleccionadaParent" @onSelectedZona="onZonaSeleccionadaParent"></empresazonaselected>
                   <DataTable :value="items" :resizableColumns="true" columnResizeMode="fit" :loading="loading" class="p-datatable-responsive-demo" :paginator="items.length==0?estadopaginado=false:estadopaginado=true" :rows="5">
          <template #loading>
              Cargando gastos
          </template>
          <!-- descripcion: "Gasolina"
fecha_creacion: "2020-11-14"
id: "pshlbc4IBCS68LpiZVtO"
img_src: "https://via.placeholder.com/150/C0BEBE/808080C/O%20https://placeholder.com/"
valor_gasto: "20.000" -->

          <!-- <Column  field="img_src" header="Imagen" headerStyle="width: 11%"></Column> -->
          <Column field="descripcion" header="Descripcion"></Column>
          <Column field="fecha_creacion" header="Fecha"></Column>
          <Column field="valor_gasto" header="Valor" headerStyle="width: 15%"></Column>
           <!-- <Column header="Imagen" field="img_src">
        <template #body="items">
            {{items[0]}}
            <img :src="items.img_src" :alt="items.img_src" class="product-image" />
        </template>
 </Column>  -->
          <!-- <Column header="Acciones" > -->
        <template #body="items">
            <!-- <CButton size="sm" class="m-2"  :block=true @click="editInfoCobrador(items)" color="warning">EDITAR</CButton>
            <CButton size="sm" class="m-2"  :block=true  @click="verZona(items)" color="info">VER ZONA</CButton> -->
        </template>
        </Column>

      </DataTable>

       <CCard>
         <CCardHeader>
        <strong>Total gastado:</strong>
        
        {{Number(total_gastos).toLocaleString('es-CO',{style: 'currency',currency: 'COP',minimumSignificantDigits:1})}}
      </CCardHeader>
         <CCardBody>
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

import CobradorService from '../Cobradores/Services/CobradoresService.js';
import Dialog from 'primevue/dialog';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
     components: {
    Dialog,
            Loading,
            DataTable,
            Column,
            ColumnGroup
    },
    data() {
        return {
            isLoading: false,
            fullPage: true,
            empresaselected:'',
            zonaselectecd:'',
            cobradorservice:null,
            items:[],
            loading:false,
            total_gastos:0
        }
    },
    created() {
        this.cobradorservice=new CobradorService()
    },
    methods: {
        onCancel() {
              
        },
        onEmpresaSeleccionadaParent(empresa){
            // alert(empresa)
            this.empresaselected=empresa
        },
        onZonaSeleccionadaParent(zona){
            this.isLoading=true
            console.log(zona)
            this.zonaselectecd=zona
            this.usuarioOnLogin=localStorage.getItem('id');
            this.cobradorservice.buscarCobradorPorZona(this.usuarioOnLogin,this.empresaselected,this.zonaselectecd).then((response)=>{
                console.log(response.data);
                this.cobradorservice.getAllGastoCobrador(this.usuarioOnLogin,this.empresaselected,response.data.id).then((resp)=>{
            console.log("repo",resp);
            this.isLoading=false
            if(resp.data=="Not Found" || resp.data==0){
              this.items=[]
              this.total_gastos=0
            }else{
              this.items=resp.data
              console.log(this.items);
               let total_gastos=this.items.forEach((element) => {
                console.log(this.total_gastos); 
                console.log(element.valor_gasto.replace('.','')); 
               this.total_gastos=Number(this.total_gastos)+Number(element.valor_gasto.replace('.',''))
            });
            }
            
            
        }).catch((error)=>{
                console.log(error);
        });
            }).catch((error)=>{
                console.log(error);
            });
            
            
        }
    },
}
</script>