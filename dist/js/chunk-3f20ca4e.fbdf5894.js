(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3f20ca4e"],{1848:function(e,n,t){"use strict";var r=t("4417"),o=t.n(r);o.a},4417:function(e,n,t){},"8ccb":function(e,n,t){"use strict";function r(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function o(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function a(e,n,t){return n&&o(e.prototype,n),t&&o(e,t),e}t.d(n,"a",(function(){return s}));var s=function(){function e(){r(this,e)}return a(e,[{key:"guardarZonaEmpresa",value:function(e,n){return axios.post("EmpresasZonasGuardar?doc=".concat(e,"&sub=Zonas"),n).then((function(e){return e.data}))}},{key:"guardarCobradoresZona",value:function(e,n,t){return axios.post("ZonasGuardarCobradores?doc="+e+"&subdoc="+n,t).then((function(e){return e.data})).catch((function(e){return e}))}},{key:"getAllZonasEmpresa",value:function(e,n){return axios.get("EmpresasZonas?doc="+e+"&sub="+n).then((function(e){return e.data}))}},{key:"getCarsMedium",value:function(){return axios.get("demo/data/cars-medium.json").then((function(e){return e.data.data}))}},{key:"getCarsLarge",value:function(){return axios.get("demo/data/cars-large.json").then((function(e){return e.data.data}))}}]),e}()},"936c":function(e,n,t){"use strict";function r(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function o(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function a(e,n,t){return n&&o(e.prototype,n),t&&o(e,t),e}t.d(n,"a",(function(){return s}));var s=function(){function e(){r(this,e)}return a(e,[{key:"getAllEmpresas",value:function(){return axios.get("Empresas?doc=todos").then((function(e){return e})).catch((function(e){return e}))}},{key:"guardarEmpresa",value:function(e){return axios.post("Empresas",e).then((function(e){return e.data})).catch((function(e){return e}))}},{key:"guardarNuevoPlanEmpresa",value:function(e){return axios.post("GuardarNuevoPlanEmpresa",e).then((function(e){return e.data})).catch((function(e){return e}))}},{key:"getCarsLarge",value:function(){return axios.get("demo/data/cars-large.json").then((function(e){return e.data.data}))}}]),e}()},b565:function(e,n,t){"use strict";t.r(n);var r=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",[t("CRow",[t("CCol",[t("CCard",[e._v(" "+e._s(e.zonasFormCobrador.empresa)+" "+e._s(e.zonasFormCobrador.zonas)+" "),t("CCardBody",[t("CSelect",{attrs:{label:"Empresas",options:e.empresas,value:e.zonasFormCobrador.empresa},on:{"update:value":function(n){return e.$set(e.zonasFormCobrador,"empresa",n)},change:e.onSelectdEmpresa}})],1)],1)],1),t("CCol",[t("CCard",[t("CCardBody",[t("CSelect",{attrs:{label:"Zonas",options:e.zonas,value:e.zonasFormCobrador.zonas,disabled:e.isEnabled},on:{"update:value":function(n){return e.$set(e.zonasFormCobrador,"zonas",n)}}})],1)],1)],1)],1),t("CRow",[t("CCol",[t("CCard",[t("CCardHeader",[t("strong",[e._v("Asingar Cobradores:")]),t("div",{staticClass:"card-header-actions"},[t("a",{staticClass:"card-header-action",attrs:{href:"https://coreui.io/vue/docs/components/button-components",rel:"noreferrer noopener",target:"_blank"}})])]),t("CCardBody",[e._v(" "+e._s(e.selectionItem)+" "),t("PickList",{attrs:{dataKey:e.cobradores.id,selection:e.selection},on:{"move-all-to-target":e.getItems,"move-to-target":e.getItems,"move-all-to-source":e.removeAll,"move-to-source":e.setItems,"update:selection":function(n){e.selection=n}},scopedSlots:e._u([{key:"sourceHeader",fn:function(){return[e._v(" Cobradores ")]},proxy:!0},{key:"targetHeader",fn:function(){return[e._v(" Seleccionados ")]},proxy:!0},{key:"item",fn:function(n){return[t("div",{staticClass:"p-caritem"},[t("div",[t("span",[t("b",[e._v("Identificacion:")]),e._v(" "+e._s(n.item.Identificacion))]),t("span",[t("b",[e._v("Nombre:")]),e._v(" "+e._s(n.item.Nombre)+" "+e._s(n.item.Apellido))]),t("span",[t("b",[e._v("Telefono:")]),e._v(" "+e._s(n.item.Telefono))]),t("span",[t("b",[e._v("Direccion:")]),e._v(" "+e._s(n.item.Direccion1))])])])]}}]),model:{value:e.cobradores,callback:function(n){e.cobradores=n},expression:"cobradores"}}),e._v(" "+e._s(e.selection)+" "+e._s(e.selectionItemSelccionado)+" ")],1),t("CCardFooter",{attrs:{align:"right"}},[t("CButton",{attrs:{color:"success"},on:{click:e.onGuardarCobrador}},[e._v("GUARDAR")])],1)],1)],1)],1),t("Toast",{attrs:{autoZIndex:"",position:"bottomright"}})],1)},o=[],a=t("8ccb"),s=t("daa6"),i=t("936c");function c(e,n){var t;if("undefined"===typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(t=u(e))||n&&e&&"number"===typeof e.length){t&&(e=t);var r=0,o=function(){};return{s:o,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,s=!0,i=!1;return{s:function(){t=e[Symbol.iterator]()},n:function(){var e=t.next();return s=e.done,e},e:function(e){i=!0,a=e},f:function(){try{s||null==t.return||t.return()}finally{if(i)throw a}}}}function u(e,n){if(e){if("string"===typeof e)return l(e,n);var t=Object.prototype.toString.call(e).slice(8,-1);return"Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t?Array.from(e):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?l(e,n):void 0}}function l(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,r=new Array(n);t<n;t++)r[t]=e[t];return r}var d={data:function(){return{zonasFormCobrador:{empresa:"",zonas:""},isEnabled:!0,zonas_empresas:[],cobradores:[],zonaService:null,cobradoresService:null,empresaService:null,selection:[],selectionItem:[],selectionItemSelccionado:{id:""},empresas:[{value:"Seleccione",label:"Seleccione"}],zonas:[{value:"Seleccione",label:"Seleccione"}]}},created:function(){this.zonaService=new a["a"],this.cobradoresService=new s["a"],this.empresaService=new i["a"]},beforeMount:function(){var e=this,n=[];this.empresaService.getAllEmpresas().then((function(t){for(var r in n=t.data,n)if(n.hasOwnProperty(r)){var o={value:n[r].id,label:n[r].Nombre};e.empresas.push(o)}}));var t=this.cobradoresService.getAllCobradores();t.then((function(n){e.cobradores=[n.data.slice(0,5),[]]}))},methods:{onGuardarCobrador:function(){var e=this;console.log(this.selection),this.zonaService.guardarCobradoresZona(this.zonasFormCobrador.empresa,this.zonasFormCobrador.zonas,this.selectionItemSelccionado).then((function(n){var t=n.mensaje;console.log(n),t&&e.$toast.add({severity:"success",summary:"Correcto",detail:t,life:3e3})})).catch((function(n){e.$toast.add({severity:"error",summary:"Error",detail:n,life:3e3})}))},getItems:function(e){var n,t=c(e.items);try{for(t.s();!(n=t.n()).done;){var r=n.value;console.log(r.id),this.selectionItem.unshift(r.id),console.log(e.items.id),this.selectionItemSelccionado.id=r.id}}catch(o){t.e(o)}finally{t.f()}},removeAll:function(){this.selectionItem=[],this.selectionItemSelccionado={id:""}},setItems:function(e){},onSelectdEmpresa:function(){var e=this;this.isEnabled=!1,this.zonas=[{value:"Seleccione",label:"Seleccione"}];var n=[],t=this.zonaService.getAllZonasEmpresa(this.zonasFormCobrador.empresa,"Zonas");t.then((function(t){for(var r in n=t,n)if(n.hasOwnProperty(r)){var o={value:n[r].id,label:n[r].nombre};e.zonas.push(o)}}))}}},f=d,m=(t("1848"),t("2877")),v=Object(m["a"])(f,r,o,!1,null,null,null);n["default"]=v.exports},daa6:function(e,n,t){"use strict";function r(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function o(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function a(e,n,t){return n&&o(e.prototype,n),t&&o(e,t),e}t.d(n,"a",(function(){return s}));var s=function(){function e(){r(this,e)}return a(e,[{key:"getAllCobradores",value:function(){return axios.get("Cobradores?doc=todos").then((function(e){return e})).catch((function(e){return e}))}},{key:"buscarCobradorPorZona",value:function(e){return axios.get("buscarCobradorZona?zona=".concat(e)).then((function(e){return e})).catch((function(e){return e}))}}]),e}()}}]);
//# sourceMappingURL=chunk-3f20ca4e.fbdf5894.js.map