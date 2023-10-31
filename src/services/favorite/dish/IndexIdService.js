class IndexIdServices {
  constructor({ 
    favoriteRepository 
  }) {
    this.favoriteRepository = favoriteRepository
  }

  async execute({ user_id }) {
    const favoritesDishes = await this.favoriteRepository.getFavoriteDishesIdByUserId({ user_id }) 
    
    return favoritesDishes
  }
}

module.exports = IndexIdServices
