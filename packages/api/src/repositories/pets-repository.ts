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
  // Garanta que a assinatura deste método esteja correta
  findManyByCity(city: string, filters: FindManyByCityFilters): Promise<Pet[]>
}