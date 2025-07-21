import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { FindManyByCityFilters, PetsRepository } from '../pets-repository'


export class PrismaPetsRepository implements PetsRepository {
  async findManyByCity(city: string, filters: FindManyByCityFilters) {
    const pets = await prisma.pet.findMany({
      where: {
        org: {
          city: {
            contains: city,
          },
        },
        // O Prisma ignora filtros com valor 'undefined',
        // então podemos passar o objeto de filtros diretamente.
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