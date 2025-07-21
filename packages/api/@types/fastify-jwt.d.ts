// Este import vazio é intencional. Ele transforma o arquivo em um "módulo".
import 'fastify'

// Aqui, estamos "reabrindo" o módulo 'fastify' para adicionar nossa propriedade
declare module 'fastify' {
  // Estendemos a interface original FastifyRequest
  export interface FastifyRequest {
    // E adicionamos a nossa propriedade 'user' com a sua tipagem
    user: {
      sub: string
    }
  }
}