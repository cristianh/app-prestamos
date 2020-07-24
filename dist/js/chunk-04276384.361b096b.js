(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-04276384"],{1513:function(t,e,a){"use strict";var r=a("4004"),o=a.n(r);o.a},4004:function(t,e,a){},4375:function(t,e,a){"use strict";var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("CChartLine",{attrs:{datasets:t.defaultDatasets,options:t.defaultOptions,labels:["Mo","Tu","We","Th","Fr","Sa","Su","Mo","Tu","We","Th","Fr","Sa","Su","Mo","Tu","We","Th","Fr","Sa","Su","Mo","Tu","We","Th","Fr","Sa","Su"]}})},o=[],s=a("f485"),n=a("52d7"),i=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:100;if("undefined"===typeof t)throw new TypeError("Hex color is not defined");var a,r,o,s=t.match(/^#(?:[0-9a-f]{3}){1,2}$/i);if(!s)throw new Error("".concat(t," is not a valid hex color"));return 7===t.length?(a=parseInt(t.slice(1,3),16),r=parseInt(t.slice(3,5),16),o=parseInt(t.slice(5,7),16)):(a=parseInt(t.slice(1,2),16),r=parseInt(t.slice(2,3),16),o=parseInt(t.slice(3,5),16)),"rgba(".concat(a,", ").concat(r,", ").concat(o,", ").concat(e/100,")")},l=i;function c(t,e){return Math.floor(Math.random()*(e-t+1)+t)}var d={name:"MainChartExample",components:{CChartLine:s["CChartLine"]},computed:{defaultDatasets:function(){for(var t=Object(n["a"])("success2")||"#4dbd74",e=Object(n["a"])("info")||"#20a8d8",a=Object(n["a"])("danger")||"#f86c6b",r=27,o=[],s=[],i=[],d=0;d<=r;d++)o.push(c(50,200)),s.push(c(80,100)),i.push(65);return[{label:"My First dataset",backgroundColor:l(e,10),borderColor:e,pointHoverBackgroundColor:e,borderWidth:2,data:o},{label:"My Second dataset",backgroundColor:"transparent",borderColor:t,pointHoverBackgroundColor:t,borderWidth:2,data:s},{label:"My Third dataset",backgroundColor:"transparent",borderColor:a,pointHoverBackgroundColor:a,borderWidth:1,borderDash:[8,5],data:i}]},defaultOptions:function(){return{maintainAspectRatio:!1,legend:{display:!1},scales:{xAxes:[{gridLines:{drawOnChartArea:!1}}],yAxes:[{ticks:{beginAtZero:!0,maxTicksLimit:5,stepSize:Math.ceil(50),max:250},gridLines:{display:!0}}]},elements:{point:{radius:0,hitRadius:10,hoverRadius:4,hoverBorderWidth:3}}}}}},m=d,u=a("2877"),p=Object(u["a"])(m,r,o,!1,null,null,null);e["a"]=p.exports},"4d5b":function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[t._v(" "+t._s(t.empresa_form)+" "),a("CCard",[a("CCardHeader",[a("strong",[t._v("Empresa:")]),a("div",{staticClass:"card-header-actions"},[a("a",{staticClass:"card-header-action",attrs:{href:"https://coreui.io/vue/docs/components/button-components",rel:"noreferrer noopener",target:"_blank"}})])]),a("CCardBody",[a("CRow",{attrs:{alignHorizontal:"start"}},[a("CCol",{attrs:{sm:"12"}},[a("CInput",{attrs:{label:"Nombre",placeholder:"Ingresa el nombre de la empresa"},model:{value:t.empresa_form.Nombre,callback:function(e){t.$set(t.empresa_form,"Nombre",e)},expression:"empresa_form.Nombre"}})],1)],1),a("CRow",[a("CCol",{attrs:{sm:"12"}},[a("CInput",{attrs:{label:"Balance",append:".00",description:"Ingresa del balance inicial",prepend:"$"},model:{value:t.empresa_form.Balance,callback:function(e){t.$set(t.empresa_form,"Balance",e)},expression:"empresa_form.Balance"}})],1)],1),a("CRow",[a("CCol",{attrs:{sm:"12"}},[a("CInput",{attrs:{description:"Ingrese el mensaje de bienvenida que aparecera en el app.",label:"Mensaje: (opcional)",type:"textarea",placeholder:"Mensaje..."},model:{value:t.empresa_form.Mensaje,callback:function(e){t.$set(t.empresa_form,"Mensaje",e)},expression:"empresa_form.Mensaje"}})],1)],1),a("CRow",[a("CCol",{staticClass:"mb-3 mb-xl-0",attrs:{col:"4",sm:"4",md:"2",xl:""}},[a("CButton",{attrs:{color:"success"},on:{click:t.onGuardarEmpresa}},[t._v("GUARDAR")])],1)],1)],1)],1),a("WidgetsDropdown"),a("CCard",[a("CCardBody",[a("CRow",[a("CCol",{attrs:{sm:"5"}},[a("h4",{staticClass:"card-title mb-0",attrs:{id:"traffic"}},[t._v("Traffic")]),a("div",{staticClass:"small text-muted"},[t._v("November 2017")])]),a("CCol",{staticClass:"d-none d-md-block",attrs:{sm:"7"}},[a("CButton",{staticClass:"float-right",attrs:{color:"primary"}},[a("CIcon",{attrs:{name:"cil-cloud-download"}})],1),a("CButtonGroup",{staticClass:"float-right mr-3"},t._l(["Day","Month","Year"],(function(e,r){return a("CButton",{key:r,staticClass:"mx-0",attrs:{color:"outline-secondary",pressed:e===t.selected},on:{click:function(a){t.selected=e}}},[t._v(" "+t._s(e)+" ")])})),1)],1)],1),a("MainChartExample",{staticStyle:{height:"300px","margin-top":"40px"}})],1),a("CCardFooter",[a("CRow",{staticClass:"text-center"},[a("CCol",{staticClass:"mb-sm-2 mb-0",attrs:{md:"",sm:"12"}},[a("div",{staticClass:"text-muted"},[t._v("Visits")]),a("strong",[t._v("29.703 Users (40%)")]),a("CProgress",{staticClass:"progress-xs mt-2",attrs:{precision:1,color:"success",value:40}})],1),a("CCol",{staticClass:"mb-sm-2 mb-0 d-md-down-none",attrs:{md:"",sm:"12"}},[a("div",{staticClass:"text-muted"},[t._v("Unique")]),a("strong",[t._v("24.093 Users (20%)")]),a("CProgress",{staticClass:"progress-xs mt-2",attrs:{precision:1,color:"info",value:20}})],1),a("CCol",{staticClass:"mb-sm-2 mb-0",attrs:{md:"",sm:"12"}},[a("div",{staticClass:"text-muted"},[t._v("Pageviews")]),a("strong",[t._v("78.706 Views (60%)")]),a("CProgress",{staticClass:"progress-xs mt-2",attrs:{precision:1,color:"warning",value:60}})],1),a("CCol",{staticClass:"mb-sm-2 mb-0",attrs:{md:"",sm:"12"}},[a("div",{staticClass:"text-muted"},[t._v("New Users")]),a("strong",[t._v("22.123 Users (80%)")]),a("CProgress",{staticClass:"progress-xs mt-2",attrs:{precision:1,color:"danger",value:80}})],1),a("CCol",{staticClass:"mb-sm-2 mb-0 d-md-down-none",attrs:{md:"",sm:"12"}},[a("div",{staticClass:"text-muted"},[t._v("Bounce Rate")]),a("strong",[t._v("Average Rate (40.15%)")]),a("CProgress",{staticClass:"progress-xs mt-2",attrs:{precision:1,value:40}})],1)],1)],1)],1),a("WidgetsBrand"),a("Toast",{attrs:{autoZIndex:"",position:"bottomright"}})],1)},o=[],s=a("4375"),n=a("f236"),i=a("ed3a"),l=a("936c"),c={name:"Dashboard",components:{MainChartExample:s["a"],WidgetsDropdown:n["a"],WidgetsBrand:i["a"]},data:function(){return{empresa_form:{Nombre:"",Balance:"",Mensaje:""},empresaService:null,selected:"Month",tableItems:[{avatar:{url:"img/avatars/1.jpg",status:"success"},user:{name:"Yiorgos Avraamu",new:!0,registered:"Jan 1, 2015"},country:{name:"USA",flag:"cif-us"},usage:{value:50,period:"Jun 11, 2015 - Jul 10, 2015"},payment:{name:"Mastercard",icon:"cib-cc-mastercard"},activity:"10 sec ago"},{avatar:{url:"img/avatars/2.jpg",status:"danger"},user:{name:"Avram Tarasios",new:!1,registered:"Jan 1, 2015"},country:{name:"Brazil",flag:"cif-br"},usage:{value:22,period:"Jun 11, 2015 - Jul 10, 2015"},payment:{name:"Visa",icon:"cib-cc-visa"},activity:"5 minutes ago"},{avatar:{url:"img/avatars/3.jpg",status:"warning"},user:{name:"Quintin Ed",new:!0,registered:"Jan 1, 2015"},country:{name:"India",flag:"cif-in"},usage:{value:74,period:"Jun 11, 2015 - Jul 10, 2015"},payment:{name:"Stripe",icon:"cib-stripe"},activity:"1 hour ago"},{avatar:{url:"img/avatars/4.jpg",status:""},user:{name:"Enéas Kwadwo",new:!0,registered:"Jan 1, 2015"},country:{name:"France",flag:"cif-fr"},usage:{value:98,period:"Jun 11, 2015 - Jul 10, 2015"},payment:{name:"PayPal",icon:"cib-paypal"},activity:"Last month"},{avatar:{url:"img/avatars/5.jpg",status:"success"},user:{name:"Agapetus Tadeáš",new:!0,registered:"Jan 1, 2015"},country:{name:"Spain",flag:"cif-es"},usage:{value:22,period:"Jun 11, 2015 - Jul 10, 2015"},payment:{name:"Google Wallet",icon:"cib-google-pay"},activity:"Last week"},{avatar:{url:"img/avatars/6.jpg",status:"danger"},user:{name:"Friderik Dávid",new:!0,registered:"Jan 1, 2015"},country:{name:"Poland",flag:"cif-pl"},usage:{value:43,period:"Jun 11, 2015 - Jul 10, 2015"},payment:{name:"Amex",icon:"cib-cc-amex"},activity:"Last week"}],tableFields:[{key:"avatar",label:"",_classes:"text-center"},{key:"user"},{key:"country",_classes:"text-center"},{key:"usage"},{key:"payment",label:"Payment method",_classes:"text-center"},{key:"activity"}]}},created:function(){this.empresaService=new l["a"]},methods:{onGuardarEmpresa:function(){var t=this;this.empresaService.guardarEmpresa(this.empresa_form).then((function(e){t.$toast.add({severity:"success",summary:"Correcto.",detail:"Empresa Creada",life:3e3}),t.empresa_form={nombre:"",balance:"",mensaje:""}})).catch((function(e){t.$toast.add({severity:"warn",summary:"Error.",detail:e,life:3e3})}))},color:function(t){var e;return t<=25?e="info":t>25&&t<=50?e="success":t>50&&t<=75?e="warning":t>75&&t<=100&&(e="danger"),e}}},d=c,m=a("2877"),u=Object(m["a"])(d,r,o,!1,null,null,null);e["default"]=u.exports},"936c":function(t,e,a){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){for(var a=0;a<e.length;a++){var r=e[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function s(t,e,a){return e&&o(t.prototype,e),a&&o(t,a),t}a.d(e,"a",(function(){return n}));var n=function(){function t(){r(this,t)}return s(t,[{key:"getAllEmpresas",value:function(){return axios.get("Empresas?doc=todos").then((function(t){return t})).catch((function(t){return t}))}},{key:"guardarEmpresa",value:function(t){return axios.post("Empresas",t).then((function(t){return t.data})).catch((function(t){return t}))}},{key:"guardarNuevoPlanEmpresa",value:function(t){return axios.post("GuardarNuevoPlanEmpresa",t).then((function(t){return t.data})).catch((function(t){return t}))}},{key:"getCarsLarge",value:function(){return axios.get("demo/data/cars-large.json").then((function(t){return t.data.data}))}}]),t}()},ed3a:function(t,e,a){"use strict";var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("CRow",[t.noCharts?[a("CCol",{attrs:{md:"3",sm:"6"}},[a("CWidgetBrand",{attrs:{color:"facebook","right-header":"89k","right-footer":"friends","left-header":"459","left-footer":"feeds"}},[a("CIcon",{staticClass:"my-4",attrs:{name:"cib-facebook",height:"56"}})],1)],1),a("CCol",{attrs:{md:"3",sm:"6"}},[a("CWidgetBrand",{attrs:{color:"twitter","right-header":"973k","right-footer":"followers","left-header":"1.792","left-footer":"tweets"}},[a("CIcon",{staticClass:"my-4",attrs:{name:"cib-twitter",height:"56"}})],1)],1),a("CCol",{attrs:{md:"3",sm:"6"}},[a("CWidgetBrand",{attrs:{color:"linkedin","right-header":"500+","right-footer":"contracts","left-header":"292","left-footer":"feeds"}},[a("CIcon",{staticClass:"my-4",attrs:{name:"cib-linkedin",height:"56"}})],1)],1),a("CCol",{attrs:{md:"3",sm:"6"}},[a("CWidgetBrand",{attrs:{"right-header":"12","right-footer":"events","left-header":"4","left-footer":"meetings",color:"warning"}},[a("CIcon",{staticClass:"my-4",attrs:{name:"cil-calendar",height:"56"}})],1)],1)]:[a("CCol",{attrs:{md:"3",sm:"6"}},[a("CWidgetBrand",{attrs:{color:"facebook","right-header":"89k","right-footer":"friends","left-header":"459","left-footer":"feeds"}},[a("CIcon",{staticClass:"my-4",attrs:{name:"cib-facebook",height:"52"}}),a("CChartLineSimple",{staticClass:"c-chart-brand",attrs:{"background-color":"rgba(255,255,255,.1)","data-points":[65,59,84,84,51,55,40],label:"Friends",labels:"months"}})],1)],1),a("CCol",{attrs:{md:"3",sm:"6"}},[a("CWidgetBrand",{attrs:{color:"twitter","right-header":"973k","right-footer":"followers","left-header":"1.792","left-footer":"tweets"}},[a("CIcon",{staticClass:"my-4",attrs:{name:"cib-twitter",height:"52"}}),a("CChartLineSimple",{staticClass:"c-chart-brand",attrs:{"background-color":"rgba(255,255,255,.1)","data-points":[1,13,9,17,34,41,38],label:"Followers",labels:"months"}})],1)],1),a("CCol",{attrs:{md:"3",sm:"6"}},[a("CWidgetBrand",{attrs:{color:"linkedin","right-header":"500+","right-footer":"contracts","left-header":"292","left-footer":"feeds"}},[a("CIcon",{staticClass:"my-4",attrs:{name:"cib-linkedin",height:"52"}}),a("CChartLineSimple",{staticClass:"c-chart-brand",attrs:{"background-color":"rgba(255,255,255,.1)","data-points":[78,81,80,45,34,12,40],label:"Contracts",labels:"months"}})],1)],1),a("CCol",{attrs:{md:"3",sm:"6"}},[a("CWidgetBrand",{attrs:{"right-header":"12","right-footer":"events","left-header":"4","left-footer":"meetings",color:"warning"}},[a("CIcon",{staticClass:"my-4",attrs:{name:"cil-calendar",height:"52"}}),a("CChartLineSimple",{staticClass:"c-chart-brand",attrs:{"background-color":"rgba(255,255,255,.1)","data-points":[35,23,56,22,97,23,64],label:"Followers",labels:"months"}})],1)],1)]],2)},o=[],s=a("4c27"),n={name:"WidgetsBrand",components:{CChartLineSimple:s["CChartLineSimple"]},props:{noCharts:Boolean}},i=n,l=(a("1513"),a("2877")),c=Object(l["a"])(i,r,o,!1,null,"319234b8",null);e["a"]=c.exports},f236:function(t,e,a){"use strict";var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("CRow",[a("CCol",{attrs:{sm:"6",lg:"3"}},[a("CWidgetDropdown",{attrs:{color:"primary",header:"9.823",text:"Members online"},scopedSlots:t._u([{key:"default",fn:function(){return[a("CDropdown",{attrs:{color:"transparent p-0",placement:"bottom-end"},scopedSlots:t._u([{key:"toggler-content",fn:function(){return[a("CIcon",{attrs:{name:"cil-settings"}})]},proxy:!0}])},[a("CDropdownItem",[t._v("Action")]),a("CDropdownItem",[t._v("Another action")]),a("CDropdownItem",[t._v("Something else here...")]),a("CDropdownItem",{attrs:{disabled:""}},[t._v("Disabled action")])],1)]},proxy:!0},{key:"footer",fn:function(){return[a("CChartLineSimple",{staticClass:"mt-3 mx-3",staticStyle:{height:"70px"},attrs:{pointed:"","data-points":[65,59,84,84,51,55,40],"point-hover-background-color":"primary",label:"Members",labels:"months"}})]},proxy:!0}])})],1),a("CCol",{attrs:{sm:"6",lg:"3"}},[a("CWidgetDropdown",{attrs:{color:"info",header:"9.823",text:"Members online"},scopedSlots:t._u([{key:"default",fn:function(){return[a("CDropdown",{attrs:{color:"transparent p-0",placement:"bottom-end",caret:!1},scopedSlots:t._u([{key:"toggler-content",fn:function(){return[a("CIcon",{attrs:{name:"cil-location-pin"}})]},proxy:!0}])},[a("CDropdownItem",[t._v("Action")]),a("CDropdownItem",[t._v("Another action")]),a("CDropdownItem",[t._v("Something else here...")]),a("CDropdownItem",{attrs:{disabled:""}},[t._v("Disabled action")])],1)]},proxy:!0},{key:"footer",fn:function(){return[a("CChartLineSimple",{staticClass:"mt-3 mx-3",staticStyle:{height:"70px"},attrs:{pointed:"","data-points":[1,18,9,17,34,22,11],"point-hover-background-color":"info",options:{elements:{line:{tension:1e-5}}},label:"Members",labels:"months"}})]},proxy:!0}])})],1),a("CCol",{attrs:{sm:"6",lg:"3"}},[a("CWidgetDropdown",{attrs:{color:"warning",header:"9.823",text:"Members online"},scopedSlots:t._u([{key:"default",fn:function(){return[a("CDropdown",{attrs:{color:"transparent p-0",placement:"bottom-end"},scopedSlots:t._u([{key:"toggler-content",fn:function(){return[a("CIcon",{attrs:{name:"cil-settings"}})]},proxy:!0}])},[a("CDropdownItem",[t._v("Action")]),a("CDropdownItem",[t._v("Another action")]),a("CDropdownItem",[t._v("Something else here...")]),a("CDropdownItem",{attrs:{disabled:""}},[t._v("Disabled action")])],1)]},proxy:!0},{key:"footer",fn:function(){return[a("CChartLineSimple",{staticClass:"mt-3",staticStyle:{height:"70px"},attrs:{"background-color":"rgba(255,255,255,.2)","data-points":[78,81,80,45,34,12,40],options:{elements:{line:{borderWidth:2.5}}},"point-hover-background-color":"warning",label:"Members",labels:"months"}})]},proxy:!0}])})],1),a("CCol",{attrs:{sm:"6",lg:"3"}},[a("CWidgetDropdown",{attrs:{color:"danger",header:"9.823",text:"Members online"},scopedSlots:t._u([{key:"default",fn:function(){return[a("CDropdown",{attrs:{color:"transparent p-0",placement:"bottom-end"},scopedSlots:t._u([{key:"toggler-content",fn:function(){return[a("CIcon",{attrs:{name:"cil-settings"}})]},proxy:!0}])},[a("CDropdownItem",[t._v("Action")]),a("CDropdownItem",[t._v("Another action")]),a("CDropdownItem",[t._v("Something else here...")]),a("CDropdownItem",{attrs:{disabled:""}},[t._v("Disabled action")])],1)]},proxy:!0},{key:"footer",fn:function(){return[a("CChartBarSimple",{staticClass:"mt-3 mx-3",staticStyle:{height:"70px"},attrs:{"background-color":"rgb(250, 152, 152)",label:"Members",labels:"months"}})]},proxy:!0}])})],1)],1)},o=[],s=a("4c27"),n={name:"WidgetsDropdown",components:{CChartLineSimple:s["CChartLineSimple"],CChartBarSimple:s["CChartBarSimple"]}},i=n,l=a("2877"),c=Object(l["a"])(i,r,o,!1,null,null,null);e["a"]=c.exports}}]);
//# sourceMappingURL=chunk-04276384.361b096b.js.map