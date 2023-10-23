const DishRepository = require('../repositories/DishRepository')
const IngredientRepository = require('../repositories/IngredientRepository')

const CreateServices = require('../services/dish/CreateService')

class DishsController {

    async create (request, response) {
        const { name, description, ingredients, price, category, avatar } = request.body

        const createServices = new CreateServices({ 
            dishRepository: new DishRepository(), 
            ingredientRepository: new IngredientRepository() 
        })
        const dish = await createServices.execute({ name, description, ingredients, price, category, avatar })

        return response.status(201).json(dish)
    }
}

module.exports = DishsController