const knex = require('../database/knex')

class IngredientRepository {
  
  async create({ ingredients, dish_id }) {
    const ingredientsInfo = ingredients.map(ingredient => {
      return {
        name: ingredient.trim().toLowerCase(),
        dish_id,
      }
    })
    await knex('ingredients').insert(ingredientsInfo)
  }

  async getByDishId({ dish_id }) {
    const ingredients = (await knex('ingredients').where({dish_id}).orderBy("name")).map( ingredient => ingredient.name )
    return ingredients
  }

  async deleteByDishId({ dish_id }) {
    await knex('ingredients').where({ dish_id }).delete()
  }
}

module.exports = IngredientRepository