const express = require('express');
const getAllRouter = express.Router();
const getAllControllers = require ('../controllers/getAllControllers')


getAllRouter.get('/:search', getAllControllers.paramAndQueryRoutes)

module.exports = getAllRouter;