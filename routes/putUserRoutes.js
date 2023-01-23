const express = require('express');
const putUserRouter = express.Router();
const putUsersControllers = require ('../controllers/putUsersControllers');

putUserRouter.put('/:username', putUsersControllers.putUser)

module.exports = putUserRouter;