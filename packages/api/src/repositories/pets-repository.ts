import { Pet, Prisma } from '@prisma/client'

// Garanta que esta interface exista
export interface FindManyByCityFilters {
  age?: string
  size?: string
  energy_level?: string
  independence?: string
  environment?: string
}

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findById(id: string): Promise<Pet | null> 
  findManyByCity(city: string, filters: FindManyByCityFilters): Promise<Pet[]>
}