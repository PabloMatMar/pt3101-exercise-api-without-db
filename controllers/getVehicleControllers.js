const primaryObject = require('../original/users_original.json')

const unicCars = (req, res) => {

    const uniquesVehicles = []
    const repeatVehicles = []
    const { fuel } = req.query
    for (let i = 0; i < primaryObject.length; i++) {
        for (let c = 0; c < primaryObject[i].vehicles.length; c++) {
            if (fuel === primaryObject[i].vehicles[c].fuel) {
                if (uniquesVehicles.includes(primaryObject[i].vehicles[c])) {
                    const pointSplice = uniquesVehicles.indexOf(primaryObject[i].vehicles[c])
                    uniquesVehicles.splice(pointSplice, 1)
                    repeatVehicles.push(primaryObject[i].vehicles[c])
                }
                if (!repeatVehicles.includes(primaryObject[i].vehicles[c])) {
                    uniquesVehicles.push(primaryObject[i].vehicles[c])
                }
            }
            if (uniquesVehicles.length > 0 && i === primaryObject.length - 1 && c === primaryObject[i].vehicles.length - 1) {
                res.send(uniquesVehicles)
                console.log("Respondiendo a GET VEHICLES")
            }
            else if(!fuel) {
                res.send("Falta escribir ?fuel= en el navegador")
                console.log("Respondiendo con RESPUESTA NO ENCONTRADA")
            }
            else if (fuel !== "Diesel" && fuel !== "Gasoline" && fuel !== "Electric") {
                res.send("El combustible esta mal escrito o ninguno de los coches lo usa.")
                console.log("Respondiendo con RESPUESTA NO ENCONTRADA")

            }
        }
    }
}

module.exports = {
    unicCars
}