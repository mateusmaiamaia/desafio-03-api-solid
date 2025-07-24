import { useState } from 'react'
import styles from './styles.module.css'
import { Link } from 'react-router-dom'

interface SidebarProps {
  onSearch: (city: string) => void
}

export function Sidebar({ onSearch }: SidebarProps) {
  const [city, setCity] = useState('')

  function handleSearch() {
    onSearch(city)
  }

  return (
    <aside className={styles.sidebar}>
      <header>
        <Link to="/">
          <img
            src="/logo_simples.png"
            alt="Find A Friend"
            className={styles.logo}
          />
        </Link>

        <div className={styles.location}>
          <select name="state">
            <option value="PE">PE</option>
          </select>
          <input
            type="text"
            placeholder="Sua cidade"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button type="button" onClick={handleSearch}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z"
                fill="white"
              />
            </svg>
          </button>
        </div>
      </header>

      <main className={styles.filters}>
        <p>Filtros</p>

        <div className={styles.filter}>
          <label htmlFor="age">Idade</label>
          <select name="age" id="age">
            <option value="">Todos</option>
            <option value="Filhote">Filhote</option>
            <option value="Adulto">Adulto</option>
          </select>
        </div>

        <div className={styles.filter}>
          <label htmlFor="energy_level">Nível de energia</label>
          <select name="energy_level" id="energy_level">
            <option value="">Todos</option>
            <option value="Baixa">Baixa</option>
            <option value="Media">Média</option>
            <option value="Alta">Alta</option>
          </select>
        </div>

        <div className={styles.filter}>
          <label htmlFor="size">Porte do animal</label>
          <select name="size" id="size">
            <option value="">Todos</option>
            <option value="Pequenino">Pequenino</option>
            <option value="Medio">Médio</option>
            <option value="Grande">Grande</option>
          </select>
        </div>

        <div className={styles.filter}>
          <label htmlFor="independence">Nível de independência</label>
          <select name="independence" id="independence">
            <option value="">Todos</option>
            <option value="Baixo">Baixo</option>
            <option value="Medio">Médio</option>
            <option value="Alto">Alto</option>
          </select>
        </div>
      </main>
    </aside>
  )
}