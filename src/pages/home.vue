<template>
  <f7-page name="home">
    <!-- Top Navbar -->
    <f7-navbar large :sliding="false">
      <f7-nav-left>
        <f7-link icon-ios="f7:menu" icon-aurora="f7:menu" icon-md="material:menu" panel-open="left"></f7-link>
      </f7-nav-left>
      <f7-nav-title sliding>Sucomercio</f7-nav-title>
      <f7-nav-title-large>Sucomercio</f7-nav-title-large>
    </f7-navbar>
  
<f7-card
  outline
  :title="profile_name"
  content="Card with header and footer. Card headers are used to display card titles and footers for additional information or just for custom actions."
  footer="Ultima conexion: 06/18/2020"
></f7-card>

    
    <f7-list  inset>
   <f7-list-item title="Saldo General" after="2.000.0000"><f7-icon ios="f7:local_atm" aurora="f7:local_atm" md="material:local_atm"></f7-icon>
    
  </f7-list-item>
   <f7-list-item title="Saldo Base" after="1.000.0000"><f7-icon ios="f7:local_atm" aurora="f7:local_atm" md="material:local_atm"></f7-icon>
    
  </f7-list-item>
    </f7-list>

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
      profile_name:''
     
    }
  },
  created() {
    // Acceder a datos almacenados
    this.profile_name = 'Bienvenido '+localStorage.getItem("name")+'.';
    console.log( "username = " + localStorage.getItem("username")+ "nombredeusuario = " + localStorage.getItem("password"));
  }
}
</script>