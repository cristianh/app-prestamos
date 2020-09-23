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


     <f7-block v-if="consulta!=0">
      
       <DataTable :value="jornada_dia.data" class="p-datatable-responsive-demo p-datatable-striped" :paginator="false" :rows="10">
          <template #header>
         Informe final dia {{fecha_busqueda}}
         </template>
         <!-- <Column field="hora_inicial" header="Hora Inicial">
        <template #body="slotProps">
            <span class="p-column-title">Hora Inicial</span>
            {{slotProps}}
        </template>
    </Column> -->
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

<DataTable :value="cobros.data" class="p-datatable-responsive-demo" :paginator="false" :rows="10">
          <template #header>
        Cobros dia {{fecha_busqueda}}
         </template>
         <Column field="cliente_nombre" header="Cliente nombre">
        <template #body="slotProps">
            <span class="p-column-title"><b>Cliente nombre:</b></span>
           {{slotProps.data.cliente_nombre}}
        </template>
        </Column>
           <Column field="cliente_apellido" header="Cliente apellido">
        <template #body="slotProps">
            <span class="p-column-title"><b>Cliente apellido:</b></span>
           {{slotProps.data.cliente_apellido}}
        </template>
    </Column>
         <Column field="cliente_cedula" header="Cliente cedula">
        <template #body="slotProps">
            <span class="p-column-title"><b>Cliente cedula:</b></span>
           {{slotProps.data.cliente_cedula}}
        </template>
    </Column>

     <Column field="valor_pago" header="Valor pago">
        <template #body="slotProps">
            <span class="p-column-title"><b>Valor pago:</b></span>
           {{slotProps.data.valor_pago|currency}}
        </template>
    </Column>
    <Column field="fecha" header="Fecha">
        <template #body="slotProps">
            <span class="p-column-title"><b>Fecha:</b></span>
           {{slotProps.data.fecha}}
        </template>
    </Column>
    <Column field="hora" header="Hora">
        <template #body="slotProps">
            <span class="p-column-title"><b>Hora:</b></span>
           {{slotProps.data.hora}}
        </template>
    </Column>
    
</DataTable>

<DataTable :value="nopagos.data" class="p-datatable-responsive-demo" :paginator="false" :rows="10">
          <template #header>
        Cobros no  realizados dia {{fecha_busqueda}}
         </template>
            <Column field="cliente_nombre" header="Cliente nombre">
        <template #body="slotProps">
            <span class="p-column-title"><b>Cliente nombre:</b></span>
           {{slotProps.data.cliente_nombre}}
        </template>
        </Column>
           <Column field="cliente_apellido" header="Cliente apellido">
        <template #body="slotProps">
            <span class="p-column-title"><b>Cliente apellido:</b></span>
           {{slotProps.data.cliente_apellido}}
        </template>
    </Column>
         <Column field="cliente_cedula" header="Cliente cedula">
        <template #body="slotProps">
            <span class="p-column-title"><b>Cliente cedula:</b></span>
           {{slotProps.data.cliente_cedula}}
        </template>
    </Column>

     <Column field="valor_pago" header="Valor pago">
        <template #body="slotProps">
            <span class="p-column-title"><b>Valor pago:</b></span>
           {{slotProps.data.valor_pago|currency}}
        </template>
    </Column>
    <Column field="fecha" header="Fecha">
        <template #body="slotProps">
            <span class="p-column-title"><b>Fecha:</b></span>
           {{slotProps.data.fecha}}
        </template>
    </Column>
    <Column field="hora" header="Hora">
        <template #body="slotProps">
            <span class="p-column-title"><b>Hora:</b></span>
           {{slotProps.data.hora}}
        </template>
    </Column>
         <Column field="razonnopago" header="Razon no pago">
        <template #body="slotProps">
            <span class="p-column-title"><b>Razon no pago:</b></span>
           {{slotProps.data.razonnopago}}
        </template>
        </Column>
           <!-- <Column field="cliente_apellido" header="Cliente apellido">
        <template #body="slotProps">
            <span class="p-column-title"><b>Cliente apellido:</b></span>
           {{slotProps.data.cliente_apellido}}
        </template>
    </Column>
         <Column field="cliente_cedula" header="Cliente cedula">
        <template #body="slotProps">
            <span class="p-column-title"><b>Cliente cedula:</b></span>
           {{slotProps.data.cliente_cedula}}
        </template>
    </Column>

     <Column field="valor_pago" header="Valor pago">
        <template #body="slotProps">
            <span class="p-column-title"><b>Valor pago:</b></span>
           {{slotProps.data.valor_pago|currency}}
        </template>
    </Column>
    <Column field="fecha" header="Fecha">
        <template #body="slotProps">
            <span class="p-column-title"><b>Fecha:</b></span>
           {{slotProps.data.fecha}}
        </template>
    </Column>
    <Column field="hora" header="Hora">
        <template #body="slotProps">
            <span class="p-column-title"><b>Hora:</b></span>
           {{slotProps.data.hora}}
        </template>
    </Column> -->
    
</DataTable>

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
            prestamos: [],
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
                this.jornada_dia.data.push(res.data.jornada_dia[0].data)
                // this.cobros.data.push(res.data.cobros[0])
                 for (const key in res.data.cobros) {
                  if (res.data.cobros.hasOwnProperty(key)) {
                    const element = res.data.cobros[key];
                    console.log(element)
                    // this.cobros.clientes.push(element.cliente)
                    // delete element.cliente
                    this.cobros.data.push(element)
                  }
                }

                  for (const key in res.data.observaciones) {
                  if (res.data.observaciones.hasOwnProperty(key)) {
                    const element = res.data.observaciones[key];
                    console.log(element)
                    // this.cobros.clientes.push(element.cliente)
                    // delete element.cliente
                    this.nopagos.data.push(element)
                  }
                }
                
                
                // this.jornada_dia.data=res.data.jornada_dia[0].data
                // this.jornada_dia= }
                // this.jornada_dia=[res.data.jornada_dia.slice(0,5),[]]
                
                
            })
        }
    },
}
</script>