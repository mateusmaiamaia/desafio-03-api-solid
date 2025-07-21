import fastify from 'fastify'
import { orgsRoutes } from './http/controllers/orgs/routes'
import { petsRoutes } from './http/controllers/pets/routes'
import { ZodError } from 'zod'
import { env } from './env'

export const app = fastify()

// Registrando as rotas de ORGs
app.register(orgsRoutes)
app.register(petsRoutes) 

// Criando um Error Handler global
app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: Aqui deveriamos fazer um log para uma ferramenta externa como DataDog/NewRelic/Sentry
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})