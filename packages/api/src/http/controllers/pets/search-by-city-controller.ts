import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeSearchPetsByCityUseCase } from '@/use-cases/factories/make-search-pets-by-city-use-case'

export async function searchByCity(request: FastifyRequest, reply: FastifyReply) {
  const searchByCityQuerySchema = z.object({
    city: z.string().min(1),
    // Adicionando os filtros como opcionais
    age: z.string().optional(),
    size: z.string().optional(),
    energy_level: z.string().optional(),
    independence: z.string().optional(),
    environment: z.string().optional(),
  })

  // Extraindo todos os parâmetros da query
  const { city, age, size, energy_level, independence, environment } =
    searchByCityQuerySchema.parse(request.query)

  const searchPetsUseCase = makeSearchPetsByCityUseCase()

  const { pets } = await searchPetsUseCase.execute({
    city,
    age,
    size,
    energy_level,
    independence,
    environment,
  })

  return reply.status(200).send({
    pets,
  })
}