<template>
    <f7-page name="home">  
        <!-- Top Navbar -->
        <f7-navbar :sliding="false">
            <f7-nav-left>
                <f7-link icon-ios="f7:menu" icon-aurora="f7:menu" icon-md="material:menu" panel-open="left"></f7-link>
                <!-- <f7-link external href="https://api.whatsapp.com/send?phone=0573127083365&text=hola">wp</f7-link> -->
            </f7-nav-left>
        </f7-navbar>
    
    <f7-block>
            <f7-block-title>Debug</f7-block-title>
<f7-list simple-list>
  <f7-list-item title="Nombre:"> {{datastorage.name}}</f7-list-item>
  <f7-list-item title="UI admin:"> {{datastorage.uid}}</f7-list-item>
  <f7-list-item title="ID admin:"> {{datastorage.iad}}</f7-list-item>
  <f7-list-item title="Empresa ID:"> {{datastorage.empresa}}</f7-list-item>
  <f7-list-item title="Ultima actividad:"> {{datastorage.lastactivity | moment("DD-MM-YYYY HH:mm")}}</f7-list-item>
  <!-- <f7-list-item title="Username:"> {{datalocalstorage.username}}</f7-list-item>
  <f7-list-item title="Password:"> {{datalocalstorage.password}}</f7-list-item> -->
</f7-list>
    </f7-block>
     <f7-block-title>Errores</f7-block-title> 
   
        <p>{{loadMensajeError}}</p>
        <!-- <p>{{datastorage}}</p> -->
    
      </f7-page>
</template>

<script>
export default {
    data() {
        return {
            datastorage:{},
            datalocalstorage:{
            ui:'',
            email:'',
            name:'',
            iad:'',
            empresa:'',
            lastactivity:'',
            username:'',
            password:''
            },
            error_services:''
        }
    },
    beforeCreate() {
    //           console.log('detecto',localStorage.getItem('datainfologin'))
    //  this.$store.watch(() => this.$store.getters.getDatasStorage, datainfo => { 
    //     // console.log("datastoreswatch",this.$store.getters.getDatasStorage)
    //     // console.log('watched: ', EstadosCobrosGuardados) 
    //    this.datastorage=datainfo
    //    console.log("datastorageinfo",this.datastorage)
    // //    this.idad=this.datastorage.iad
       
    //   })
    },
    computed: {
        loadMensajeError(){
            return this.$store.getters.getErrorMensajeServices
        },
        loadDataStorage(){
            return this.$store.getters.getDatasStorage
        }
    },
    mounted() {
        console.log(this.$ls.get('foo'));

        let localstoragedata=localStorage.getItem('datainfologin')
      if(localstoragedata==null){
          this.$store.watch(() => this.$store.getters.getDatasStorage, datainfo => { 
        console.log("datastores",this.$store.getters.getDatasStorage)
        // console.log('watched: ', EstadosCobrosGuardados) 
       this.datastorage=datainfo
      //  console.log("datastores",this.data_store)
    //    this.idad=this.datastorage.iad
       
      })
      }else{
      
      this.datastorage=JSON.parse(localstoragedata)
      console.log("datastores",this.datastorage)
    //    this.idad=this.datastorage.iad
      }
    },
    beforeMount() {  
      
        
    },
    destroyed() {
        //   window.removeEventListener('storage')
    },
}
</script>