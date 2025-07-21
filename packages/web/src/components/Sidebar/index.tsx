import { useState } from 'react'
import styles from './styles.module.css'

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
        <img src="/logo.svg" alt="Find A Friend" />
        <div className={styles.location}>
          <select name="state">
            <option value="PE">PE</option>
          </select>
          {/* O input de cidade agora é controlado pelo estado */}
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
              // ... (código do ícone de busca) ...
            >
              {/* ... */}
            </svg>
          </button>
        </div>
      </header>

      <main className={styles.filters}>
        {/* ... filtros ... */}
      </main>
    </aside>
  )
}