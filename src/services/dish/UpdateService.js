const AppError = require('../../utils/AppError')

class UpdateServices {
    constructor ({
        dishRepository,
        ingredientRepository
    }) {
        this.dishRepository = dishRepository
        this.ingredientRepository = ingredientRepository
    }

    async execute ({ 
        name, description, ingredients, price, category, id 
    }) {
        inputValidation({ name, description, ingredients, price, category })

        const isUpdatingIngredients = await isItUpdatingIngredients ({ 
            newIngredients: ingredients, dish_id: id, ingredientRepository: this.ingredientRepository 
        })
        if (isUpdatingIngredients) {
            await this.ingredientRepository.deleteByDishId({ dish_id: id })
            await this.ingredientRepository.create({ ingredients, dish_id: id })
        }

        const dish = { 
            name: name.trim().toLowerCase(), 
            description: description.trim().toLowerCase(), 
            price, category
        }
        const updated = await this.dishRepository.update({ id, dish }) 

        return updated
    }
}

module.exports = UpdateServices

function inputValidation ({ name, description, ingredients, price, category }) {
    if (!name || !description || !ingredients.length || !price || !category ) {
      throw new AppError("Fill in all fields.")
    }
    if ( !( /R\$[\t ]*((\d{1,3}\.?)+(,\d{2}))/.test(price) ) ) {
      throw new AppError("Wrong formatted price.")
    }
}

async function isItUpdatingIngredients ({ newIngredients, dish_id, ingredientRepository }) {
    const currentIngredients = await ingredientRepository.getByDishId({ dish_id })
    
    const value = newIngredients.map( ingredient => {
        if ( !currentIngredients.includes(ingredient.trim().toLowerCase()) ) {
            return true
        }
    })

    if (value.includes(true)) return true
    return false
}