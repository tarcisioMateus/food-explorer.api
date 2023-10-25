const DishRepository = require('../repositories/DishRepository')

const IndexServices = require('../services/category/IndexService')

class CategoriesController {

    async index (request, response) {
        
        const indexServices = new IndexServices({
            dishRepository: new DishRepository()
        })
        const categorizedDishes = await indexServices.execute()

        return response.status(200).json(categorizedDishes)
    }
}

module.exports = CategoriesController