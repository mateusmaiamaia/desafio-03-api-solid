import { Outlet } from 'react-router-dom'
import { Sidebar } from '../Sidebar'
import styles from './styles.module.css'

export function DefaultLayout() {
  return (
    <div className={styles.layout}>
      <Sidebar onSearch={function (city: string): void {
        throw new Error('Function not implemented.')
      } } />
      <Outlet />
    </div>
  )
}