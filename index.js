const { randFirstName } = require("@ngneat/falso");
const express = require("express");
const app = express();
const primaryObject = require('./original/users_original.json')
const { v4: uuidv4 } = require('uuid');
uuidv4();
// Módulos de Rutas
const getRoutes = require('./routes/getRoutes');
const getParamsAndQueryRoutes = require('./routes/getAllRoutes');
const getUnicVehicle = require('./routes/getVehiclesRoutes');
const post = require('./routes/postRoutes');
const putUserRouter = require('./routes/putUserRoutes')




const PORT = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//Rutas 

app.get('/users/prueba/:texto', (req,res)=>{
  res.status(200).json(req.params)
})
//Primer get
app.use('/users',getRoutes);
//Gets desde el segundo hasta el septimo
app.use('/users', getParamsAndQueryRoutes);
//Octavo get
app.use('/vehicles?', getUnicVehicle);
//post
app.use('/users', post);
//put campos del usuario menos delete, vehicles y addres
app.use('/users', putUserRouter)

// 1- Crea el endpoint /users (GET) que devuelva todos los usuarios



// app.get('/users', (req, res) => {
//   res.send(primaryObject)
//   console.log("Respondiendo a GET USERS")
// })

// app.get('/users/:search', (req, res) => {
//   //cambiar username de req.params por search
//   const param = req.params.search;
//   const arrNation = [];
//   const arrVehicles = [];
//   const arrFood = [];
//   const uniquesFoods = [];
//   const repeatFoods = [];
//   let usersCars = [];
//   let num = 0;
//   let cont = 0;
//   const { max, min, fuel, manufacturer, model } = req.query

//   for (let i = 0; i < primaryObject.length; i++) {
//     const nation = primaryObject[i].address.country.split(' ').join('')
//     const numVehicles = primaryObject[i].vehicles

//     // 2- Crea el endpoint /users/:username (GET) que devuelva un único usuario en base al username (si hubiera varios, devuelve solo el primero)

//     if (primaryObject[i].username === param) {
//       res.send(primaryObject[i])
//       num = 1
//       console.log("Respondiendo a GET UNIC USER")
//     }

//     // 3- Crea el endpoint /users/total (GET) para devolver el total de usuarios

//     else if (i === 0 && param === "total") {
//       res.send(`El total de usuarios en el sistema es ${primaryObject.length}`)
//       console.log("Respondiendo a GET TOTAL USERS")
//       num = 1
//     }

//     //5  Crea el endpoint /users/vehicles (GET) para obtener email, username e imagen de los usuarioss que tengan un mínimo y un máximo de vehículos (req.query min y max)

//     else if (min <= numVehicles.length && numVehicles.length <= max && param === "vehicles" || i === primaryObject.length - 1 && param === "vehicles" && min && max) {
//       arrVehicles.push({ username: primaryObject[i].username, email: primaryObject[i].email, img: primaryObject[i].img })
//       if (arrVehicles.length > 0 && i === primaryObject.length - 1) {
//         res.send(arrVehicles)
//         num = 1
//         console.log("Respondiendo a GET USERS FOR NUMBER OF VEHICLES")
//       }
//     }

//     //6- Crea el endpoint /users/:food (GET) para devolver todos los usuarios con una comida favorita en concreto a través de params

//     //usar else if(param.typeOf("")) en lugar de la funcion para asi poder eliminar la let num
//     function checkFood() {
//       for (let j = 0; j < primaryObject[i].favouritesFood.length; j++) {
//         if (param === primaryObject[i].favouritesFood[j].split(' ').join('').toLocaleLowerCase()) {
//           arrFood.push(primaryObject[i])

//         }
//         if (arrFood.length > 0 && i === primaryObject.length - 1 && j === primaryObject[i].favouritesFood.length - 1) {
//           res.send(arrFood)
//           num = 1
//           console.log("Respondiendo a GET FOOD")
//           return num
//         }
//       }
//     }
//     checkFood()

//     //7- Crea el endpoint /foods (GET) para devolver una lista de todas las comidas registradas UNICAS de todos los usuarios

