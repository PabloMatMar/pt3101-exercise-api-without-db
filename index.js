//A LA CARGAAAA
const { randFirstName } = require("@ngneat/falso");
const express = require("express");
const app = express();
const primaryObject = require('./original/users_original.json')

const PORT = 3000;

app.use(express.json());

// 1- Crea el endpoint /users (GET) que devuelva todos los usuarios

app.get('/users', (req, res) => {
  res.send(primaryObject)
  console.log("Respondiendo a GET USERS")
})

app.get('/users/:search', (req, res) => {
  //cambiar username de req.params por search
  const param = req.params.search;
  const arrNation = [];
  const arrVehicles = [];
  const arrFood = [];
  const uniquesFoods = [];
  const repeatFoods = [];
  const usersCars = [];
  let num = 0;
  let cont = 0;
  const { max, min, fuel, manufacturer, model } = req.query

  for (let i = 0; i < primaryObject.length; i++) {
    const nation = primaryObject[i].address.country.split(' ').join('')
    const numVehicles = primaryObject[i].vehicles

    // 2- Crea el endpoint /users/:username (GET) que devuelva un único usuario en base al username (si hubiera varios, devuelve solo el primero)

    if (primaryObject[i].username === param) {
      res.send(primaryObject[i])
      num = 1
      console.log("Respondiendo a GET UNIC USER")
    }

    // 3- Crea el endpoint /users/total (GET) para devolver el total de usuarios

    else if (i === 0 && param === "total") {
      res.send(`El total de usuarios en el sistema es ${primaryObject.length}`)
      console.log("Respondiendo a GET TOTAL USERS")
      num = 1
    }

    //5  Crea el endpoint /users/vehicles (GET) para obtener email, username e imagen de los usuarioss que tengan un mínimo y un máximo de vehículos (req.query min y max)

    else if (min <= numVehicles.length && numVehicles.length <= max && param === "vehicles" || i === primaryObject.length - 1 && param === "vehicles" && min && max) {
      arrVehicles.push({ username: primaryObject[i].username, email: primaryObject[i].email, img: primaryObject[i].img })
      if (arrVehicles.length > 0 && i === primaryObject.length - 1) {
        res.send(arrVehicles)
        num = 1
        console.log("Respondiendo a GET USERS FOR NUMBER OF VEHICLES")
      }
    }

    //6- Crea el endpoint /users/:food (GET) para devolver todos los usuarios con una comida favorita en concreto a través de params

    //usar else if(param.typeOf("")) en lugar de la funcion para asi poder eliminar la let num
    function checkFood() {
      for (let j = 0; j < primaryObject[i].favouritesFood.length; j++) {
        if (param === primaryObject[i].favouritesFood[j].split(' ').join('').toLocaleLowerCase()) {
          arrFood.push(primaryObject[i])

        }
        if (arrFood.length > 0 && i === primaryObject.length - 1 && j === primaryObject[i].favouritesFood.length - 1) {
          res.send(arrFood)
          num = 1
          console.log("Respondiendo a GET FOOD")
          return num
        }
      }
    }
    checkFood()

    //7- Crea el endpoint /foods (GET) para devolver una lista de todas las comidas registradas UNICAS de todos los usuarios

    if (param === "foods") {
      for (let c = 0; c < primaryObject[i].favouritesFood.length; c++) {
        if (uniquesFoods.includes(primaryObject[i].favouritesFood[c])) {
          const pointSplice = uniquesFoods.indexOf(primaryObject[i].favouritesFood[c])
          uniquesFoods.splice(pointSplice, pointSplice)
          repeatFoods.push(primaryObject[i].favouritesFood[c])
        }
        if (!repeatFoods.includes(primaryObject[i].favouritesFood[c])) {
          uniquesFoods.push(primaryObject[i].favouritesFood[c])
        }
        if (uniquesFoods.length > 0 && i === primaryObject.length - 1 && c === primaryObject[i].favouritesFood.length - 1) {
          res.send(uniquesFoods)
          num = 1
          console.log("Respondiendo a GET FOODS")
        }
      }
    }

    //8 - Crea el endpoint /users/vehicles (GET) para obtener email, username e imagen de los usuarios que tenga, al menos, un coche con los detalles pasados por query string (fuel, manufacturer y/o model. Si están los 3 se filtra por los 3, si falta alguno, se filtra solo por los que existen. Si no hay ninguno, se saca la información de los usuarios que NO TIENEN COCHES)

    if (cont === i && primaryObject[i].vehicles.length === 0) {
      usersCars.push({ username: primaryObject[i].username, email: primaryObject[i].email, img: primaryObject[i].img })
      cont++
    }
    for (let v = 0; v < primaryObject[i].vehicles.length; v++) {
      if (param === "vehicles") {
        if (cont === i) {
          if (fuel === primaryObject[i].vehicles[v].fuel.toLocaleLowerCase() && manufacturer === primaryObject[i].vehicles[v].manufacturer.toLocaleLowerCase() && model === primaryObject[i].vehicles[v].model.toLocaleLowerCase()) {
            usersCars.push({ username: primaryObject[i].username, email: primaryObject[i].email, img: primaryObject[i].img })
            cont++
          }
          else if (fuel === primaryObject[i].vehicles[v].fuel.toLocaleLowerCase() || manufacturer === primaryObject[i].vehicles[v].manufacturer.toLocaleLowerCase() || model === primaryObject[i].vehicles[v].model.toLocaleLowerCase()) {
            usersCars.push({ username: primaryObject[i].username, email: primaryObject[i].email, img: primaryObject[i].img })
            cont++
          }
          else if(cont===i && v === primaryObject[i].vehicles.length-1) {
            cont++
          }
        }
        if (i === primaryObject.length - 1 && v === primaryObject[i].vehicles.length-1) {
          res.send(usersCars)
          num = 1
        }
      }
    }

    // 4- Crea el endpoint /users/:country (GET) para devolver todos los usuarios de un país en concreto recibido por params

    if (nation.toLowerCase() === param || i === primaryObject.length - 1 && num === 0) {
      if (nation.toLowerCase() === param) {
        arrNation.push({ user: primaryObject[i] })
      }
      if (i === primaryObject.length - 1) {
        if (arrNation.length > 0) {
          res.send(arrNation)
          console.log("Respondiendo a GET COUNTRY")
        }
        else {
          res.send("Busqueda no encontrada o mal realizada.")
          console.log("Respondiendo con RESPUESTA NO ENCONTRADA")
        }
      }
    }
  }
})

