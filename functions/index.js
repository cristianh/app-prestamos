const functions = require('firebase-functions');
const admin = require('firebase-admin');
const util = require('util')
const cors = require('cors')({ origin: true });



admin.initializeApp(functions.config().firebase);
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

const db = admin.firestore();

const fieldValue = admin.firestore.FieldValue; 


exports.myFunctionName  = functions.firestore
  .document('cobradores/{CobradoresID}/Clientes/{ClientesID}/{PrestamosCollectionId}/{PrestamosID}')
  .onWrite((change, context) => { 
    let cobradorid= context.params.CobradoresID;
    let clienteid= context.params.ClientesID;
    let prestamoid= context.params.PrestamosID;

     
               
      let dd =db.collection(`cobradores/${cobradorid}/Clientes/${clienteid}/Prestamos`).doc(prestamoid).get();

      
        db.collection("cities").doc("SF").set({
                   //dd.data()
                })

    //  .then(doc => {
    //             if (!doc.exists) {

    //               return response.send('Not Found')
    //             }else{
    //               db.collection("cities").doc("SF").update({
    //                capital: doc.data().valor
    //             })

    //             }

    //             return response.status(200).send(doc.data()).end();
    //           })
    //           .catch(err => {
    //             return response.send('Error getting document', err).end();
    //           });
    
    // let snapshop= db.collection('cobradores').doc(cobradorid).collection('Clientes').doc(clienteid).collection('Prestamos').doc(prestamoid).get()
    //  .then(doc => {
    //             if (!doc.exists) {

    //               return response.send('Not Found')
    //             }else{
    //             //   db.collection("cities").doc("SF").update({
    //             //    capital: doc.data()
    //             // })

    //             }

    //             return response.status(200).send(doc.data()).end();
    //           })
    //           .catch(err => {
    //             return response.send('Error getting document', err).end();
    //           });

    // .update({
    // capital: cobradorid+clienteid+prestamoid
    // })
 });

/**
 * @function Funcion para guardar los cobros de los cobradores.
 */
