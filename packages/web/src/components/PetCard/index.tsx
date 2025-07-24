import { Link } from 'react-router-dom' // IMPORTE O LINK
import styles from './styles.module.css'

interface PetCardProps {
  id: string
  name: string
  imageUrl: string
}

export function PetCard({ id, name, imageUrl }: PetCardProps) {
  return (
    // SUBSTITUA A TAG 'a' PELA TAG 'Link'
    <Link to={`/pets/${id}`} className={styles.card}>
      <img src={imageUrl} alt={`Foto do ${name}`} />
      <footer>
        <span>{name}</span>
      </footer>
    </Link>
  )
}