const primaryObject = require('../original/users_original.json')

const paramAndQueryRoutes = (req, res) => {
    console.log(req.params)
    const param = req.params.search;
    const arrNation = [];
    const arrVehicles = [];
    const arrFood = [];
    const uniquesFoods = [];
    const repeatFoods = [];
    let usersCars = [];
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
                    uniquesFoods.splice(pointSplice, 1)
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

        if (param === "vehicles" && fuel || manufacturer || model) {
            if (cont === i && primaryObject[i].vehicles.length === 0) {
                usersCars.push({ username: primaryObject[i].username, email: primaryObject[i].email, img: primaryObject[i].img })
                cont++
            }
            for (let v = 0; v < primaryObject[i].vehicles.length; v++) {
                if (cont === i) {
                    if (fuel === primaryObject[i].vehicles[v].fuel.split(' ').join('') && manufacturer === primaryObject[i].vehicles[v].manufacturer.split(' ').join('') && model === primaryObject[i].vehicles[v].model.split(' ').join('')) {

                        usersCars.push({ username: primaryObject[i].username, email: primaryObject[i].email, img: primaryObject[i].img })
                        cont++
                    }
                    else if (fuel === primaryObject[i].vehicles[v].fuel.split(' ').join('') || manufacturer === primaryObject[i].vehicles[v].manufacturer.split(' ').join('') || model === primaryObject[i].vehicles[v].model.split(' ').join('')) {
                        usersCars.push({ username: primaryObject[i].username, email: primaryObject[i].email, img: primaryObject[i].img })
                        cont++
                    }
                    else if (cont === i && v === primaryObject[i].vehicles.length - 1) {
                        cont++
                    }
                }
                if (i === primaryObject.length - 1 && v === primaryObject[i].vehicles.length - 1) {
                    res.send(usersCars)
                    console.log("Respondiendo a GET USER FOR PARAMS OF HIS CARS")
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
                    console.log("Respondiendo con RESPUESTA NO ENCONTRADA", `${param}`)
                }
            }
        }
    }

};

module.exports = {
    paramAndQueryRoutes
}