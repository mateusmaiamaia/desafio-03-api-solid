import { OrgsRepository } from '@/repositories/orgs-repository'
import { compare } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { sign } from 'jsonwebtoken'
import { env } from '@/env'

interface AuthenticateOrgUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateOrgUseCaseResponse {
  token: string
}

export class AuthenticateOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateOrgUseCaseRequest): Promise<AuthenticateOrgUseCaseResponse> {
    console.log('--- Iniciando Autenticação ---')
    console.log('E-mail recebido do front-end:', email)
    console.log('Senha recebida do front-end:', password)

    const org = await this.orgsRepository.findByEmail(email)

    if (!org) {
      console.log('>>> ERRO: Organização não encontrada com este e-mail.')
      throw new InvalidCredentialsError()
    }

    console.log('Organização encontrada no banco:', org.id)
    console.log('Hash da senha no banco:', org.password_hash)

    const doesPasswordMatches = await compare(password, org.password_hash)

    // Esta é a verificação mais importante!
    console.log('Resultado da comparação da senha:', doesPasswordMatches)

    if (!doesPasswordMatches) {
      console.log('>>> ERRO: A senha enviada não corresponde ao hash do banco.')
      throw new InvalidCredentialsError()
    }

    console.log('--- Autenticação bem-sucedida! ---')

    const token = sign({}, env.JWT_SECRET, {
      subject: org.id,
      expiresIn: '7d',
    })

    return { token }
  }
}