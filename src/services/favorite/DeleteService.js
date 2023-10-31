class DeleteServices {
  constructor({ 
    favoriteRepository
  }) {
    this.favoriteRepository = favoriteRepository
  }

  async execute({ user_id, dish_id }) {
    await this.favoriteRepository.delete({ user_id, dish_id })
  }
}

module.exports = DeleteServices