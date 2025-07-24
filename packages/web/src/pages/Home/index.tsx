import { useEffect, useState } from 'react'
import { PetCard } from '@/components/PetCard'
import { api } from '@/services/api'
import styles from './styles.module.css'

// Definindo a interface para o objeto Pet
interface Pet {
  id: string
  name: string
}

export function Home() {
  // Especificando o tipo para o useState
  const [pets, setPets] = useState<Pet[]>([])

  useEffect(() => {
    async function fetchPets() {
      const response = await api.get('/pets', { params: { city: 'São Paulo' } })
      setPets(response.data.pets)
    }
    fetchPets()
  }, [])

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <p>
          Encontre <strong>{pets.length} amigos</strong> na sua cidade
        </p>
        <select>
          <option>Gatos e Cachorros</option>
        </select>
      </header>
      <div className={styles.petsGrid}>
        {pets.map((pet) => (
          <PetCard
            key={pet.id}
            id={pet.id}
            name={pet.name}
            imageUrl="https://images.dog.ceo/breeds/retriever-golden/n02099601_3327.jpg"
          />
        ))}
      </div>
    </main>
  )
}