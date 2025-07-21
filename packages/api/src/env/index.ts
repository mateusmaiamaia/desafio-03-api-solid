// Garante que as variáveis do arquivo .env sejam carregadas
import 'dotenv/config'
import { z } from 'zod'

// Define o schema de validação para as variáveis de ambiente
const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  JWT_SECRET: z.string(), // VERIFIQUE SE ESTA LINHA ESTÁ ESCRITA CORRETAMENTE
  PORT: z.coerce.number().default(3333),
})

const _env = envSchema.safeParse(process.env)

// Se alguma variável de ambiente estiver faltando ou for inválida, o programa irá parar aqui
if (_env.success === false) {
  console.error('❌ Invalid environment variables', _env.error.format())
  throw new Error('Invalid environment variables.')
}

// A linha 'export' é o que transforma este arquivo em um módulo
export const env = _env.data