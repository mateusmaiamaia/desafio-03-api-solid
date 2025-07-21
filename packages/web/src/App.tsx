import { useState } from 'react'
import { Sidebar } from './components/Sidebar'
import { Home } from './pages/Home'
import { api } from './services/api'
import './index.css'

interface Pet {
  id: string
  name: string
}

export function App() {
  const [pets, setPets] = useState<Pet[]>([])

  async function searchPets(city: string) {
    try {
      const response = await api.get('/pets', {
        params: { city },
      })
      setPets(response.data.pets)
    } catch (error) {
      console.error('Erro ao buscar pets:', error)
      // Idealmente, mostrar um feedback de erro para o usuário
    }
  }

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar onSearch={searchPets} />
      <Home pets={pets} />
    </div>
  )
}