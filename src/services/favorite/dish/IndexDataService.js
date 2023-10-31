class IndexDataServices {
  constructor({ 
    favoriteRepository 
  }) {
    this.favoriteRepository = favoriteRepository
  }

  async execute({ user_id }) {
    const favoritesDishes = await this.favoriteRepository.getFavoriteDishesDataByUserId({ user_id }) 
    
    return favoritesDishes
  }
}

module.exports = IndexDataServices
