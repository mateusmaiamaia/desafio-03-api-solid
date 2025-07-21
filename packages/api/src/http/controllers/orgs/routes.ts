import { FastifyInstance } from 'fastify'
import { register } from './register-controller'

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/orgs', register)
}