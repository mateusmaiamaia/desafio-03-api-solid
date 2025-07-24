import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '@/services/api'
import styles from './styles.module.css'

// Tipagem para os detalhes do pet, agora incluindo a ORG
interface PetDetails {
  id: string
  name: string
  about: string
  age: string
  size: string
  energy_level: string
  independence: string
  environment: string
  org: {
    name: string
    address: string
    whatsapp_number: string
  }
}

export function PetDetails() {
  const { id } = useParams()
  const [pet, setPet] = useState<PetDetails | null>(null)

  useEffect(() => {
    async function fetchPetDetails() {
      if (id) {
        const response = await api.get(`/pets/${id}`)
        setPet(response.data.pet)
      }
    }
    fetchPetDetails()
  }, [id])

  if (!pet) {
    return <div>Carregando...</div>
  }

  return (
    <div className={styles.container}>
      <div className={styles.detailsContent}>
        <div className={styles.imageGallery}>
          <img
            className={styles.mainImage}
            src="https://images.dog.ceo/breeds/bulldog-french/n02108915_4636.jpg"
            alt={`Foto do ${pet.name}`}
          />
        </div>

        <div className={styles.petInfo}>
          <h1>{pet.name}</h1>
          <p>{pet.about}</p>

          <div className={styles.characteristicsGrid}>
            <div className={styles.characteristic}>
              <span>{pet.energy_level}</span>
            </div>
            <div className={styles.characteristic}>
              <span>{pet.environment}</span>
            </div>
            <div className={styles.characteristic}>
              <span>{pet.size}</span>
            </div>
          </div>

          <div className={styles.orgInfo}>
            <div className={styles.orgIcon}>
              {/* Icone da ORG */}
            </div>
            <div>
              <h2>{pet.org.name}</h2>
              <p>{pet.org.address}</p>
            </div>
          </div>

          <div className={styles.adoptionRequirements}>
            <h2>Requisitos para adoção</h2>
            <ul>
              <li>Local grande para o animal correr e brincar.</li>
              <li>Proibido apartamento</li>
            </ul>
          </div>

          <a
            href={`https://wa.me/${pet.org.whatsapp_number}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.contactButton}
          >
            Entrar em contato
          </a>
        </div>
      </div>
    </div>
  )
}