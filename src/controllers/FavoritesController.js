const FavoriteRepository = require('../repositories/FavoriteRepository')

const CreateServices = require('../services/favorite/CreateService')
const DeleteServices = require('../services/favorite/DeleteService')
const IndexIdServices = require('../services/favorite/dish/IndexIdService')

class DishesController {

  async create (request, response) {
    const { user_id } = request.user.id
    const { dish_id } = request.params

    const createServices = new CreateServices({ 
      favoriteRepository: new FavoriteRepository()
    })
    const favorite = await createServices.execute({ user_id, dish_id })

    return response.status(201).json(favorite)
  }

  async delete (request, response) {
    const { user_id } = request.user.id
    const { dish_id } = request.params

    const deleteServices = new DeleteServices({
      favoriteRepository: new FavoriteRepository()
    })
    await deleteServices.execute({ user_id, dish_id })

    return response.status(200).json()
  }

  async indexId (request, response) {
    const { user_id } = request.user.id

    const indexIdServices = new IndexIdServices({ 
      favoriteRepository: new FavoriteRepository()
    })
    const favoritesDishesId = await indexIdServices.execute({ user_id })

    return response.status(200).json(favoritesDishesId)
  }
}

module.exports = DishesController