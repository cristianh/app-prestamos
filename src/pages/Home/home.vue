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
   
    <f7-card >
  <f7-card-header
    valign="center">
    {{profile_name}}
    </f7-card-header>
  <f7-card-content>
    <div v-if="mensaje_bienvenida">
    <p>{{mensaje_bienvenida}}</p>
    </div>
    <div v-else>
      Cargando....
    </div>
  </f7-card-content>
  <f7-card-footer>
    <strong>Ultima conexion:</strong> {{ lastActivity | moment("DD-MM-YYYY HH:mm") }}
  </f7-card-footer>
</f7-card>

<f7-block>
   <div v-if="isLoadBalnces" > 
  <f7-list  inset>
   <!-- <f7-list-item title="Saldo Empresa" :after="balance_empresa"><f7-icon ios="f7:local_atm" aurora="f7:local_atm" md="material:local_atm"></f7-icon> -->
    
  </f7-list-item>
   <f7-list-item title="Saldo Zona" :after="getBalanceZona"><f7-icon ios="f7:local_atm" aurora="f7:local_atm" md="material:local_atm"></f7-icon> </f7-list-item>
   <!-- <f7-list-item title="Id Zona" :after="id_zona"><f7-icon ios="f7:room" aurora="f7:room" md="material:room"></f7-icon></f7-list-item>
   <f7-list-item title="Id Cobrador" :after="uid"><f7-icon ios="f7:person" aurora="f7:person" md="material:person"></f7-icon></f7-list-item>
   <f7-list-item title="Id Empresa" :after="id_empresa"><f7-icon ios="f7:person" aurora="f7:person" md="material:person"></f7-icon></f7-list-item> -->
  </f7-list>
   </div>
   <div v-else>
     Cargando saldo.....
   </div>
</f7-block>
  </f7-page>
</template>

<script>
import ClientesCobradoresService from '../Services/ClientesService.js';
import CobradoresService from '../Services/CobradoresServices.js';
import EmpresaService from '../Services/EmpresaServices';
import firebase from 'firebase'
export default {
  data() {
    return {
      mensaje_bienvenida:'',
      firstor:'',
      lastActivity:'',
      profile_name:'',
      balance_zona:0,
      balance_empresa:'',
      isLoadBalnces:false,
      cobradoresClientesService:null,
      cobradoresService:null,
      empresaService:null,
      idad:''
     
    }
  },
   watch: {
    Uploadabono(newBalance,oldBalance){
      this.balance_zona=localStorage.getItem("saldo_zona");
    }
  },
  computed: {
    getBalanceZona(){
      return this.$store.getters.getBalance;
    }
  },
  beforeMount(){
    this.idad=localStorage.getItem("iad");
    const self = this;
    
            ;
    self.$f7.dialog.preloader("Cargando informacion...");
    this.profile_name = 'Bienvenido '+localStorage.getItem("name")+'.';
    this.lastActivity=localStorage.getItem("lastactivity");
  
    let zona;
    let empresa;

    this.empresaService.getAllTazaeInteres(this.idad).then( (response) =>  {
         let tazaseinteres = response.data;
        for (const key in tazaseinteres) {
          if (tazaseinteres.hasOwnProperty(key)) {
            const element = tazaseinteres[key];
            //this.clientes.push(element);
            this.$store.state.tasaseinteres.unshift(element);
          
            ///this.clientes_nombres.push(element.data.usuario.nombre);
            
          }
        }
      
    }).catch(error => {
      self.$f7.dialog.close();
        console.log(error);
    }); 

    

    this.CobradoresService.getAllInfoCobradores(this.idad,this.uid).then( (response) =>  {
        this.rutas=response.data;
        zona=response.data.Zona;
        empresa=response.data.Empresa;
        localStorage.setItem("empresa",empresa);
        localStorage.setItem("zona",zona);
        this.empresaService.getAllInfoEmpresaZona(this.idad,empresa,zona).then( (datazona) =>  {
                this.$store.commit('setBalanceZona',datazona.data.balance);
                localStorage.setItem("saldo_zona",datazona.data.balance);
                this.balance_zona= this.$store.getters.getBalance;
                  
                  this.empresaService.getAllInfoEmpresa(this.idad,empresa).then( (response) =>  {
                      
                      // this.balance_empresa=response.data.Balance;
                      // this.isLoadRutas= true;
                      this.isLoadBalnces=true;
  

    this.ClientesCobradoresService.getAllClientesCobradores(this.idad).then( response =>  {
      console.log(response.data);
        let cl = response.data;
        for (const key in cl) {
          if (cl.hasOwnProperty(key)) {
            const element = cl[key];
            //this.clientes.push(element);
            this.$store.state.clientes.unshift(element);
          
            if(element.data.prestamos.length>0 && element.data.prestamos[0].estado_prestamo!=true){
              this.$store.state.clientes_prestamos.unshift(element);
            }  
          }
        }
        
       
      
    }).catch(error => {
      self.$f7.dialog.close();
        console.log(error);
    }); 

    // axios.get(`https://us-central1-manifest-life-279516.cloudfunctions.net/Cobradores?doc=${}&sub=Rutas`)
    this.CobradoresService.getZonaCobrador(this.idad,this.uid).then( (response) =>  {
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
        self.$f7.dialog.close();
    }); 
    }).catch(error => {
        console.log(error);
        self.$f7.dialog.close();
    }); 
                  // this.isLoadRutas= true;
    }).catch(error => {
        console.log(error);
        self.$f7.dialog.close();
    }); 

    }).catch(error => {
        console.log(error);
    }); 

  let empresa_cobrador=localStorage.getItem("empresa");
   this.empresaService.getEmpresaPorId(this.idad,empresa_cobrador).then( (response) =>  {
      console.log(response);
      this.mensaje_bienvenida = response.data.Mensaje;
    }).catch(error => {
      self.$f7.dialog.close();
        console.log(error);
    }); 
   

   

  },
  created() {
    // Acceder a datos almacenados
    this.profile_name = 'Bienvenido '+localStorage.getItem("name")+'.';
    this.uid = localStorage.getItem("uid");
    this.ClientesCobradoresService=new ClientesCobradoresService();
    this.CobradoresService= new CobradoresService();
    this.empresaService= new EmpresaService();
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