exports.CobradoresGuardarCobros = functions.https.onRequest(async (request, response, body) => {
  response.set('Access-Control-Allow-Origin', '*');
  response.set('Access-Control-Allow-Credentials', 'true'); // vital
  response.set('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'DELETE', 'OPTIONS');
  response.set('Access-Control-Allow-Headers', 'Content-Type');
  response.set('Access-Control-Allow-Headers', 'Content-Length,Content-Range');
  response.set('Access-Control-Allow-Headers', 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization');

  // await db.collection('cobradores').doc(request.query.doc).collection('Clientes').doc(request.query.subid).collection(request.query.sub).add(request.body)
  await db.collection('cobradores').doc(request.query.doc).collection('Clientes').doc(request.query.sub).update({
    cobros: fieldValue.arrayUnion(request.body)
}).then(() => {
    return response.send('Cobro registrado.');
  }).catch((error) => {
    return response.status(500).send(error);
  })
});


/**
 * @function Funcion que devuelve todas las sonas de la empresa.
 */
exports.getEmpresaZonaDoc = functions.https.onRequest(async (request, response, body) => {
  response.set('Access-Control-Allow-Origin', '*');
  response.set('Access-Control-Allow-Credentials', 'true'); // vital
  response.set('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'DELETE', 'OPTIONS');
  response.set('Access-Control-Allow-Headers', 'Content-Type');
  response.set('Access-Control-Allow-Headers', 'Content-Length,Content-Range');
  response.set('Access-Control-Allow-Headers', 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization');
  
  let datasubcolltion = [];
            await db.collection('empresas').doc(request.query.doc).collection('Zonas').doc(request.query.subdoc).get().then(doc => {
                if (!doc.exists) {

                  return response.send('Not Found')
                }

                return response.status(200).send(JSON.stringify(doc.data())).end();
              })
              .catch(err => {
                return response.send('Error getting document', err).end();
              });
});

/**
 * @function Funcion que devuelve todas las sonas de la empresa.
 */
exports.EmpresasZonas = functions.https.onRequest(async (request, response, body) => {
  response.set('Access-Control-Allow-Origin', '*');
  response.set('Access-Control-Allow-Credentials', 'true'); // vital
  response.set('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'DELETE', 'OPTIONS');
  response.set('Access-Control-Allow-Headers', 'Content-Type');
  response.set('Access-Control-Allow-Headers', 'Content-Length,Content-Range');
  response.set('Access-Control-Allow-Headers', 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization');
  
  let datasubcolltion = [];
            await db.collection('empresas').doc(request.query.doc).collection(request.query.sub).get()
              .then(snapshot => {
                snapshot.forEach(doc => {
                  let id = doc.id;
                  let datadocument = doc.data();
                  datadocument.id=id;
                  datasubcolltion.push(datadocument);
                  // datasubcolltion.push({
                  //   id: doc.id,
                  //   data: doc.data()
                  // });


                });
                return response.status(200).send(JSON.stringify(datasubcolltion));
              })
              .catch(err => {
                return response.send('Error getting document', err).end();
              });
});

/**
 * @function Funcion para guardar las zonas en la empresa.
 */
exports.EmpresasZonasGuardar = functions.https.onRequest(async (request, response, body) => {
  response.set('Access-Control-Allow-Origin', '*');
  response.set('Access-Control-Allow-Credentials', 'true'); // vital
  response.set('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'DELETE', 'OPTIONS');
  response.set('Access-Control-Allow-Headers', 'Content-Type');
  response.set('Access-Control-Allow-Headers', 'Content-Length,Content-Range');
  response.set('Access-Control-Allow-Headers', 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization');
try {
  const snapshot = await db.collection('empresas').doc(request.query.doc).get();

        if (!snapshot.exists) {
            return response.status(200).send(JSON.stringify({mensaje:'Empresa no econtrada.'})).end();
          } else {
             
           await db.collection('empresas').doc(request.query.doc).collection(request.query.sub).add(request.body).then(() => {
                return response.status(200).send(JSON.stringify({mensaje:'Zona Guardada.'})).end();
              }).catch((error) => {
                return response.status(500).send(error);
              });
          }
} catch (error) {
  return response.send('Error getting document', error).end();
}

});

/**
 * @function Funcion para guardar los clientes de los cobradores.
 */
exports.CobradoresGuardarClientes = functions.https.onRequest(async (request, response, body) => {
  response.set('Access-Control-Allow-Origin', '*');
  response.set('Access-Control-Allow-Credentials', 'true'); // vital
  response.set('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'DELETE', 'OPTIONS');
  response.set('Access-Control-Allow-Headers', 'Content-Type');
  response.set('Access-Control-Allow-Headers', 'Content-Length,Content-Range');
  response.set('Access-Control-Allow-Headers', 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization');

  await db.collection('cobradores').doc(request.query.doc).collection(request.query.sub).add(request.body).then(idCliente => {
    return response.send(idCliente.id);
  }).catch((error) => {
    return response.status(500).send(error);
  });
});

/**
 * @function Funcion para buscar el cliente del cobrador.
 */
exports.CobradoresClientesBuscar = functions.https.onRequest(async (request, response, body) => {
  response.set('Access-Control-Allow-Origin', '*');
  response.set('Access-Control-Allow-Credentials', 'true'); // vital
  response.set('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'DELETE', 'OPTIONS');
  response.set('Access-Control-Allow-Headers', 'Content-Type');
  response.set('Access-Control-Allow-Headers', 'Content-Length,Content-Range');
  response.set('Access-Control-Allow-Headers', 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization');
  let datasubcolltion = [];
  const docRef = await db.collection('cobradores').doc(request.query.doc).collection(request.query.sub).doc(request.query.subdoc).get().then(doc => {
    if (!doc.exists) {

      return response.send('Not Found')
    }

    return response.status(200).send(JSON.stringify(doc.data())).end();
  })
    .catch(err => {
      return response.send('Error getting document', err).end();
    });
  //return response.status(200).send(docRef);

  //let datasubcolltion=[];
  // const docRef =  await db.collection('cobradores').doc(request.query.doc).collection(request.query.sub).doc(request.query.subdoc).get()
  //   .then(snapshot => {
  //      snapshot.forEach(doc => {
  //       let id = doc.id;
  //       let datadocument = doc.data();
  //       //cobradores.push(id,datadocument);
  //       datasubcolltion.push({
  //               id: doc.id,
  //               data: doc.data()
  //           });


  //      });
  //      return response.status(200).send(JSON.stringify(datasubcolltion));
  //   })
  //   .catch(err => {
  //     return response.send('Error getting document', err).end();
  //   });

});

/**
 * @function Funcion para guardar las zonas de los cobradores.
 */
exports.ZonasGuardarCobradores = functions.https.onRequest(async (request, response, body) => {
  response.set('Access-Control-Allow-Origin', '*');
  response.set('Access-Control-Allow-Credentials', 'true'); // vital
  response.set('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'DELETE', 'OPTIONS');
  response.set('Access-Control-Allow-Headers', 'Content-Type');
  response.set('Access-Control-Allow-Headers', 'Content-Length,Content-Range');
  response.set('Access-Control-Allow-Headers', 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization');
  await db.collection('empresas').doc(request.query.doc).collection('Zonas').doc(request.query.subdoc).collection('Cobradores').add(request.body).then(() => {
    return response.send(JSON.stringify({mensaje:'Cobrador Guardado en la zona.'}));
  }).catch((error) => {
    return response.status(500).send(error);
  });
});
/**
 * @function Funcion para guardar los cobros de los cobradores.
 */
exports.CobradoresGuardarCobros = functions.https.onRequest(async (request, response, body) => {
  response.set('Access-Control-Allow-Origin', '*');
  response.set('Access-Control-Allow-Credentials', 'true'); // vital
  response.set('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'DELETE', 'OPTIONS');
  response.set('Access-Control-Allow-Headers', 'Content-Type');
  response.set('Access-Control-Allow-Headers', 'Content-Length,Content-Range');
  response.set('Access-Control-Allow-Headers', 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization');

  // await db.collection('cobradores').doc(request.query.doc).collection('Clientes').doc(request.query.subid).collection(request.query.sub).add(request.body)
  await db.collection('cobradores').doc(request.query.doc).collection('Clientes').doc(request.query.sub).update({
    cobros: fieldValue.arrayUnion(request.body)
}).then(() => {
    return response.send('Cobro registrado.');
  }).catch((error) => {
    return response.status(500).send(error);
  });
});
/**
 * @function Funcion para guardar los prestamos de los cobradores.
 */
exports.CobradoresGuardarPrestamos = functions.https.onRequest(async (request, response, body) => {
  response.set('Access-Control-Allow-Origin', '*');
  response.set('Access-Control-Allow-Credentials', 'true'); // vital
  response.set('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'DELETE', 'OPTIONS');
  response.set('Access-Control-Allow-Headers', 'Content-Type');
  response.set('Access-Control-Allow-Headers', 'Content-Length,Content-Range');
  response.set('Access-Control-Allow-Headers', 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization');
  // await db.collection('cobradores').doc(request.query.doc).collection('Clientes').doc(request.query.subid).collection(request.query.sub).add(request.body).then(() => {
  await db.collection('cobradores').doc(request.query.doc).collection('Clientes').doc(request.query.sub).update({
    prestamos: fieldValue.arrayUnion(request.body)
}).then(() => {
    return response.send('Prestamo registrado.');
  }).catch((error) => {
    return response.status(500).send(error);
  });
});

/**
 * @function Funcion para guardar los rutas de los cobradores.
 */
exports.CobradoresGuardarRutas = functions.https.onRequest(async (request, response, body) => {
  response.set('Access-Control-Allow-Origin', '*');
  response.set('Access-Control-Allow-Credentials', 'true'); // vital
  response.set('Access-Control-Allow-Methods', 'GET,POST', 'PUT', 'DELETE', 'OPTIONS');
  response.set('Access-Control-Allow-Headers', 'Content-Type');
  response.set('Access-Control-Allow-Headers', 'Content-Length,Content-Range');
  response.set('Access-Control-Allow-Headers', 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization');
  await db.collection('cobradores').doc(request.query.doc).collection(request.query.sub).add(request.body).then((result) => {
    return response.send(result.id);
  }).catch((error) => {
    return response.status(500).send(error);
  });
});

/**
 * @function Funcion para guardar los rutas de los cobradores.
 */
exports.CobradoresGuardarClientesRutas = functions.https.onRequest(async (request, response, body) => {
  response.set('Access-Control-Allow-Origin', '*');
  response.set('Access-Control-Allow-Credentials', 'true'); // vital
  response.set('Access-Control-Allow-Methods', 'GET,POST', 'PUT', 'DELETE', 'OPTIONS');
  response.set('Access-Control-Allow-Headers', 'Content-Type');
  response.set('Access-Control-Allow-Headers', 'Content-Length,Content-Range');
  response.set('Access-Control-Allow-Headers', 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization');


  await db.collection('cobradores').doc(request.query.doc).collection('Rutas').doc(request.query.sub).update({
    clientes: request.body
}, { merge: true }).then((result) => {
    return response.send(result.id);
  }).catch((error) => {
    return response.status(500).send(error);
  });
});

/**
 * @function Funcion para guardar los gastos de los cobradores.
 */
exports.CobradoresGuardarGastos = functions.https.onRequest(async (request, response, body) => {
  await db.collection('cobradores').doc(request.query.doc).collection(request.query.sub).add({
    Descripcion: request.body.descripcion,
    Valor_gasto: request.body.valor_gasto,
    fecha_creacion: request.body.fecha_creacion
  }).then(() => {
    return response.send('Ruta registrada.');
  }).catch((error) => {
    return response.status(500).send(error);
  });
});
/**
 * @function Funcion que se encarga de manajar los end-point de Empresas.
 * @param request
 * @param response
 * @param body
 */
exports.Cobradores = functions.https.onRequest(async (request, response, body) => {
  //response.send("Hello from Firebase!");
  response.set('Access-Control-Allow-Origin', '*');
  response.set('Access-Control-Allow-Credentials', 'true'); // vital
  response.set('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'DELETE', 'OPTIONS');
  response.set('Access-Control-Allow-Headers', 'Content-Type');
  response.set('Access-Control-Allow-Headers', 'Content-Length,Content-Range');
  response.set('Access-Control-Allow-Headers', 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization');
  try {
    const snapshot = await db.collection('cobradores').get();
    //return  await response.send(request.query.all);

    switch (request.method) {
      case 'GET':
        if (request.query.doc === 'todos') {
          let cobradores = [];

          if (snapshot.empty) {
            return response.send('Not Found');
          } else {
            snapshot.forEach(doc => {
              let id = doc.id;
              let datadocument = doc.data();
              datadocument.id=id;
              cobradores.push(datadocument);
              // cobradores.push({
              //         id: doc.id,
              //         data: doc.data()
              //     });
            });
            return response.status(200).send(JSON.stringify(cobradores));
          }
        } else {
          if (request.query.sub) {
            let datasubcolltion = [];

            const collections = await db.collection('cobradores').doc(request.query.doc).listCollections();
            const collectionIds = collections.map(col => col.id);

            const docRef = await db.collection('cobradores').doc(request.query.doc).collection(request.query.sub).get()
              .then(snapshot => {
                snapshot.forEach(doc => {
                  let id = doc.id;
                  let datadocument = doc.data();
                  //cobradores.push(id,datadocument);
                  datasubcolltion.push({
                    id: doc.id,
                    data: doc.data(),
                    collectiosId:collectionIds
                  });


                });

                

                return response.status(200).send(JSON.stringify(datasubcolltion));
              })
              .catch(err => {
                return response.send('Error getting document', err).end();
              });
          } else {

            const docRef = await db.collection('cobradores').doc(request.query.doc).get()
              .then(doc => {
                if (!doc.exists) {

                  return response.send('Not Found')
                }

                return response.status(200).send(JSON.stringify(doc.data())).end();
              })
              .catch(err => {
                return response.send('Error getting document', err).end();
              });
          }
          //}
        }

        break;
      case 'POST':
        //response.status(200).send(request.body);
        await db.collection('cobradores').add({
          Nombre: request.body.nombre,
          Apellido: request.body.apellido,
          Direccion1: request.body.direccion1,
          Direccion2: request.body.direccion2,
          Identificacion: request.body.identificacion,
          Telefono: request.body.telefono,
          Zona:request.body.zona,
          Empresa:request.body.empresa
        }).then((ref) => {
          // db.collection('cobradores').doc(ref.id).collection("Clientes").set({'hola':'fg'});
          return response.send(ref.id);
        }).catch((error) => {
          return response.status(500).send(error);
        });

        break;
      case 'PUT':
        await db.collection('cobradores').doc(request.query.doc).set(request.body, { merge: true })
          .then(() => response.json(request.query.doc))
          .catch((error) => response.status(500).send(error))
        break;
      case 'DELETE':

        await db.collection('cobradores').doc(request.query.doc).delete()
          .then(() => res.status(204).send("Document successfully deleted!"))
          .catch((error) => {
            return response.status(500).send(error);
          });
        return response.send(request.method);
      default:

        break;
    }
  } catch (err) {
    return response.send('Error getting document', err);

  }
  return response.status(200).send('ok').end();
});


/**
 * @function Funcion que se encarga de manajar los end-point de Empresas.
 * @param request
 * @param response
 * @param body
 */
exports.Empresas = functions.https.onRequest(async (request, response, body) => {
  //response.send("Hello from Firebase!");
  //response.status(200).send(request.body);
  response.set('Access-Control-Allow-Origin', '*');
  response.set('Access-Control-Allow-Credentials', 'true'); // vital
  response.set('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'DELETE', 'OPTIONS');
  response.set('Access-Control-Allow-Headers', 'Content-Type');
  response.set('Access-Control-Allow-Headers', 'Content-Length,Content-Range');
  response.set('Access-Control-Allow-Headers', 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization');
  try {
    const snapshot = await db.collection('empresas').get();
    //return  await response.send(request.query.all);

    switch (request.method) {
      case 'GET':
        if (request.query.doc === 'todos') {
          let empresas = [];

          if (snapshot.empty) {
            return response.send('Not Found');
          } else {
            snapshot.forEach(doc => {
              let id = doc.id;
              let datadocument = {
                'id': id,
                'Nombre': doc.data().Nombre,
                'Balance': doc.data().Balance
              };
              empresas.push(datadocument);
              // users.push({
              //         id: doc.id,
              //         data: doc.data()
              //     });
            });
            return response.status(200).send(JSON.stringify(empresas));
          }
        } else {
          const docRef = await db.collection('empresas').doc(request.query.doc).get()
            .then(doc => {
              if (!doc.exists) {

                return response.send('Not Found')
              }

              return response.status(200).send(JSON.stringify(doc.data())).end();
            })
            .catch(err => {
              return response.send('Error getting document', err).end();
            });
        }

        break;
      case 'POST':
        //response.status(200).send(request.body);

        await db.collection('empresas').add({
          Nombre: request.body.nombre,
          Balance: request.body.balance
        }).then(() => {
          return response.send('Empresas registrada');
        }).catch((error) => {
          return response.status(500).send(error);
        });

        break;
      case 'PUT':
        await db.collection('empresas').doc(request.query.doc).set(request.body, { merge: true })
          .then(() => response.json(request.query.doc))
          .catch((error) => response.status(500).send(error))
        break;
      case 'DELETE':

        await db.collection('empresas').doc(request.query.doc).delete()
          .then(() => res.status(204).send("Document successfully deleted!"))
          .catch((error) => {
            return response.status(500).send(error);
          });
        return response.send(request.method);
      default:

        break;
    }
  } catch (err) {
    return response.send('Error getting document', err);

  }
  return response.status(200).send('ok').end();
});

/**
 * @function Funcion que se encarga de manajar los end-point de Clientes.
 * @param request
 * @param response
 * @param body
 * @description Metodos GET,POST,PUT,ELETE.
 */
exports.Rutas = functions.https.onRequest(async (request, response, body) => {
  //response.send("Hello from Firebase!");
  response.set('Access-Control-Allow-Origin', '*');
  response.set('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  response.set('Access-Control-Allow-Credentials', 'true'); // vital
  response.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  try {
    const snapshot = await db.collection('rutas').get();
    //return  await response.send(request.query.all);

    switch (request.method) {
      case 'GET':
        if (request.query.doc === 'todos') {
          let rutas = [];

          if (snapshot.empty) {
            return response.send('Not Found');
          } else {
            snapshot.forEach(doc => {
              let id = doc.id;
              let datadocument = doc.data();
              //clientes.push(id,{id},data:{datadocument});
              rutas.push({
                id: doc.id,
                data: doc.data()
              });
            });
            return response.status(200).send(JSON.stringify(rutas));
          }
        } else {
          const docRef = await db.collection('rutas').doc(request.query.doc).get()
            .then(doc => {
              if (!doc.exists) {

                return response.send('Not Found')
              }

              return response.status(200).send(JSON.stringify(doc.data())).end();
            })
            .catch(err => {
              return response.send('Error getting document', err).end();
            });
        }

        break;
      case 'POST':

        await db.collection('rutas').add({
          Nombre: request.body.nombre,
          fecha_creacion: request.body.fecha,
          balance: request.body.balance
        }).then(() => {
          return response.send('Ruta registrada');
        }).catch((error) => {
          return response.status(500).send(error);
        });

        break;
      case 'PUT':
        await db.collection('rutas').doc(request.query.doc).set(request.body, { merge: true })
          .then(() => response.json(request.query.doc))
          .catch((error) => response.status(500).send(error))
        break;
      case 'DELETE':

        await db.collection('rutas').doc(request.query.doc).delete()
          .then(() => res.status(204).send("Document successfully deleted!"))
          .catch((error) => {
            return response.status(500).send(error);
          });
        return response.send(request.method);
      default:

        break;
    }
  } catch (err) {
    return response.send('Error getting document', err);

  }
  return response.status(200).send('ok').end();
});
/**
 * @function Funcion que se encarga de manajar los end-point de Clientes.
 * @param request
 * @param response
 * @param body
 * @description Metodos GET,POST,PUT,ELETE.
 */
exports.Clientes = functions.https.onRequest(async (request, response, body) => {
  //response.send("Hello from Firebase!");
  response.set('Access-Control-Allow-Origin', '*');
  response.set('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  response.set('Access-Control-Allow-Credentials', 'true'); // vital
  response.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  try {
    const snapshot = await db.collection('clientes').get();
    //return  await response.send(request.query.all);

    switch (request.method) {
      case 'GET':
        if (request.query.doc === 'todos') {
          let clientes = [];

          if (snapshot.empty) {
            return response.send('Not Found');
          } else {
            snapshot.forEach(doc => {
              let id = doc.id;
              let datadocument = doc.data();
              //clientes.push(id,{id},data:{datadocument});
              clientes.push({
                id: doc.id,
                data: doc.data()
              });
            });
            return response.status(200).send(JSON.stringify(clientes));
          }
        } else {
          const docRef = await db.collection('clientes').doc(request.query.doc).get()
            .then(doc => {
              if (!doc.exists) {

                return response.send('Not Found')
              }

              return response.status(200).send(JSON.stringify(doc.data())).end();
            })
            .catch(err => {
              return response.send('Error getting document', err).end();
            });
        }

        break;
      case 'POST':

        await db.collection('clientes').add({
          Nombre: request.body.nombre,
          Apellido: request.body.apellido,
          Direccion1: request.body.direccion1,
          Direccion2: request.body.direccion2,
          Identificacion: request.body.identificacion,
          Oficio: request.body.oficio
        }).then(() => {
          return response.send('cliente registrado');
        }).catch((error) => {
          return response.status(500).send(error);
        });

        break;
      case 'PUT':
        await db.collection('clientes').doc(request.query.doc).set(request.body, { merge: true })
          .then(() => response.json(request.query.doc))
          .catch((error) => response.status(500).send(error))
        break;
      case 'DELETE':

        await db.collection('clientes').doc(request.query.doc).delete()
          .then(() => res.status(204).send("Document successfully deleted!"))
          .catch((error) => {
            return response.status(500).send(error);
          });
        return response.send(request.method);
      default:

        break;
    }
  } catch (err) {
    return response.send('Error getting document', err);

  }
  return response.status(200).send('ok').end();
});
/**
 * @function Funcion que se encarga de manajar los end-point de Usuarios.
 * @param request
 * @param response
 * @param body
 */
exports.Usuarios = functions.https.onRequest(async (request, response, body) => {
  //response.send("Hello from Firebase!");
  try {
    const snapshot = await db.collection('usuarios').get();
    //return  await response.send(request.query.all);

    switch (request.method) {
      case 'GET':
        if (request.query.doc === 'todos') {
          let users = [];

          if (snapshot.empty) {
            return response.send('Not Found');
          } else {
            snapshot.forEach(doc => {
              let id = doc.id;
              let datadocument = doc.data();
              users.push(id, datadocument);
              // users.push({
              //         id: doc.id,
              //         data: doc.data()
              //     });
            });
            return response.status(200).send(JSON.stringify(users));
          }
        } else {
          const docRef = await db.collection('usuarios').doc(request.query.doc).get()
            .then(doc => {
              if (!doc.exists) {

                return response.send('Not Found')
              }

              return response.status(200).send(JSON.stringify(doc.data())).end();
            })
            .catch(err => {
              return response.send('Error getting document', err).end();
            });
        }

        break;
      case 'POST':
        //response.status(200).send(request.body);

        await db.collection('usuarios').add({
          Nombre: request.body.nombre,
          Apellido: request.body.apellido,
          Direccion1: request.body.direccion1,
          Direccion2: request.body.direccion2,
          Identificacion: request.body.identificacion,
          Oficio: request.body.oficio
        }).then(() => {
          return response.send('Usuario registrado');
        }).catch((error) => {
          return response.status(500).send(error);
        });

        break;
      case 'PUT':
        await db.collection('usuarios').doc(request.query.doc).set(request.body, { merge: true })
          .then(() => response.json(request.query.doc))
          .catch((error) => response.status(500).send(error))
        break;
      case 'DELETE':

        await db.collection('usuarios').doc(request.query.doc).delete()
          .then(() => res.status(204).send("Document successfully deleted!"))
          .catch((error) => {
            return response.status(500).send(error);
          });
        return response.send(request.method);
      default:

        break;
    }
  } catch (err) {
    return response.send('Error getting document', err);

  }
  return response.status(200).send('ok').end();
});


exports.addEmpresa = functions.https.onRequest((request, response, body) => {
  //response.send("Hello from Firebase!");
  const empresa = request.body;
  try {
    db.collection('empresas').add(empresa);
    return response.send('ok');
  } catch (error) {
    return response.send('Error getting document', error);
  }
});

exports.getEmpresasActive = functions.https.onRequest((request, response, body) => {
  //response.send("Hello from Firebase!");


  // Create a reference to the cities collection
  let citiesRef = db.collection('empresas');

  // Create a query against the collection
  let queryRef = citiesRef.where('activo', '==', 'true').get()
    .then(snapshot => {
      let datadocumnts = [];
      if (snapshot.empty) {
        datadocumnts.push('No matching documents.');
      }
      snapshot.forEach(doc => {
        let id = doc.id;
        let data = doc.data();
        datadocumnts[id] = data;
      });
      return response.status(200).send(JSON.stringify(datadocumnts));


    })
    .catch(err => {
      return response.send('Error getting document', err);
    });
});

/**
 * @function Funcion que devuelve todas las sonas de la empresa.
 */
exports.getTazaseInteres = functions.https.onRequest(async (request, response, body) => {
  response.set('Access-Control-Allow-Origin', '*');
  response.set('Access-Control-Allow-Credentials', 'true'); // vital
  response.set('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'DELETE', 'OPTIONS');
  response.set('Access-Control-Allow-Headers', 'Content-Type');
  response.set('Access-Control-Allow-Headers', 'Content-Length,Content-Range');
  response.set('Access-Control-Allow-Headers', 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization');
  
  let cobradores = [];
  const snapshot = await db.collection('parametros_cobros').get();
            if (snapshot.empty) {
            return response.send('Not Found');
          } else {
            snapshot.forEach(doc => {
              // let id = doc.id;
              // let datadocument = doc.data();
              // datadocument.id=id;
              // cobradores.push(datadocument);
              cobradores.push({
                      id: doc.id,
                      data: doc.data()
                  });
            });
            return response.status(200).send(JSON.stringify(cobradores));
          }
});