const { Router } = require('express')

const ensureAuthenticated = require('../middlewares/ensureAuthenticated')

const FavoritesController = require('../controllers/FavoritesController')
const favoritesController = new FavoritesController()

const favoritesRoutes = Router()

favoritesRoutes.use(ensureAuthenticated)

favoritesRoutes.post('/:dish_id', favoritesController.create)
favoritesRoutes.delete('/:dish_id', favoritesController.delete)

module.exports = favoritesRoutes