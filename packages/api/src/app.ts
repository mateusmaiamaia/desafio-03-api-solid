import fastify from 'fastify'
import { orgsRoutes } from './http/controllers/orgs/routes'
import { petsRoutes } from './http/controllers/pets/routes'
import { ZodError } from 'zod'
import { env } from './env'
import cors from '@fastify/cors'

export const app = fastify()

// Registro do CORS para permitir requisições de outras origens
app.register(cors, {
  origin: true, // Em um ambiente de produção, seria mais seguro especificar o domínio do seu front-end
})

// Registro das rotas da aplicação
app.register(orgsRoutes)
app.register(petsRoutes)

// Manipulador de erros global
app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: Aqui deveríamos fazer um log para uma ferramenta externa (ex: DataDog, Sentry)
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})