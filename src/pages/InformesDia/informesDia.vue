<template>
<f7-page name="Cobros">
 
    <f7-navbar >
        <f7-nav-left>
        <f7-link icon-ios="f7:menu" icon-aurora="f7:menu" icon-md="material:menu" panel-open="left"></f7-link>
      </f7-nav-left>
      <f7-nav-title sliding>Informe del dia</f7-nav-title>
    </f7-navbar>
    
    <f7-block>
       
    <!-- {{fecha_busqueda}} -->
    <f7-list>
   <f7-list-input
    id="calendar-date-informe"
    label="Fecha"
    type="date"
    :defaultValue=hoy
    placeholder="Please choose..."
    @input="fecha_busqueda=$event.target.value"
  >
  </f7-list-input>
    <f7-button  fill color="red" @click="onGenerarInforme"><f7-icon material="search"></f7-icon></f7-button>
   </f7-list>

 
    </f7-block>
 
    <!-- <pre>{{jornada_dia}}</pre>
    <pre>{{cobros}}</pre> -->
    <!-- <pre>{{consulta.length}}</pre> -->


<!-- {{consulta.length}} -->
     <f7-block v-if="consulta.length!=0">
         <f7-list accordion-list>
  <f7-list-item v-if="jornada_dia.data.length>=1" accordion-item :title="`Informe final dia`">
    <f7-accordion-content>
     <f7-block>
          <DataTable :value="jornada_dia.data" class="p-datatable-responsive-demo p-datatable-striped" :paginator="false" :rows="10">
     <Column field="hora_inicial" header="Hora inicio dia cobrador">
        <template #body="slotProps">
            <span class="p-column-title"><b>Hora de inicio cobrador:</b></span>
            {{slotProps.data.hora_inicial}}
        </template>
    </Column>
     <Column field="hora_final" header="Hora final dia cobrador">
        <template #body="slotProps">
            <span class="p-column-title"><b>Hora de final cobrador:</b></span>
            {{slotProps.data.hora_final}}
        </template>
    </Column>
    <Column field="catidad_cobrosefectivos" header="Cobros efectivos">
        <template #body="slotProps">
            <span class="p-column-title"><b>Cobros efectivos:</b></span>
            {{slotProps.data.catidad_cobrosefectivos}}
        </template>
    </Column>
     <Column field="catidad_cobrosenofectivos" header="Cobros no efectivos">
        <template #body="slotProps">
            <span class="p-column-title"><b>Cobros no efectivos:</b></span>
            {{slotProps.data.catidad_cobrosenofectivos}}
        </template>
    </Column>
     <Column field="total_prestado" header="Total prestado">
        <template #body="slotProps">
            <span class="p-column-title"><b>Total prestado:</b></span>
            {{slotProps.data.total_prestado|currency}}
        </template>
    </Column>
     <Column field="total_cobros_realizados" header="Total cobros realizados">
        <template #body="slotProps">
            <span class="p-column-title"><b>Total cobros realizados:</b></span>
            {{slotProps.data.total_cobros_realizados|currency}}
        </template>
    </Column>
     <Column field="balance_final" header="Balance final de la zona">
        <template #body="slotProps">
            <span class="p-column-title"><b>Balance final de la zona:</b></span>
            {{slotProps.data.balance_final|currency}}
        </template>
    </Column>
     <Column field="balance_final_manual" header="Balance final ingresado por el cobrador">
        <template #body="slotProps">
            <span class="p-column-title"><b>Balance final ingresado por el cobrador:</b></span>
            {{slotProps.data.balance_final_manual|currency}}
        </template>
    </Column>
</DataTable>
      </f7-block>
    </f7-accordion-content>
  </f7-list-item>
   <f7-list-item v-else accordion-item :title="`Informe final dia ${fecha_busqueda}`">
    <f7-accordion-content>
      <f7-card>   
          <f7-card-content>
              No se encontraron resultados
          </f7-card-content>
        </f7-card>
    </f7-accordion-content>
  </f7-list-item>
  <f7-list-item v-if="cobros.data.length>=1" accordion-item :title="`Cobros realizados`">
    <f7-accordion-content>
       <f7-block>
          <f7-list  media-list  >
          <f7-list-item v-for="(cliente,index,key) in cobros.data" 
          :key="key" 
          :text=" `Fecha y Hora: ${cliente.fecha} ${cliente.hora}`" 
          :title="`${cliente.cliente_nombre} ${cliente.cliente_apellido}`"
          :subtitle="`Cedula: ${cliente.cliente_cedula}`"
          :after="`Valor:`+ Number(cliente.valor_pago).toLocaleString('es-CO',{style: 'currency',currency: 'COP',minimumSignificantDigits:1})" 
          >
          </f7-list-item>
          </f7-list>
      </f7-block>
    </f7-accordion-content>
  </f7-list-item>
   <f7-list-item v-else accordion-item :title="`Cobros realizados`">
    <f7-accordion-content>
       <f7-card>   
          <f7-card-content>
              No se encontraron resultados
          </f7-card-content>
        </f7-card>
    </f7-accordion-content>
  </f7-list-item>
  <f7-list-item v-if="nopagos.data.length>=1" accordion-item :title="`Cobros no realizados`">
    <f7-accordion-content>
        <f7-block>
          <f7-list  media-list  >
          <f7-list-item v-for="(cliente,index,key) in nopagos.data" 
          :key="key" 
          :text=" `Fecha y Hora: ${cliente.fecha} ${cliente.hora}`" 
          :title="`Cliente: ${cliente.cliente_nombre} ${cliente.cliente_apellido}`"
          :subtitle="`Razon no pago: ${cliente.razonnopago}`"
          >
          
          </f7-list-item>
          </f7-list>
      </f7-block>
    </f7-accordion-content>
  </f7-list-item>
  <f7-list-item v-else accordion-item :title="`Cobros no realizados el dia ${fecha_busqueda}`">
    <f7-accordion-content>
        <f7-card>   
          <f7-card-content>
              No se encontraron resultados
          </f7-card-content>
        </f7-card>
    </f7-accordion-content>
  </f7-list-item>
