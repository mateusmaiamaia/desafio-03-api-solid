import { FastifyReply, FastifyRequest } from 'fastify'
import { verify } from 'jsonwebtoken'
import { env } from '@/env'

export async function verifyJwt(request: FastifyRequest, reply: FastifyReply) {
  try {
    // O token é enviado pelo cliente no cabeçalho 'Authorization'
    // no formato "Bearer eyJhbGciOi..."
    const authHeader = request.headers.authorization

    if (!authHeader) {
      return reply.status(401).send({ message: 'Authorization token not provided.' })
    }

    // Separa a palavra "Bearer" do token em si
    const [, token] = authHeader.split(' ')

    // Verifica se o token é válido usando nosso segredo
    const decoded = verify(token, env.JWT_SECRET)

    // Adiciona o ID do usuário (que está no 'sub' do token) ao objeto da requisição
    // para que nossos controllers possam usá-lo.
    request.user = {
      sub: decoded.sub as string,
    }

  } catch (err) {
    // Se o token for inválido, retorna um erro de não autorizado
    return reply.status(401).send({ message: 'Unauthorized.' })
  }
}