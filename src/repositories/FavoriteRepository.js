const knex = require('../database/knex')

class FavoriteRepository {
  
  async create({ user_id, dish_id }) {
    const [ id ] = await knex('favorites').insert({
      user_id, dish_id
    })
    return { id }
  }

  async getFavoriteDishesIdByUserId({ user_id }) {
    const favoritesDishes = (await knex('favorites').where({user_id})).map( favorite => favorite.dish_id )
    return favoritesDishes
  }

  async getFavoriteDishesDataByUserId({ user_id }) {
    const favoritesDishes = await knex('favorites').select([
        'dishes.id', 'dishes.name', 'dishes.avatar'
    ])
    .where('favorites.user_id', user_id)
    .innerJoin('dishes', 'dishes.id', 'favorites.dish_id')
    .orderBy('dishes.name')

    return favoritesDishes
  }

  async delete({ user_id, dish_id }) {
    await knex('favorites').where({ user_id, dish_id }).delete()
  }
}

module.exports = FavoriteRepository