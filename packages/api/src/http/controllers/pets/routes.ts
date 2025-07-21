import { FastifyInstance } from 'fastify'
import { registerPet } from './register-pet-controller'
import { verifyJwt } from '@/http/middlewares/verify-jwt'

export async function petsRoutes(app: FastifyInstance) {
  // Aplicando o middleware 'verifyJwt' a esta rota.
  // Somente ORGs logadas poderão cadastrar pets.
  app.post('/pets', { onRequest: [verifyJwt] }, registerPet)
}