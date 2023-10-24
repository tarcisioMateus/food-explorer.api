const DishRepository = require('../repositories/DishRepository')
const IngredientRepository = require('../repositories/IngredientRepository')

const CreateServices = require('../services/dish/CreateService')
const IndexServices = require('../services/dish/IndexService')
const ShowServices = require('../services/dish/ShowService')

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

    async index (request, response) {
        const { name, ingredients } = request.query

        const indexServices = new IndexServices({
            dishRepository: new DishRepository()
        })
        const dishes = await indexServices.execute({ name, ingredients })

        return response.status(200).json(dishes)
    }

    async show (request, response) {
        const { id } = request.params 

        const showServices = new ShowServices({ 
            dishRepository: new DishRepository(), 
            ingredientRepository: new IngredientRepository(), 
        })
        const data = await showServices.execute({ id })

        return response.status(200).json(data)
    }
}

module.exports = DishsController