//     if (param === "foods") {
//       for (let c = 0; c < primaryObject[i].favouritesFood.length; c++) {
//         if (uniquesFoods.includes(primaryObject[i].favouritesFood[c])) {
//           const pointSplice = uniquesFoods.indexOf(primaryObject[i].favouritesFood[c])
//           uniquesFoods.splice(pointSplice, pointSplice)
//           repeatFoods.push(primaryObject[i].favouritesFood[c])
//         }
//         if (!repeatFoods.includes(primaryObject[i].favouritesFood[c])) {
//           uniquesFoods.push(primaryObject[i].favouritesFood[c])
//         }
//         if (uniquesFoods.length > 0 && i === primaryObject.length - 1 && c === primaryObject[i].favouritesFood.length - 1) {
//           res.send(uniquesFoods)
//           num = 1
//           console.log("Respondiendo a GET FOODS")
//         }
//       }
//     }

//     //8 - Crea el endpoint /users/vehicles (GET) para obtener email, username e imagen de los usuarios que tenga, al menos, un coche con los detalles pasados por query string (fuel, manufacturer y/o model. Si están los 3 se filtra por los 3, si falta alguno, se filtra solo por los que existen. Si no hay ninguno, se saca la información de los usuarios que NO TIENEN COCHES)

//     if (param === "vehicles" && fuel || manufacturer || model) {
//       if (cont === i && primaryObject[i].vehicles.length === 0) {
//         usersCars.push({ username: primaryObject[i].username, email: primaryObject[i].email, img: primaryObject[i].img })
//         cont++
//       }
//       for (let v = 0; v < primaryObject[i].vehicles.length; v++) {
//         if (cont === i) {
//           if (fuel === primaryObject[i].vehicles[v].fuel.split(' ').join('') && manufacturer === primaryObject[i].vehicles[v].manufacturer.split(' ').join('') && model === primaryObject[i].vehicles[v].model.split(' ').join('')) {

//             usersCars.push({ username: primaryObject[i].username, email: primaryObject[i].email, img: primaryObject[i].img })
//             cont++
//           }
//           else if (fuel === primaryObject[i].vehicles[v].fuel.split(' ').join('') || manufacturer === primaryObject[i].vehicles[v].manufacturer.split(' ').join('') || model === primaryObject[i].vehicles[v].model.split(' ').join('')) {
//             usersCars.push({ username: primaryObject[i].username, email: primaryObject[i].email, img: primaryObject[i].img })
//             cont++
//           }
//           else if (cont === i && v === primaryObject[i].vehicles.length - 1) {
//             cont++
//           }
//         }
//         if (i === primaryObject.length - 1 && v === primaryObject[i].vehicles.length - 1) {
//           res.send(usersCars)
//           console.log("Respondiendo a GET USER FOR PARAMS OF HIS CARS")
//           num = 1
//         }
//       }
//     }



//     // 4- Crea el endpoint /users/:country (GET) para devolver todos los usuarios de un país en concreto recibido por params

//     if (nation.toLowerCase() === param || i === primaryObject.length - 1 && num === 0) {
//       if (nation.toLowerCase() === param) {
//         arrNation.push({ user: primaryObject[i] })
//       }
//       if (i === primaryObject.length - 1) {
//         if (arrNation.length > 0) {
//           res.send(arrNation)
//           console.log("Respondiendo a GET COUNTRY")
//         }
//         else {
//           res.send("Busqueda no encontrada o mal realizada.")
//           console.log("Respondiendo con RESPUESTA NO ENCONTRADA")
//         }
//       }
//     }
//   }
// })


//9- Crea el endpoint /vehicles (GET) para obtener la lista de coches únicos totales, junto con el total de ellos en base al tipo de combustible (recibido por query strings ?fuel=diesel, por ejemplo). Si no se pasa ningún tipo de combustibles, se buscan por todo tipo de combustibles

// app.get('/vehicles?', (req, res) => {

