import { PetCard } from '@/components/PetCard'
import styles from './styles.module.css'

interface Pet {
  id: string
  name: string
}

interface HomeProps {
  pets: Pet[]
}

export function Home({ pets }: HomeProps) {
  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <p>
          Encontre <strong>{pets.length} amigos</strong> na sua cidade
        </p>
        <select name="filter">
          <option value="all">Gatos e Cachorros</option>
          <option value="cats">Gatos</option>
          <option value="dogs">Cachorros</option>
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