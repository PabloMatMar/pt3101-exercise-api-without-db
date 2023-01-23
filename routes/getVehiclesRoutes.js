const express = require('express');
const getVehicleRouter = express.Router();
const getVehicleControllers = require ('../controllers/getVehicleControllers')

getVehicleRouter.get('/', getVehicleControllers.unicCars)

module.exports = getVehicleRouter;