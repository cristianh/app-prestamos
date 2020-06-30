
import HomePage from '../pages/home.vue';
import AboutPage from '../pages/about.vue';
import FormPage from '../pages/form.vue';
import CatalogPage from '../pages/catalog.vue';
import ProductPage from '../pages/product.vue';
import AbonosPage from '../pages/abonos.vue';
import Login from '../pages/login.vue';
import ClientesPage from '../pages/clientes.vue';
import RutasPage from '../pages/rutas.vue';
import nuevoClientePage from '../pages/nuevoCliente.vue';
import clienteDetallesPage from '../pages/clienteDetalles.vue';
import DynamicRoutePage from '../pages/dynamic-route.vue';
import RequestAndLoad from '../pages/request-and-load.vue';
import NotFoundPage from '../pages/404.vue';


var routes = [
   {
    path: '/',
    //component: Login,
    async(routeTo, routeFrom, resolve, reject) {
        if (localStorage.getItem("username")) {
          resolve({
            component: HomePage,
          });
        } else {
          resolve({
            component: Login
          });
        }
    }
  },
  {
    path: '/rutas',
    component: RutasPage,
  },
  {
    path: '/clientes',
    component: ClientesPage,
  },
  {
    path: '/cliente_nuevo',
    component: nuevoClientePage,
  },
  {
    path: '/cliente_detalles/:id/',
    component: clienteDetallesPage
  },
  {
    path: '/home',
    component: HomePage
  },
  {
    path: '/about/',
    component: AboutPage,
  },
  {
    path: '/form/',
    component: FormPage,
  },
  {
    path: '/catalog/',
    component: CatalogPage,
  },
  {
    path: '/product/:id/',
    component: ProductPage,
  },
  {
    path: '/abonos/',
    component: AbonosPage,
  },

  {
    path: '/dynamic-route/blog/:blogId/post/:postId/',
    component: DynamicRoutePage,
  },
  {
    path: '/request-and-load/user/:userId/',
    async: function (routeTo, routeFrom, resolve, reject) {
      // Router instance
      var router = this;

      // App instance
      var app = router.app;

      // Show Preloader
      app.preloader.show();

      // User ID from request
      var userId = routeTo.params.userId;

      // Simulate Ajax Request
      setTimeout(function () {
        // We got user data from request
        var user = {
          firstName: 'Vladimir',
          lastName: 'Kharlampidi',
          about: 'Hello, i am creator of Framework7! Hope you like it!',
          links: [
            {
              title: 'Framework7 Website',
              url: 'http://framework7.io',
            },
            {
              title: 'Framework7 Forum',
              url: 'http://forum.framework7.io',
            },
          ]
        };
        // Hide Preloader
        app.preloader.hide();

        // Resolve route to load page
        resolve(
          {
            component: RequestAndLoad,
          },
          {
            context: {
              user: user,
            }
          }
        );
      }, 1000);
    },
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];

export default routes;