//   const uniquesVehicles = []
//   const repeatVehicles = []
//   const { fuel } = req.query
//   for (let i = 0; i < primaryObject.length; i++) {
//     for (let c = 0; c < primaryObject[i].vehicles.length; c++) {
//       if (fuel === primaryObject[i].vehicles[c].fuel || !fuel) {
//         if (uniquesVehicles.includes(primaryObject[i].vehicles[c])) {
//           const pointSplice = uniquesVehicles.indexOf(primaryObject[i].vehicles[c])
//           uniquesVehicles.splice(pointSplice, 1)
//           repeatVehicles.push(primaryObject[i].vehicles[c])
//         }
//         if (!repeatVehicles.includes(primaryObject[i].vehicles[c])) {
//           uniquesVehicles.push(primaryObject[i].vehicles[c])
//         }
//       }
//       if (uniquesVehicles.length > 0 && i === primaryObject.length - 1 && c === primaryObject[i].vehicles.length - 1) {
//         res.send(uniquesVehicles)
//         console.log("Respondiendo a GET VEHICLES")
//       }
//       else if (i === primaryObject.length - 1 && c === primaryObject[i].vehicles[c].length - 1) {
//         res.send("Busqueda no encontrada o mal realizada.")
//         console.log("Respondiendo con RESPUESTA NO ENCONTRADA")

//       }
//     }
//   }
// })

// Crea el endpoint /users (POST) para recibir información en req.body para crear un usuario nuevo. Evita que se puedan crear usuarios si no hay, en req.body: email, firstname, lastname y username. Genera el id automáticamente (v4) (paquete uuid, más info en: https://www.npmjs.com/package/uuid). El resto de campos, si no están, crealos vacíos

// app.post('/users', (req, res) => {
//   function createUsers() {
//     const { email, firstName, lastName, phone, imagen, username, address, vehicles, favouritesFood } = req.body
//     const newUser = {
//       id: uuidv4(),
//       email: email,
//       firstName: firstName,
//       lastName: lastName,
//       phone: phone || "",
//       img: imagen || "",
//       username: username,
//       address: address || {},
//       vehicles: vehicles || [],
//       favouritesFood: favouritesFood || [],
//       deleted: false
//     }
//     if (email && firstName && lastName && username) {
//       primaryObject.push(newUser)
//       return (primaryObject)
//     } else {
//       return ("Se requieren campos")
//     }
//   }
//   const data = createUsers()
//   res.json(data)
//   console.log("Respondiendo a POST USERS")
// })

//11 - Crea el endpoint /users/:username (PUT) para obtener información del usuario a través de req.body (menos el id, los vehículos, los alimentos y el campo deleted) y actualiza dicho usuario
// app.put('/users/:username', (req, res) => {
//   let num = 0;
//   for (let i = 0; i < primaryObject.length; i++) {
//     const param = req.params.username;
//     const { email, firstName, lastName, phone, img, username, address } = req.body;
//     if (param === primaryObject[i].username.toString()) {
//       primaryObject[i].email = email;
//       primaryObject[i].firstName = firstName;
//       primaryObject[i].lastName = lastName;
//       primaryObject[i].phone = phone;
//       primaryObject[i].img = img;
//       primaryObject[i].username = username;
//       primaryObject[i].address = address;
//       res.json(primaryObject[i])
//       console.log("Respondiendo a PUT USERNAME")
//       num = 1;

//     }
//     if (i === primaryObject.length - 1 && num === 0) {
//       res.json("Usuario a actualizar no encontrado")
//       console.log("Respuesta vacia a PUT USERNAME ")
//     }
//   }
// })

// Crea el endpoint /users/:username/vehicles (PUT) para obtener una lista de vehículos en req.body (puede ser uno o muchos. Si no es ninguno, que no haga nada) y añádelos a los existentes del usuario específico (usuario a través de params)

