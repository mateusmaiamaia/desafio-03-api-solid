import { OrgsRepository } from '@/repositories/orgs-repository'
import { Org } from '@prisma/client'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

// Definindo os dados que o caso de uso irá receber
interface RegisterOrgUseCaseRequest {
  author_name: string
  org_name: string
  email: string
  password: string
  cep: string
  address: string
  city: string
  whatsapp_number: string
}

// Definindo a resposta do caso de uso
interface RegisterOrgUseCaseResponse {
  org: Org
}

export class RegisterOrgUseCase {
  // O construtor recebe as dependências do caso de uso
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    author_name,
    org_name,
    email,
    password,
    cep,
    address,
    city,
    whatsapp_number,
  }: RegisterOrgUseCaseRequest): Promise<RegisterOrgUseCaseResponse> {
    // Criptografando a senha antes de salvar
    const password_hash = await hash(password, 6)

    // Verificando se já existe uma ORG com o mesmo e-mail
    const orgWithSameEmail = await this.orgsRepository.findByEmail(email)

    if (orgWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    // Criando a ORG no banco de dados através do repositório
    const org = await this.orgsRepository.create({
      name: org_name,
      author_name,
      email,
      password_hash,
      cep,
      address,
      city,
      whatsapp_number,
    })

    return {
      org,
    }
  }
}