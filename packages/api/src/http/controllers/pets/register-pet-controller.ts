import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeRegisterPetUseCase } from '@/use-cases/factories/make-register-pet-use-case'

export async function registerPet(request: FastifyRequest, reply: FastifyReply) {
  const registerPetBodySchema = z.object({
    name: z.string(),
    about: z.string(),
    age: z.string(),
    size: z.string(),
    energy_level: z.string(),
    independence: z.string(),
    environment: z.string(),
  })

  const { name, about, age, size, energy_level, independence, environment } =
    registerPetBodySchema.parse(request.body)

  // O ID da ORG vem do token JWT que foi validado no middleware
  const org_id = request.user.sub

  const registerPetUseCase = makeRegisterPetUseCase()

  await registerPetUseCase.execute({
    name,
    about,
    age,
    size,
    energy_level,
    independence,
    environment,
    org_id,
  })

  return reply.status(201).send()
}