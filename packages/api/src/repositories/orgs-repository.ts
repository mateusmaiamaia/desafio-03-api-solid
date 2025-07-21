import { Org, Prisma } from '@prisma/client'

// Este é o contrato que define os métodos que nosso repositório de ORGs precisa ter.
export interface OrgsRepository {
  create(data: Prisma.OrgCreateInput): Promise<Org>
  findByEmail(email: string): Promise<Org | null>
}