import { FastifyInstance } from 'fastify'
import { registerPet } from './register-pet-controller'
import { searchByCity } from './search-by-city-controller' 
import { verifyJwt } from '@/http/middlewares/verify-jwt'

export async function petsRoutes(app: FastifyInstance) {
  // Rota pública para buscar pets
  app.get('/pets', searchByCity) 

  // Rota privada para cadastrar pets
  app.post('/pets', { onRequest: [verifyJwt] }, registerPet)
}