<template>
   <f7-page name="form">
    <f7-navbar :title="ruta_titulo" back-link="Back">
    </f7-navbar>
    <!-- <select v-model="usuarios_seleccionados"  name="rutas" multiple>
        <option   >{{cliente.data.usuario.nombre}}</option>
      </select> -->
      <f7-block>
      <f7-row>
       <f7-col>
       <f7-button fill @click="onGuardarClientesRutas" large small color="green" text="GUARDAR"></f7-button>
    </f7-col>
     </f7-row>
      </f7-block>
      <f7-list>
        <f7-list-item  @change="onGetItemselection" v-for="(cliente,index,key) in clientes" :id=cliente.id :key=key  :value="cliente.id" :title="cliente.data.usuario.nombre" checkbox name="demo-checkbox"><f7-link :href="`/ruta_clientes_datalles/${cliente.id}/`"><f7-icon material="remove_red_eye"></f7-icon></f7-link></f7-list-item>
    </f7-list>
   </f7-page>
</template>

<script>
import qs from 'qs';
export default {
    data() {
        return {
            datastorage:{},
            id_ruta:this.$f7route.params.id,
            ruta_titulo:this.$f7route.params.titulo,
            usuarios_seleccionados:[]
        }
    },
    methods: {
        onGetItemselection(usuarios_seleccionados){
        const self = this;
        const value = event.target.value;
        if (event.target.checked) {
          this.usuarios_seleccionados.push(value);
        } else {
          this.usuarios_seleccionados.splice(this.usuarios_seleccionados.indexOf(value), 1);
        }
        },
        onGuardarClientesRutas(){
              let ui_cobrador=this.datastorage.uid
                   const self = this;
        self.$f7.dialog.preloader('Guardando...');
             axios.post(`https://us-central1-manifest-life-279516.cloudfunctions.net/CobradoresGuardarClientesRutas?doc=${ui_cobrador}&sub=${this.id_ruta}`,qs.stringify(this.usuarios_seleccionados), {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
        })
    .then( (response) =>  {
       self.$f7.dialog.close();
       
       this.$f7router.back()
        }).catch((error)=>{
          this.$f7.dialog.close()
                 if(this.$store.getters.getModoDebugger){
                  this.$store.commit('setErrorServices',error)
                  this.$f7.dialog.alert('Ha ocurrido un error, por favor verifique el menu debug','Atencion!')
                   console.log(error);
          }
       });
        }
     
    },
    destroyed() {
        this.usuarios_seleccionados=[];
    },
     beforeMount(){
       let localstoragedata=localStorage.getItem('datainfologin')
      if(localstoragedata==null){
        this.$store.watch(() => this.$store.getters.getDatasStorage, datainfo => { 
        console.log("datastores",this.$store.getters.getDatasStorage)
        // console.log('watched: ', EstadosCobrosGuardados) 
       this.datastorage=datainfo
      //console.log("datastores",this.data_store)
      //this.idad=this.datastorage.iad
       
      })
      }else{
      
      this.datastorage=JSON.parse(localstoragedata)
      console.log("datastores",this.datastorage)
      //this.idad=this.datastorage.iad
      }
      this.clientes=this.$store.getters.getClientes;
    }
}
</script>