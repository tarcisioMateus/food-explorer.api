const { Router } = require('express')
const multer = require('multer')
const uploadConfig = require('../configs/upload')

const ensureAuthenticated = require('../middlewares/ensureAuthenticated')

const DishesController = require('../controllers/DishesController')
const DishesAvatarController = require('../controllers/DishesAvatarController')
const dishesController = new DishesController()
const dishesAvatarController = new DishesAvatarController()


const upload = multer(uploadConfig.MULTER)
const dishesRoutes = Router()

dishesRoutes.use(ensureAuthenticated)

dishesRoutes.post('/', dishesController.create)
dishesRoutes.get('/', dishesController.index)
dishesRoutes.get('/:id', dishesController.show)
dishesRoutes.put('/:id', dishesController.update)
dishesRoutes.delete('/:id', dishesController.delete)

dishesRoutes.patch('/avatar/:dish_id', upload.single("avatar"), dishesAvatarController.update)

module.exports = dishesRoutes