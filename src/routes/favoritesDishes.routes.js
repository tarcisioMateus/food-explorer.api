const { Router } = require('express')

const ensureAuthenticated = require('../middlewares/ensureAuthenticated')

const FavoritesDishesController = require('../controllers/FavoritesDishesController')
const favoritesDishesController = new FavoritesDishesController()

const favoritesDishesRoutes = Router()

favoritesDishesRoutes.use(ensureAuthenticated)

favoritesDishesRoutes.get('/id', favoritesDishesController.indexId)
favoritesDishesRoutes.get('/data', favoritesDishesController.indexData)

module.exports = favoritesDishesRoutes