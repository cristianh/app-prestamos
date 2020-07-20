(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7ab6776d"],{"8ccb":function(e,a,r){"use strict";function o(e,a){if(!(e instanceof a))throw new TypeError("Cannot call a class as a function")}function n(e,a){for(var r=0;r<a.length;r++){var o=a[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function t(e,a,r){return a&&n(e.prototype,a),r&&n(e,r),e}r.d(a,"a",(function(){return i}));var i=function(){function e(){o(this,e)}return t(e,[{key:"guardarZonaEmpresa",value:function(e,a){return axios.post("EmpresasZonasGuardar?doc=".concat(e,"&sub=Zonas"),a).then((function(e){return e.data}))}},{key:"guardarCobradoresZona",value:function(e,a,r){return axios.post("ZonasGuardarCobradores?doc="+e+"&subdoc="+a,r).then((function(e){return e.data})).catch((function(e){return e}))}},{key:"getAllZonasEmpresa",value:function(e,a){return axios.get("EmpresasZonas?doc="+e+"&sub="+a).then((function(e){return e.data}))}},{key:"getCarsMedium",value:function(){return axios.get("demo/data/cars-medium.json").then((function(e){return e.data.data}))}},{key:"getCarsLarge",value:function(){return axios.get("demo/data/cars-large.json").then((function(e){return e.data.data}))}}]),e}()},"936c":function(e,a,r){"use strict";function o(e,a){if(!(e instanceof a))throw new TypeError("Cannot call a class as a function")}function n(e,a){for(var r=0;r<a.length;r++){var o=a[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function t(e,a,r){return a&&n(e.prototype,a),r&&n(e,r),e}r.d(a,"a",(function(){return i}));var i=function(){function e(){o(this,e)}return t(e,[{key:"getAllEmpresas",value:function(){return axios.get("Empresas?doc=todos").then((function(e){return e})).catch((function(e){return e}))}},{key:"guardarEmpresa",value:function(e){return axios.post("Empresas",e).then((function(e){return e.data})).catch((function(e){return e}))}},{key:"guardarNuevoPlanEmpresa",value:function(e){return axios.post("GuardarNuevoPlanEmpresa",e).then((function(e){return e.data})).catch((function(e){return e}))}},{key:"getCarsLarge",value:function(){return axios.get("demo/data/cars-large.json").then((function(e){return e.data.data}))}}]),e}()},b677:function(e,a,r){"use strict";r.r(a);var o=function(){var e=this,a=e.$createElement,r=e._self._c||a;return r("div",[r("CRow",[r("CCol",{attrs:{md:"6"}},[r("CCard",[r("CCardBody",[r("CSelect",{attrs:{label:"Empresas",options:e.empresas,value:e.usuario.empresa},on:{"update:value":function(a){return e.$set(e.usuario,"empresa",a)},change:e.onSelectdEmpresa}})],1)],1)],1),r("CCol",{attrs:{md:"6"}},[r("CCard",[r("CCardBody",[r("CSelect",{attrs:{label:"Zona",options:e.zonas,value:e.usuario.zona,disabled:e.isEnabled},on:{"update:value":function(a){return e.$set(e.usuario,"zona",a)}}})],1)],1)],1)],1),r("CRow",[r("CCol",{attrs:{md:"6"}},[r("CCard",[r("CCardHeader",[r("strong",[e._v("Informacion personal")])]),r("CCardBody",[r("CForm",[r("CInput",{attrs:{description:"Ingresar la identificacion del nuevo cobrador.",label:"Identificacion:",horizontal:"",placeholder:"Identificacion",autocomplete:"identificacion"},model:{value:e.usuario.identificacion,callback:function(a){e.$set(e.usuario,"identificacion",a)},expression:"usuario.identificacion"}}),r("CInput",{attrs:{description:"Ingresar el nombre del nuevo cobrador.",label:"Nombre:",horizontal:"",placeholder:"Nombre",autocomplete:"nombre"},model:{value:e.usuario.nombre,callback:function(a){e.$set(e.usuario,"nombre",a)},expression:"usuario.nombre"}}),r("CInput",{attrs:{label:"Apellido:",horizontal:"",type:"text",placeholder:"Apellido",description:"Ingresar el apellido del nuevo cobrador."},model:{value:e.usuario.apellido,callback:function(a){e.$set(e.usuario,"apellido",a)},expression:"usuario.apellido"}}),r("CInput",{attrs:{label:"Direccion 1:",description:"Ingresar la direccion del nuevo cobrador.",placeholder:"Direccion 1",horizontal:""},model:{value:e.usuario.direccion1,callback:function(a){e.$set(e.usuario,"direccion1",a)},expression:"usuario.direccion1"}}),r("CInput",{attrs:{label:"Direccion 2 (opcional)",description:"Ingresar la direccion del nuevo cobrador.",placeholder:"Direccion 2 ",horizontal:""},model:{value:e.usuario.direccion2,callback:function(a){e.$set(e.usuario,"direccion2",a)},expression:"usuario.direccion2"}}),r("CInput",{attrs:{label:"Telefono",type:"text",horizontal:"",placeholder:"Telefono",description:"Ingresar la telefono del nuevo cobrador."},model:{value:e.usuario.telefono,callback:function(a){e.$set(e.usuario,"telefono",a)},expression:"usuario.telefono"}})],1)],1)],1)],1),r("CCol",{attrs:{md:"6"}},[r("CCard",[r("CCardHeader",[r("strong",[e._v("Usuario y contraseña")])]),r("CCardBody",[r("CCardBody",[r("CInput",{attrs:{type:"email",description:"Please enter your email.",autocomplete:"email",label:"Email",placeholder:"Enter Email...",required:"","was-validated":""},model:{value:e.register.email,callback:function(a){e.$set(e.register,"email",a)},expression:"register.email"}}),r("CInput",{attrs:{type:"password",description:"Please enter your password.",autocomplete:"current-password",label:"Password",placeholder:"Enter Password...",required:"","was-validated":""},model:{value:e.register.password,callback:function(a){e.$set(e.register,"password",a)},expression:"register.password"}})],1)],1)],1)],1)],1),r("CRow",[r("CCol",{attrs:{md:"12"}},[r("CCard",{attrs:{align:"right"}},[r("CCardBody",[r("CButton",{attrs:{type:"submit",size:"sm",color:"success"},on:{click:e.guardar_cobrador}},[r("CIcon",{attrs:{name:"cil-check-circle"}}),e._v(" Registrar")],1),r("CButton",{attrs:{type:"reset",size:"sm",color:"danger"}},[r("CIcon",{attrs:{name:"cil-ban"}}),e._v(" Reset")],1)],1)],1)],1)],1),r("Toast",{attrs:{autoZIndex:"",position:"bottomright"}}),e._v(" "+e._s(e.$data.usuario)+" "+e._s(e.$data.register)+" ")],1)},n=[],t=r("8ccb"),i=r("936c"),s={data:function(){return{register:{email:"",password:""},usuario:{identificacion:"",nombre:"",apellido:"",direccion1:"",direccion2:"",telefono:"",zona:"",empresa:""},isEnabled:!0,empresas:[{value:"Seleccione",label:"Seleccione"}],zonas:[{value:"Seleccione",label:"Seleccione"}]}},created:function(){this.zonaService=new t["a"],this.empresaService=new i["a"]},beforeMount:function(){var e=this,a=[];this.empresaService.getAllEmpresas().then((function(r){for(var o in a=r.data,console.log(a),a)if(a.hasOwnProperty(o)){var n={value:a[o].id,label:a[o].Nombre};e.empresas.push(n)}}))},methods:{onSelectdEmpresa:function(){var e=this;this.isEnabled=!1,this.zonas=[{value:"Seleccione",label:"Seleccione"}];var a=[];this.zonaService.getAllZonasEmpresa(this.usuario.empresa,"Zonas").then((function(r){for(var o in a=r,a)if(a.hasOwnProperty(o)){var n={value:a[o].id,label:a[o].nombre};e.zonas.push(n)}}))},guardar_cobrador:function(){var e=this;this.usuario.telefono;firebase.auth().createUserWithEmailAndPassword(this.register.email,this.register.password).then((function(a){var r=firebase.auth().currentUser;axios.post("https://us-central1-manifest-life-279516.cloudfunctions.net/Cobradores",e.usuario).then((function(a){var o=a.data;r.updateProfile({displayName:e.usuario.nombre+" "+e.usuario.apellido+"-"+o,photoURL:"hola"}).then((function(){return"actualizado"})).catch((function(e){return"error"})),e.$toast.add({severity:"success",summary:"Correcto",detail:"Usuario Guardado.",life:3e3})})).catch((function(e){console.log(e)})),console.log(r)})).catch((function(e){var a=e.code,r=e.message;console.log(a),console.log(r)}))}}},u=s,c=r("2877"),l=Object(c["a"])(u,o,n,!1,null,null,null);a["default"]=l.exports}}]);
//# sourceMappingURL=chunk-7ab6776d.711b21d4.js.map