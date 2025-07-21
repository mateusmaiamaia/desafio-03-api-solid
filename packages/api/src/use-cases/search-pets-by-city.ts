import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

interface SearchPetsByCityUseCaseRequest {
  city: string
}

interface SearchPetsByCityUseCaseResponse {
  pets: Pet[]
}

export class SearchPetsByCityUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
  }: SearchPetsByCityUseCaseRequest): Promise<SearchPetsByCityUseCaseResponse> {
    // A validação de que a cidade foi informada será feita no controller,
    // mas o caso de uso executa a busca.
    const pets = await this.petsRepository.findManyByCity(city)

    return {
      pets,
    }
  }
}