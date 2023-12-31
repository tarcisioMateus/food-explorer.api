const DishRepository = require('../repositories/DishRepository')
const IngredientRepository = require('../repositories/IngredientRepository')
const DiskStorage = require("../providers/DiskStorage")


const CreateServices = require('../services/dish/CreateService')
const IndexServices = require('../services/dish/IndexService')
const ShowServices = require('../services/dish/ShowService')
const UpdateServices = require('../services/dish/UpdateService')
const DeleteServices = require('../services/dish/DeleteService')

class DishesController {

    async create (request, response) {
        const { name, description, ingredients, price, category } = request.body

        const createServices = new CreateServices({ 
            dishRepository: new DishRepository(), 
            ingredientRepository: new IngredientRepository() 
        })
        const dish = await createServices.execute({ 
            name, description, ingredients, price, category 
        })

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

    async update (request, response) {
        const { name, description, ingredients, price, category } = request.body
        const { id } = request.params 

        const updateServices = new UpdateServices({
            dishRepository: new DishRepository(),
            ingredientRepository: new IngredientRepository(),
        })
        await updateServices.execute({ name, description, ingredients, price, category, id })

        return response.status(200).json()
    }

    async delete (request, response) {
        const { id } = request.params

        const deleteServices = new DeleteServices({
            dishRepository: new DishRepository(),
            diskStorage: new DiskStorage()
        })
        await deleteServices.execute({ id })

        return response.status(200).json()
    }
}

module.exports = DishesController