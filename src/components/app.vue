<template>
  <f7-app :params="f7params" >

  <!-- Left panel with cover effect-->
  <f7-panel left cover >
    <f7-view>
      <f7-page>
        <f7-navbar title="Menu"></f7-navbar>
        <f7-block>
<f7-list>
  <!-- <f7-link no-link-class color="black" tab-link="#view-ruta"  icon-ios="f7:swap_calls" icon-aurora="f7:swap_calls" icon-md="material:swap_calls" >Rutas</f7-link> -->
  <f7-list-button panel-close><f7-link no-link-class color="black" tab-link="#view-ruta"  icon-ios="f7:swap_calls" icon-aurora="f7:swap_calls" icon-md="material:swap_calls" >Rutas</f7-link></f7-list-button>
  <f7-list-button panel-close><f7-link   color="black" icon-ios="f7:alarm_on" icon-aurora="f7:alarm_on" icon-md="material:alarm_on" >Pendientes</f7-link></f7-list-button>
  <f7-list-button panel-close><f7-link   color="black" icon-ios="f7:create" icon-aurora="f7:create" icon-md="material:create" >Modificar Abono</f7-link></f7-list-button>
  <f7-list-button panel-close><f7-link   color="black" icon-ios="f7:delete" icon-aurora="f7:delete" icon-md="material:delete" >Eliminar Abono</f7-link></f7-list-button>
  <f7-list-button panel-close><f7-link   color="black" icon-ios="f7:today" icon-aurora="f7:today" icon-md="material:today" >Resumen del dia</f7-link></f7-list-button>
  <f7-list-button panel-close><f7-link   color="black" icon-ios="f7:cancel" icon-aurora="f7:cancel" icon-md="material:cancel" >Terminar ruta</f7-link></f7-list-button>  
  <f7-list-button @click="exitApp" ><f7-link   color="black" icon-ios="f7:exit_to_app" icon-aurora="f7:exit_to_app" icon-md="material:exit_to_app" >Salir</f7-link></f7-list-button>
</f7-list>
</f7-block>
      </f7-page>
    </f7-view>
  </f7-panel>

  <!-- Views/Tabs container -->
  <f7-views tabs class="safe-areas">
    <!-- Tabbar for switching views-tabs -->
    <f7-toolbar tabbar labels bottom>
      <f7-link tab-link="#view-inicio" tab-link-active icon-ios="f7:home" icon-aurora="f7:home" icon-md="material:home" text="Inicio"></f7-link>
      
      <f7-link tab-link="#view-cliente" icon-ios="f7:square_list_fill" icon-aurora="f7:square_list_fill" icon-md="material:view_list" text="Clientes"></f7-link>
      <f7-link tab-link="#view-nuevocobro" icon-ios="f7:local_atm" icon-aurora="f7:local_atm" icon-md="material:local_atm" text="Abonos"></f7-link>
    </f7-toolbar>

    <!-- Your main view/tab, should have "view-main" class. It also has "tab-active" class -->
    <f7-view id="view-inicio" main tab tab-active  url="/"></f7-view>

    <f7-view id="view-ruta"  name="ruta" main tab  url="/rutas"></f7-view>

    <!-- Catalog View -->
    <f7-view id="view-cliente"  name="clientes" tab url="/clientes/"></f7-view>

    <!-- Settings View -->
    <f7-view id="view-nuevocobro" name="settings" tab url="/abonos/"></f7-view>

    <!-- Pendientes -->
    <f7-view id="view-pendientes" name="pendiente" tab url="/pendientes/"></f7-view>

  </f7-views>


    <!-- Popup -->
    <f7-popup id="my-popup">
      <f7-view>
        <f7-page>
          <f7-navbar title="Popup">
            <f7-nav-right>
              <f7-link popup-close>Close</f7-link>
            </f7-nav-right>
          </f7-navbar>
          <f7-block>
            <p>Popup content goes here.</p>
          </f7-block>
        </f7-page>
      </f7-view>
    </f7-popup>

    <f7-login-screen id="my-login-screen">
      <f7-view>
        <f7-page login-screen>
          <f7-login-screen-title>Login</f7-login-screen-title>
          <f7-list form>
            <f7-list-input
              type="text"
              name="username"
              placeholder="Your username"
              :value="username"
              @input="username = $event.target.value"
            ></f7-list-input>
            <f7-list-input
              type="password"
              name="password"
              placeholder="Your password"
              :value="password"
              @input="password = $event.target.value"
            ></f7-list-input>
          </f7-list>
          <f7-list>
            <f7-list-button title="Sign In" @click="alertLoginData"></f7-list-button>
            <f7-block-footer>
              Some text about login information.<br>Click "Sign In" to close Login Screen
            </f7-block-footer>
          </f7-list>
        </f7-page>
      </f7-view>
    </f7-login-screen>
  </f7-app>
</template>
<script>
  import { Device }  from 'framework7/framework7-lite.esm.bundle.js';
  import cordovaApp from '../js/cordova-app.js';
  import routes from '../js/routes.js';

  export default {
    data() {
      return {
        // Framework7 Parameters
        f7params: {
          id: 'io.framework7.myapp', // App bundle ID
          name: 'SVCC', // App name
          theme: 'auto', // Automatic theme detection

          // App root data
          data: function () {
            return {

              // Demo products for Catalog section
              products: [
                {
                  id: '1',
                  title: 'Apple iPhone 8',
                  description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi tempora similique reiciendis, error nesciunt vero, blanditiis pariatur dolor, minima sed sapiente rerum, dolorem corrupti hic modi praesentium unde saepe perspiciatis.'
                },
                {
                  id: '2',
                  title: 'Apple iPhone 8 Plus',
                  description: 'Velit odit autem modi saepe ratione totam minus, aperiam, labore quia provident temporibus quasi est ut aliquid blanditiis beatae suscipit odio vel! Nostrum porro sunt sint eveniet maiores, dolorem itaque!'
                },
                {
                  id: '3',
                  title: 'Apple iPhone X',
                  description: 'Expedita sequi perferendis quod illum pariatur aliquam, alias laboriosam! Vero blanditiis placeat, mollitia necessitatibus reprehenderit. Labore dolores amet quos, accusamus earum asperiores officiis assumenda optio architecto quia neque, quae eum.'
                },
              ]
            };
          },

          // App routes
          routes: routes,

          // Register service worker
          serviceWorker: Device.cordova ? {} : {
            path: '/service-worker.js',
          },
          // Input settings
          input: {
            scrollIntoViewOnFocus: Device.cordova && !Device.electron,
            scrollIntoViewCentered: Device.cordova && !Device.electron,
          },
          // Cordova Statusbar settings
          statusbar: {
            iosOverlaysWebView: true,
            androidOverlaysWebView: false,
          },
        },
        // Login screen data
        username: '',
        password: '',
      }
    },
    methods: {
      alertLoginData() {
        this.$f7.dialog.alert('Username: ' + this.username + '<br>Password: ' + this.password, () => {
          this.$f7.loginScreen.close();
        });
      },
      exitApp(){
        // cordovaApp.
        console.log(cordovaApp);
      }
    },
    mounted() {
      this.$f7ready((f7) => {
        // Init cordova APIs (see cordova-app.js)
        if (Device.cordova) {
          cordovaApp.init(f7);
        }
        // Call F7 APIs here
      });
    }
  }
</script>