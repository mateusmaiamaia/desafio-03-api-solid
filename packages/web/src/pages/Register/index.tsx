import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '@/services/api'
import styles from './styles.module.css'

export function Register() {
  const [orgName, setOrgName] = useState('')
  const [authorName, setAuthorName] = useState('')
  const [email, setEmail] = useState('')
  const [cep, setCep] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('') // Estado para a cidade
  const [whatsappNumber, setWhatsappNumber] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const navigate = useNavigate()

  async function handleRegister(event: FormEvent) {
    event.preventDefault()

    if (password !== confirmPassword) {
      alert('As senhas não coincidem!')
      return
    }

    try {
      await api.post('/orgs', {
        org_name: orgName,
        author_name: authorName,
        email,
        cep,
        address,
        city, // Enviando a cidade para a API
        whatsapp_number: whatsappNumber,
        password,
      })

      alert('Cadastro realizado com sucesso!')
      navigate('/login')
    } catch (error) {
      alert('Erro no cadastro, verifique os dados e tente novamente.')
      console.error('Falha no cadastro:', error)
    }
  }

  return (
    <div className={styles.container}>
      <aside className={styles.illustration}>
        <img src="/logo-with-text.svg" alt="Find A Friend" />
      </aside>

      <main className={styles.content}>
        <form className={styles.form} onSubmit={handleRegister}>
          <h1>Cadastre sua organização</h1>
          <div className={styles.inputGroup}>
            <label htmlFor="org_name">Nome da organização</label>
            <input
              type="text"
              id="org_name"
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="responsible_name">Nome do responsável</label>
            <input
              type="text"
              id="responsible_name"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
            />
          </div>
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
            <label htmlFor="cep">CEP</label>
            <input
              type="text"
              id="cep"
              value={cep}
              onChange={(e) => setCep(e.target.value)}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="address">Endereço</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          {/* CAMPO CIDADE ADICIONADO ABAIXO */}
          <div className={styles.inputGroup}>
            <label htmlFor="city">Cidade</label>
            <input
              type="text"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="whatsapp">Whatsapp</label>
            <input
              type="tel"
              id="whatsapp"
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber(e.target.value)}
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
          <div className={styles.inputGroup}>
            <label htmlFor="confirm_password">Confirmar Senha</label>
            <input
              type="password"
              id="confirm_password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button type="submit" className={styles.registerButton}>
            Cadastrar
          </button>
          <a href="/login" className={styles.loginLink}>
            Já possui conta?
          </a>
        </form>
      </main>
    </div>
  )
}