app.listen(PORT, () => {
  console.info(`> Estoy arribísima en el puerto ${PORT}! ✨🦄`);
});




// Crea el endpoint /users/vehicles (GET) para obtener email, username e imagen de los usuarios que tenga, al menos, un coche con los detalles pasados por query string (fuel, manufacturer y/o model. Si están los 3 se filtra por los 3, si falta alguno, se filtra solo por los que existen. Si no hay ninguno, se saca la información de los usuarios que NO TIENEN COCHES)
// Crea el endpoint /vehicles (GET) para obtener la lista de coches únicos totales, junto con el total de ellos en base al tipo de combustible (recibido por query strings ?fuel=diesel, por ejemplo). Si no se pasa ningún tipo de combustibles, se buscan por todo tipo de combustibles
// Crea el endpoint /users (POST) para recibir información en req.body para crear un usuario nuevo. Evita que se puedan crear usuarios si no hay, en req.body: email, firstname, lastname y username. Genera el id automáticamente (v4) (paquete uuid, más info en: https://www.npmjs.com/package/uuid). El resto de campos, si no están, crealos vacíos
// Crea el endpoint /users/:username (PUT) para obtener información del usuario a través de req.body (menos el id, los vehículos, los alimentos y el campo deleted) y actualiza dicho usuario
// Crea el endpoint /users/:username/vehicles (PUT) para obtener una lista de vehículos en req.body (puede ser uno o muchos. Si no es ninguno, que no haga nada) y añádelos a los existentes del usuario específico (usuario a través de params)
// Crea el endpoint /users/:username/foods (PUT) para obtener una lista de alimentos en req.body, junto con el nombre del usuario por params y añade la lista de dichos alimentos a la lista de comidas favoritas de dicho usuario. Si no se recibe ningún alimento, se eliminan todos los que tienen
// Crea el endpoint /users/:username/hide (PUT) para recibir el email en req.body y cambiar la visibilidad de ese usuario para que no aparezca si se busca (se entenderá como borrado para el mismo usuario)
// Crea el endpoint /user/:username (DELETE) para recibir en req.body el email y elimina definitivamente dicho usuario de la lista. Devuelve el usuario borrado. IMPORTANTE! Solo se puede borrar si el campo deleted está a true. Si no, devolverá un error




// app.get('/users/vehicles', (req, res) => {
//   const { a, b } = req.query
//   const arrVehicles = [];
//   for (let j = 0; j < primaryObject.length; j++) {
//     const numVehicles = primaryObject[j].vehicles
//     // console.log(numVehicles.length)
//     console.log(numVehicles.length)

//     if (b <= numVehicles.length && numVehicles.length <= a) {
//       arrVehicles.push({ user: primaryObject[j] })

//     }
//     if (arrVehicles.length > 0 && j === primaryObject.length - 1) {
//       res.send(arrVehicles)
//       console.log("Llamando a la ruta GET vehicles")
//     }
//     // } else {
//     //   res.send("No se encontro usuario entre los parametros especificados")
//     // }
//   }
// })


    // else if (i === primaryObject.length - 1 && primaryObject[num].address.country.split(' ').join('').toLocaleLowerCase() !== param && primaryObject[num].username !== param) {
    //   res.send("El usuario no existe, comprueba si has escrito bien su nombre")
    // }