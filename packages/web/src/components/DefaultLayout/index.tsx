import { Outlet, useOutletContext } from 'react-router-dom'
import { Sidebar } from '../Sidebar'
import styles from './styles.module.css'
import { useState } from 'react'
import { api } from '@/services/api'

interface Pet {
  id: string
  name: string
}

type OutletContextType = {
  pets: Pet[]
}

export function usePets() {
  return useOutletContext<OutletContextType>()
}

export function DefaultLayout() {
  const [pets, setPets] = useState<Pet[]>([])

  async function searchPets(city: string) {
    try {
      const response = await api.get('/pets', {
        params: { city },
      })
      setPets(response.data.pets)
    } catch (error) {
      console.error('Erro ao buscar pets:', error)
    }
  }

  return (
    <div className={styles.layout}>
      <Sidebar onSearch={searchPets} />
      <Outlet context={{ pets }} />
    </div>
  )
}