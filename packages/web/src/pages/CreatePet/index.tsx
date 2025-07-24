import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '@/services/api'
import styles from './styles.module.css'

export function CreatePet() {
  const [name, setName] = useState('')
  const [about, setAbout] = useState('')
  const [age, setAge] = useState('')
  const [size, setSize] = useState('')
  const [energyLevel, setEnergyLevel] = useState('')
  const [independence, setIndependence] = useState('')
  const [environment, setEnvironment] = useState('')

  const navigate = useNavigate()

  async function handleCreatePet(event: FormEvent) {
    event.preventDefault()

    const data = {
      name,
      about,
      age,
      size,
      energy_level: energyLevel,
      independence,
      environment,
    }

    try {
      await api.post('/pets', data)

      alert('Pet cadastrado com sucesso!')
      navigate('/') // Redireciona para a home
    } catch (error) {
      alert('Erro ao cadastrar o pet. Tente novamente.')
      console.error('Falha no cadastro do pet:', error)
    }
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleCreatePet}>
        <fieldset>
          <legend>Adicione um pet</legend>

          <div className={styles.inputGroup}>
            <label htmlFor="name">Nome</label>
            <input id="name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="about">Sobre</label>
            <textarea
              id="about"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="age">Idade</label>
            <select id="age" value={age} onChange={(e) => setAge(e.target.value)}>
              <option value=""></option>
              <option value="Filhote">Filhote</option>
              <option value="Jovem">Jovem</option>
              <option value="Adulto">Adulto</option>
            </select>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="size">Porte</label>
            <select id="size" value={size} onChange={(e) => setSize(e.target.value)}>
              <option value=""></option>
              <option value="Pequenino">Pequenino</option>
              <option value="Medio">Médio</option>
              <option value="Grande">Grande</option>
            </select>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="energy_level">Nível de Energia</label>
            <select
              id="energy_level"
              value={energyLevel}
              onChange={(e) => setEnergyLevel(e.target.value)}
            >
              <option value=""></option>
              <option value="Baixa">Baixa</option>
              <option value="Media">Média</option>
              <option value="Alta">Alta</option>
            </select>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="independence">Nível de Independência</label>
            <select
              id="independence"
              value={independence}
              onChange={(e) => setIndependence(e.target.value)}
            >
              <option value=""></option>
              <option value="Baixo">Baixo</option>
              <option value="Medio">Médio</option>
              <option value="Alto">Alto</option>
            </select>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="environment">Ambiente</label>
            <select
              id="environment"
              value={environment}
              onChange={(e) => setEnvironment(e.target.value)}
            >
              <option value=""></option>
              <option value="Apartamento">Apartamento</option>
              <option value="Casa com quintal">Casa com quintal</option>
              <option value="Ambiente amplo">Ambiente amplo</option>
            </select>
          </div>
        </fieldset>

        <button type="submit" className={styles.confirmButton}>
          Confirmar
        </button>
      </form>
    </div>
  )
}