const knex = require('../database/knex')

class DishRepository {
    async create({ name, description, price, avatar, category }) {
        const [ id ] = await knex('dishes').insert({ 
            name, description, price, avatar, category 
        })
        return { id }
    }

    async getById({ id }) {
        const dish = await knex('dishes').where({ id }).first()
        return dish
    }

    async getDishesByname({ name }) {
        const dishes = knex('dishes').whereLike('name', `%${name}%`).orderBy('dishes.name')
        return dishes
    }

    async getDishesByIngredients({ ingredients }) {
        const dishes = await knex('ingredients').select([
            'dishes.id', 'dishes.name', 'dishes.avatar',
            'dishes.description', 'dishes.price'
        ])
        .whereIn('ingredients.name', ingredients)
        .innerJoin('dishes', 'dishes.id', 'ingredients.dish_id')
        .groupBy('dishes.id')
        .orderBy('dishes.name')

        return dishes
    }

    async groupDishesByCategories({ 
        categories = ['dinner', 'lunch', 'breakfast', 'dessert', 'vegetarian', 'barbecue', 'drink'] 
    }) {
        const dishes = categories.map( category => {
                return ({ [category]: knex('dishes').where({category}).orderBy('dishes.name') })
            })
        return dishes
    }

    async delete({ id }) {
        await knex('dishes').where({ id }).delete()
    }
}

module.exports = DishRepository