</f7-list> 
</f7-block>
 <f7-block v-else>
        <f7-card>   
          <f7-card-content>
              No se encontraron resultados
          </f7-card-content>
        </f7-card>
 </f7-block>
</f7-page>
</template>

<script>
import CobradoresService from '../Services/CobradoresServices.js';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

export default {
  components:{
    Column,
    DataTable
  },
    data() {
        return {
            fecha_busqueda:new Date().toISOString().slice(0,10),
            hoy:new Date().toISOString().slice(0,10),
            cobradorservice:null,
            consulta:[],
            cobros:{
              "data": [
                  
              ]
          },
            nopagos:{
              "data": [
                  
              ]
          },
            prestamos: {
              "data": [
                  
              ]
          },
            jornada_dia: {
              "data": [
                  
              ]
          }
            
        }
    },
    created() {
        this.cobradorservice=new CobradoresService()
        this.$f7.calendar.create({
  inputEl: '#calendar-date-informe',
  disabled: {
        from:new Date(2001-12-12),
        to: new Date().toISOString().slice(0,10)
    },
});
    },
    
    methods: {
        onGenerarInforme(){
            this.$f7.dialog.preloader('Buscando Informacion...');
            let ui_cobrador=localStorage.getItem("uid");
            let id_admin=localStorage.getItem("iad");
            let id_jornadacobrador=localStorage.getItem("idjornadacobrador");
            let id_empresa=localStorage.getItem("empresa");
            this.fecha_busqueda=this.$moment(this.fecha_busqueda).format("MM-DD-YYYY")
            console.log(this.fecha_busqueda);
            this.cobradorservice.getInformeDia(id_admin,id_empresa,ui_cobrador,{fecha:this.fecha_busqueda}).then((res)=>{
                console.log(res);
                this.$f7.dialog.close()
                this.consulta=res.data
                console.log(this.consulta);
                if(this.consulta.prestamos.length>=1 || this.consulta.observaciones.length>=1 || this.consulta.cobros.length>=1 ||this.consulta.jornada_dia.length>=1 ){
                    if(res.data.jornada_dia.length>=1){
                this.jornada_dia.data.push(res.data.jornada_dia[0].data) 
                }
                
                 if(res.data.cobros.length>=1){
                this.cobros.data.push(res.data.cobros[0])
                 for (const key in res.data.cobros) {
                  if (res.data.cobros.hasOwnProperty(key)) {
                    const element = res.data.cobros[key];
                    console.log(element)
                    // this.cobros.clientes.push(element.cliente)
                    // delete element.cliente
                    this.cobros.data.push(element)
                  }
                }
                 }
                
                 if(res.data.observaciones.length>=1){
                  for (const key in res.data.observaciones) {
                  if (res.data.observaciones.hasOwnProperty(key)) {
                    const element = res.data.observaciones[key];
                    console.log(element)
                    // this.cobros.clientes.push(element.cliente)
                    // delete element.cliente
                    this.nopagos.data.push(element)
                  }
                }
               }

                 if(res.data.prestamos.length>=1){
                  for (const key in res.data.prestamos) {
                  if (res.data.prestamos.hasOwnProperty(key)) {
                    const element = res.data.prestamos[key];
                    console.log(element)
                    // this.cobros.clientes.push(element.cliente)
                    // delete element.cliente
                    this.prestamos.data.push(element)
                  }
                }
                 }
                }else if(this.consulta.prestamos.length==0 || this.consulta.observaciones.length==0 || this.consulta.cobros.length==0 ||this.consulta.jornada_dia.length==0){
                    this.consulta=[]
                }else{
                     this.consulta=[]
                }
                
                
                
                // this.jornada_dia.data=res.data.jornada_dia[0].data
                // this.jornada_dia= }
                // this.jornada_dia=[res.data.jornada_dia.slice(0,5),[]]
                
                
            })
        }
    },
}
</script>