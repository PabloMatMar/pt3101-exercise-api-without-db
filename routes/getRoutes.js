const express = require('express');
const getRouter = express.Router();
const getControllers = require ('../controllers/getControllers')

getRouter.get('/', getControllers.getAllUsers)

module.exports = getRouter;