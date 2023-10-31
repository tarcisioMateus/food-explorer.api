const FavoriteRepository = require('../repositories/FavoriteRepository')

const IndexIdServices = require('../services/favorite/dish/IndexIdService')
const IndexDataServices = require('../services/favorite/dish/IndexDataService')

class FavoritesDishesController {

  async indexId (request, response) {
    const user_id = request.user.id

    const indexIdServices = new IndexIdServices({ 
      favoriteRepository: new FavoriteRepository()
    })
    const favoritesDishesId = await indexIdServices.execute({ user_id })

    return response.status(200).json(favoritesDishesId)
  }

  async indexData (request, response) {
    const user_id = request.user.id

    const indexDataServices = new IndexDataServices({ 
      favoriteRepository: new FavoriteRepository()
    })
    const favoritesDishesData = await indexDataServices.execute({ user_id })

    return response.status(200).json(favoritesDishesData)
  }
}

module.exports = FavoritesDishesController