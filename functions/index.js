const functions = require('firebase-functions');
const admin = require('firebase-admin');
const util = require('util')
const cors = require('cors')({ origin: true });


admin.initializeApp(functions.config().firebase);
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

const db = admin.firestore();


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
                  datasubcolltion.push({id,datadocument});
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




exports.EmpresasGuardarZonas = functions.https.onRequest(async (request, response, body) => {
  response.set('Access-Control-Allow-Origin', '*');
  response.set('Access-Control-Allow-Credentials', 'true'); // vital
  response.set('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'DELETE', 'OPTIONS');
  response.set('Access-Control-Allow-Headers', 'Content-Type');
  response.set('Access-Control-Allow-Headers', 'Content-Length,Content-Range');
  response.set('Access-Control-Allow-Headers', 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization');

try {
  await db.collection('empresas').doc(request.query.doc).collection(request.query.sub).add(request.body)
  return response.status(200).send('ok').end();
} catch (error) {
  return response.status(500).send(err).end();
}

//   let cityRef = db.collection('empresas').doc(request.query.doc);


//   let transaction = db.runTransaction(t => {
//    return cors(req, res, () => {
//   // ...
//   return t.get(cityRef)
//       .then(doc => {
//         if (doc.get('Balance') > 0) {
//           // db.collection('empresas').doc(request.query.doc).collection(request.query.sub).add(request.body);
//           t.update(cityRef, { Balance: nb }); //actualizamos la infomacion.
//           return res.status(200).send('ok').end();
//         }
//         else {
//           return res.status(200).send('0').end();
//         }


//       });
//   }).then(result => {
//     return res.status(200).send('ok').end();
//   }).catch(err => {
//     return res.status(500).send(err).end();
//   });
// });
    

});

exports.CobradoresGuardarClientes = functions.https.onRequest(async (request, response, body) => {
  response.set('Access-Control-Allow-Origin', '*');
  response.set('Access-Control-Allow-Credentials', 'true'); // vital
  response.set('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'DELETE', 'OPTIONS');
  response.set('Access-Control-Allow-Headers', 'Content-Type');
  response.set('Access-Control-Allow-Headers', 'Content-Length,Content-Range');
  response.set('Access-Control-Allow-Headers', 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization');

  await db.collection('cobradores').doc(request.query.doc).collection(request.query.sub).add(request.body).then(() => {
    return response.send('Cliente registrado.');
  }).catch((error) => {
    return response.status(500).send(error);
  });
});

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


exports.CobradoresGuardarCobros = functions.https.onRequest(async (request, response, body) => {
  await db.collection('cobradores').doc(request.query.doc).collection(request.query.sub).add({
    Cliente: request.body.cliente,
    Valor_cobro: request.body.valor_cobro,
    fecha_creacion: request.body.fecha_creacion
  }).then(() => {
    return response.send('Cobro registrado.');
  }).catch((error) => {
    return response.status(500).send(error);
  });
});

exports.CobradoresGuardarPrestamos = functions.https.onRequest(async (request, response, body) => {
  await db.collection('cobradores').doc(request.query.doc).collection(request.query.sub).add({
    Cliente: request.body.cliente,
    Valor_prestado: request.body.valor_prestado,
    fecha_creacion: request.body.fecha_creacion
  }).then(() => {
    return response.send('Prestamo registrado.');
  }).catch((error) => {
    return response.status(500).send(error);
  });
});

exports.CobradoresGuardarRutas = functions.https.onRequest(async (request, response, body) => {
  response.set('Access-Control-Allow-Origin', '*');
  response.set('Access-Control-Allow-Credentials', 'true'); // vital
  response.set('Access-Control-Allow-Methods', 'GET,POST', 'PUT', 'DELETE', 'OPTIONS');
  response.set('Access-Control-Allow-Headers', 'Content-Type');
  response.set('Access-Control-Allow-Headers', 'Content-Length,Content-Range');
  response.set('Access-Control-Allow-Headers', 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization');
  await db.collection('cobradores').doc(request.query.doc).collection(request.query.sub).add({
    Nombre: request.body.nombre,
    Descripcion: request.body.descripcion,
    fecha_creacion: request.body.fecha_creacion
  }).then(() => {
    return response.send('Ruta registrada.');
  }).catch((error) => {
    return response.status(500).send(error);
  });
});


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
            const docRef = await db.collection('cobradores').doc(request.query.doc).collection(request.query.sub).get()
              .then(snapshot => {
                snapshot.forEach(doc => {
                  let id = doc.id;
                  let datadocument = doc.data();
                  //cobradores.push(id,datadocument);
                  datasubcolltion.push({
                    id: doc.id,
                    data: doc.data()
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
          Telefono: request.body.telefono
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

exports.getData = functions.https.onRequest((request, response) => {
  const docRef = db.collection('usuarios').doc('usuario1');
  const getDoc = docRef.get()
    .then(doc => {
      if (!doc.exists) {
        console.log('No such document!');
        return response.send('Not Found')
      }
      console.log(doc.data());
      return response.status(200).send(JSON.stringify(doc.data()));
    })
    .catch(err => {
      return response.send('Error getting document', err);
    });
});

exports.getDataDocumentUsuarios = functions.https.onRequest(async (request, response) => {
  response.set('Access-Control-Allow-Origin', '*');
  response.set('Access-Control-Allow-Credentials', 'true'); // vital

});