app.put('/users/:username/vehicles', (req, res) => {
  let num = 0;
  for (let i = 0; i < primaryObject.length; i++) {
    const param = req.params.username;
    const body = req.body;
    if (param === primaryObject[i].username.toString()) {
      for (let j = 0; j < body.length; j++) {

        const allVehicles = primaryObject[i].vehicles
        const newVehicle = {
          fuel: body[j].fuel,
          manufacturer: body[j].manufacturer,
          model: body[j].model,
          car: body[j].car,
          type: body[j].type
        }

        allVehicles.push(newVehicle)
        if (j === body.length - 1) {
          res.json(primaryObject[i])
          console.log("Respondiendo a PUT USERNAME")
          num = 1;
        }


        if (i === primaryObject.length - 1 && num === 0) {
          res.json("Usuario a actualizar no encontrado")
          console.log("Respuesta vacia a PUT USERNAME/VEHICLES ")
        }
        if (i === 0 && body.length === 0){
          res.json("No has pasado ningun vehiculo")
          console.log("Respuesta vacia a PUT USERNAME/VEHICLES ")
        }
      }
    }
  }
})

//13- Crea el endpoint /users/:username/foods (PUT) para obtener una lista de alimentos en req.body, junto con el nombre del usuario por params y añade la lista de dichos alimentos a la lista de comidas favoritas de dicho usuario. Si no se recibe ningún alimento, se eliminan todos los que tienen

app.put('/users/:username/foods', (req, res) => {
  let num = 0;
  for (let i = 0; i < primaryObject.length; i++) {
    const param = req.params.username;
    const body = req.body;
    if (body.length === 0 && param === primaryObject[i].username.toString()) {

      primaryObject[i].favouritesFood = []
      res.json(primaryObject[i])
      console.log("Respondiendo a PUT USERNAME/FOODS")
      num = 1;
    }
    if (param === primaryObject[i].username.toString()) {
      for (let j = 0; j < body.length; j++) {

        const allFoods = primaryObject[i].favouritesFood
        allFoods.push(body[j])
        if (j === body.length - 1) {
          res.json(primaryObject[i])
          console.log("Respondiendo a PUT USERNAME/FOODS")
          num = 1;
        }


        if (i === primaryObject.length - 1 && num === 0) {
          res.json("Usuario a actualizar no encontrado")
          console.log("Respuesta vacia a PUT USERNAME/FOODS")
        }
      }
    }
  }
})

// Crea el endpoint /users/:username/hide (PUT) para recibir el email en req.body y cambiar la visibilidad de ese usuario para que no aparezca si se busca (se entenderá como borrado para el mismo usuario)

app.put('/users/:username/hide', (req, res) => {
  num = 0;
  for (let i = 0; i < primaryObject.length; i++) {
    const param = req.params.username;
    const { email } = req.body;
    if (primaryObject[i].username.toString() === param && email === primaryObject[i].email.toString()) {
      primaryObject[i].deleted = true
      num = 1;
      res.json("Usuario ocultado")
      console.log("Respondiendo a PUT USERNAME/HIDE")
    }

    if (i === primaryObject.length - 1 && num === 0) {
      res.json("Usuario a actualizar no encontrado")
      console.log("Respuesta vacia a PUT USERNAME/HIDE")
    }
  }
})

//15- Crea el endpoint /user/:username (DELETE) para recibir en req.body el email y elimina definitivamente dicho usuario de la lista. Devuelve el usuario borrado. IMPORTANTE! Solo se puede borrar si el campo deleted está a true. Si no, devolverá un error

app.delete('/user/:username', (req, res) => {
  console.log("dsadasdas")
  num = 0;
  for (let i = 0; i < primaryObject.length; i++) {
    const param = req.params.username;
    const { email } = req.body;
    if (primaryObject[i].username.toString() === param && email === primaryObject[i].email.toString()) {
      primaryObject[i].deleted = true
      num = 1;
      primaryObject.splice(i,1)
      res.json("Usuario eliminado")
      console.log("Respondiendo a DELETE USERNAME/HIDE")
    }

    if (i === primaryObject.length - 1 && num === 0) {
      res.json("Usuario a eliminar no encontrado")
      console.log("Respuesta vacia a DELETE USERNAME/HIDE")
    }
  }

})


app.listen(PORT, () => {
  console.info(`> Estoy arribísima en el puerto ${PORT}! ✨🦄`);
});