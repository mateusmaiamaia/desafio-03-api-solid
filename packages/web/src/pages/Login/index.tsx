import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '@/services/api'
import styles from './styles.module.css'

export function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  async function handleLogin(event: FormEvent) {
    event.preventDefault() // Impede o recarregamento da página

    try {
      const response = await api.post('/sessions', {
        email,
        password,
      })

      // Futuramente, vamos salvar o token (response.data.token)
      console.log('Login bem-sucedido!', response.data.token)

      // Redireciona o usuário para a página principal
      navigate('/')
    } catch (error) {
      alert('E-mail ou senha inválidos. Tente novamente.')
      console.error('Falha no login:', error)
    }
  }

  return (
    <div className={styles.container}>
      <aside className={styles.illustration}>
        <img src="/logo-with-text.svg" alt="Find A Friend" />
      </aside>

      <main className={styles.content}>
        <form className={styles.form} onSubmit={handleLogin}>
          <h1>Boas-vindas!</h1>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className={styles.loginButton}>
            Login
          </button>

          <a href="/register" className={styles.registerLink}>
            Cadastrar minha organização
          </a>
        </form>
      </main>
    </div>
  )
}