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
     <f7-block v-if="consulta.length>=1">
            <f7-card>
                   
          <f7-card-content>
           <!-- Final:{{getBalanceFinal}}
           Realizados hoy p:{{getPrestamosRealiozadoshoy}}
           Total cobros:{{getTotalCobros}} -->
        <!-- {{consulta}} -->
        <div v-for="(result,index,key) in consulta" :key="key">
          Cobros pagos: {{result.catidad_cobrosefectivos}}<br>
          Cobros no pagos: {{result.catidad_cobrosenofectivos}}<br>
          <!-- Cobros pendientes: {{getCatidadCobrosPendientes}}<br> -->
          <!-- Balance inicial de la zona: {{result[index].Balance_inicial_de_la_zona|currency}}<br> -->
          Total Prestado: {{result.total_prestado|currency}}<br>
          <!-- Balance final de la zona: {{Number(getTotalCobros)+Number(getBalanceInicial)|currency}}<br> -->
          Total dinero recogido: {{result.total_cobros_realizados|currency}}
        </div>
          </f7-card-content>
            </f7-card>
</f7-block>
</f7-page>
</template>

<script>
import CobradoresService from '../Services/CobradoresServices.js';

export default {
    data() {
        return {
            fecha_busqueda:new Date().toISOString().slice(0,10),
            hoy:new Date().toISOString().slice(0,10),
            cobradorservice:null,
            consulta:[],
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
            })
        }
    },
}
</script>