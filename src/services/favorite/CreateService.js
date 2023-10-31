class CreateServices {
  constructor({ 
    favoriteRepository 
  }) {
    this.favoriteRepository = favoriteRepository
  }

  async execute({ user_id, dish_id }) {
    const favorite = await this.favoriteRepository.create({ user_id, dish_id }) 
    
    return favorite
  }
}

module.exports = CreateServices
