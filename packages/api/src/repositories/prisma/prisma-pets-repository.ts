import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { FindManyByCityFilters, PetsRepository } from '../pets-repository'

export class PrismaPetsRepository implements PetsRepository {
  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
      include: { // ADICIONE ESTA LINHA PARA INCLUIR DADOS DA ORG
        org: true,
      },
    })

    return pet
  }

  async findManyByCity(city: string, filters: FindManyByCityFilters) {
    const pets = await prisma.pet.findMany({
      where: {
        org: {
          city: {
            contains: city,
          },
        },
        age: filters.age,
        size: filters.size,
        energy_level: filters.energy_level,
        independence: filters.independence,
        environment: filters.environment,
      },
    })

    return pets
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }
}