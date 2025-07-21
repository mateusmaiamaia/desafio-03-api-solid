import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { RegisterOrgUseCase } from '@/use-cases/register-org'
import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  // 1. Validar os dados do corpo da requisição
  const registerBodySchema = z.object({
    org_name: z.string(),
    author_name: z.string(),
    email: z.string().email(),
    whatsapp_number: z.string(),
    password: z.string().min(6),
    address: z.string(),
    cep: z.string(),
    city: z.string(),
  })

  const {
    org_name,
    author_name,
    email,
    whatsapp_number,
    password,
    address,
    cep,
    city,
  } = registerBodySchema.parse(request.body)

  try {
    // 2. Instanciar e chamar o caso de uso
    const orgsRepository = new PrismaOrgsRepository()
    const registerOrgUseCase = new RegisterOrgUseCase(orgsRepository)

    await registerOrgUseCase.execute({
      org_name,
      author_name,
      email,
      whatsapp_number,
      password,
      address,
      cep,
      city,
    })
  } catch (err) {
    // 3. Tratar erros conhecidos
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    // Deixar erros desconhecidos para uma camada superior tratar
    throw err
  }

  // 4. Responder com sucesso
  return reply.status(201).send()
}