import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeSearchPetsByCityUseCase } from '@/use-cases/factories/make-search-pets-by-city-use-case'

export async function searchByCity(request: FastifyRequest, reply: FastifyReply) {
  // A cidade virá pela URL: /pets?city=Sao%20Paulo
  const searchByCityQuerySchema = z.object({
    city: z.string().min(1), // Valida que a cidade não está vazia
  })

  const { city } = searchByCityQuerySchema.parse(request.query)

  const searchPetsUseCase = makeSearchPetsByCityUseCase()

  const { pets } = await searchPetsUseCase.execute({
    city,
  })

  return reply.status(200).send({
    pets,
  })
}