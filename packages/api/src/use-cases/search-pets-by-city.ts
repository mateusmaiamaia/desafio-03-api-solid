import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

interface SearchPetsByCityUseCaseRequest {
  city: string
  // Adicionando os filtros opcionais
  age?: string
  size?: string
  energy_level?: string
  independence?: string
  environment?: string
}

interface SearchPetsByCityUseCaseResponse {
  pets: Pet[]
}

export class SearchPetsByCityUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
    age,
    size,
    energy_level,
    independence,
    environment,
  }: SearchPetsByCityUseCaseRequest): Promise<SearchPetsByCityUseCaseResponse> {
    const pets = await this.petsRepository.findManyByCity(city, {
      age,
      size,
      energy_level,
      independence,
      environment,
    })

    return {
      pets,
    }
  }
}