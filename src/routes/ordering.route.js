const { Router } = require('express');

const orderingUserController = require('../controllers/ordering.controller');

const router = Router();

router
    // .get('/', orderingUserController.getAllUsers)
    .get('/', orderingUserController.getUserByUserLogin)
    .put('/', orderingUserController.updateUserOrdering);

module.exports = router;