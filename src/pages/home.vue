<template>
  <f7-page name="home">
    <!-- Top Navbar -->
    <f7-navbar  :sliding="false">
      <f7-nav-left>
        <f7-link icon-ios="f7:menu" icon-aurora="f7:menu" icon-md="material:menu" panel-open="left"></f7-link>
      </f7-nav-left>
      <f7-nav-title sliding>Sucomercio</f7-nav-title>
      <!-- <f7-nav-title-large>Sucomercio</f7-nav-title-large> -->
    </f7-navbar>
<f7-card
  outline
  :title="profile_name"
  content="Card with header and footer. Card headers are used to display card titles and footers for additional information or just for custom actions."
  footer="Ultima conexion: 06/18/2020"
></f7-card>
<f7-block>
   <div v-if="isLoadBalnces" > 
  <f7-list  inset>
   <f7-list-item title="Saldo Empresa" :after="balance_empresa"><f7-icon ios="f7:local_atm" aurora="f7:local_atm" md="material:local_atm"></f7-icon>
    
  </f7-list-item>
   <f7-list-item title="Saldo Zona" :after="balance_zona"><f7-icon ios="f7:local_atm" aurora="f7:local_atm" md="material:local_atm"></f7-icon>
    
  </f7-list-item>
  </f7-list>
   </div>
   <div v-else>
     Cargando saldo.....
   </div>
</f7-block>

    <!-- <f7-block-title>Navigation</f7-block-title>
    <f7-list>
      <f7-list-item link="/about/" title="About"></f7-list-item>
      <f7-list-item link="/form/" title="Form"></f7-list-item>
    </f7-list> -->
<!-- 
    <f7-block-title>Modals</f7-block-title>
    <f7-block strong>
      <f7-row>
        <f7-col width="50">
          <f7-button fill raised popup-open="#my-popup">Popup</f7-button>
        </f7-col>
        <f7-col width="50">
          <f7-button fill raised login-screen-open="#my-login-screen">Login Screen</f7-button>
        </f7-col>
      </f7-row>
    </f7-block> -->

    <!-- <f7-block-title>Panels</f7-block-title>
    <f7-block strong>
      <f7-row>
        <f7-col width="50">
          <f7-button fill raised panel-open="left">Left Panel</f7-button>
        </f7-col>
        <f7-col width="50">
          <f7-button fill raised panel-open="right">Right Panel</f7-button>
        </f7-col>
      </f7-row>
    </f7-block> -->

    <!-- <f7-list>
      <f7-list-item
        title="Dynamic (Component) Route"
        link="/dynamic-route/blog/45/post/125/?foo=bar#about"
      ></f7-list-item>
      <f7-list-item
        title="Default Route (404)"
        link="/load-something-that-doesnt-exist/"
      ></f7-list-item>
      <f7-list-item
        title="Request Data & Load"
        link="/request-and-load/user/123456/"
      ></f7-list-item>
    </f7-list> -->
  </f7-page>
</template>

<script>

export default {
  data() {
    return {
      firstor:'',
      profile_name:'',
      uid:'',
      balance_zona:'',
      balance_empresa:'',
      isLoadBalnces:false
     
    }
  },
  beforeMount(){
    const self = this;
    self.$f7.dialog.preloader("Cargando informacion...");
    this.profile_name = 'Bienvenido '+localStorage.getItem("name")+'.';
    this.uid = localStorage.getItem("uid");

    let zona;
    let empresa;

     axios.get(`https://us-central1-manifest-life-279516.cloudfunctions.net/Cobradores?doc=${this.uid}`)
    .then( (response) =>  {
        this.rutas=response.data;
        zona=response.data.Zona;
        empresa=response.data.Empresa;

        // https://us-central1-manifest-life-279516.cloudfunctions.net/getEmpresaZonaDoc?doc=jnJ3V6VAXwqeLG8XhkAP&subdoc=mgi4OVogcnejo8Hkig8E
        axios.get(`https://us-central1-manifest-life-279516.cloudfunctions.net/getEmpresaZonaDoc?doc=${empresa}&subdoc=${zona}`)
              .then( (datazona) =>  {
                this.balance_zona=datazona.data.balance;
                localStorage.setItem("saldo_zona", this.balance_zona);

                   axios.get(`https://us-central1-manifest-life-279516.cloudfunctions.net/Empresas?doc=${empresa}`)
                  .then( (response) =>  {
                      
                      this.balance_empresa=response.data.Balance;
                      // this.isLoadRutas= true;
                      this.isLoadBalnces=true;
                             axios.get(`https://us-central1-manifest-life-279516.cloudfunctions.net/Cobradores?doc=${this.uid}&sub=Clientes`)
    .then( response =>  {
      
        let cl = response.data;
        for (const key in cl) {
          if (cl.hasOwnProperty(key)) {
            const element = cl[key];
            //this.clientes.push(element);
            this.$store.state.clientes.unshift(element);
           
            ///this.clientes_nombres.push(element.data.usuario.nombre);
            
          }
        }
        //this.$store.state.clientes.push(response.data);
       
      
    }).catch(error => {
        console.log(error);
    }); 

    axios.get(`https://us-central1-manifest-life-279516.cloudfunctions.net/Cobradores?doc=${this.uid}&sub=Rutas`)
    .then( (response) =>  {

      let zona = response.data;
        for (const key in zona) {
          if (zona.hasOwnProperty(key)) {
            const element = zona[key];
            //this.clientes.push(element);
            // this.$store.state.clientes.unshift(element);
            this.$store.state.zonas.unshift(element);
           
            ///this.clientes_nombres.push(element.data.usuario.nombre)
          }
        }
        
         self.$f7.dialog.close();
    }).catch(error => {
        console.log(error);
    }); 
                  }).catch(error => {
                      console.log(error);
                  }); 
                  // this.isLoadRutas= true;
              }).catch(error => {
                  console.log(error);
              }); 

       

   

                
      

    }).catch(error => {
        console.log(error);
    }); 

   
   

   

  },
  created() {
    // Acceder a datos almacenados
    this.profile_name = 'Bienvenido '+localStorage.getItem("name")+'.';
    this.uid = localStorage.getItem("uid");
   
  },
  mounted() {
//     db.collection("users").add({
//     first: "Ada",
//     last: "Lovelace",
//     born: 1815
// })
// .then(function(docRef) {
//     console.log("Document written with ID: ", docRef.id);
// })
// .catch(function(error) {
//     console.error("Error adding document: ", error);
// });
  },
}
</script>