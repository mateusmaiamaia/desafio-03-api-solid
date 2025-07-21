import styles from './styles.module.css'

interface PetCardProps {
  id: string
  name: string
  imageUrl: string
}

export function PetCard({ id, name, imageUrl }: PetCardProps) {
  return (
    // No futuro, este 'a' será um '<Link>' do react-router-dom
    <a href={`/pets/${id}`} className={styles.card}>
      <img src={imageUrl} alt={`Foto do ${name}`} />
      <footer>
        <span>{name}</span>
      </footer>
    </a>
  )
}