const FavoriteRepository = require('../repositories/FavoriteRepository')

const CreateServices = require('../services/favorite/CreateService')

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

    
}

module.exports = DishesController