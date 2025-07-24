import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { PetDetails } from './pages/PetDetails'
import { DefaultLayout } from './components/DefaultLayout'
import { Login } from './pages/Login' // IMPORTE AQUI

export function App() {
  return (
    <Routes>
      {/* Rotas com o layout padrão (Sidebar) */}
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/pets/:id" element={<PetDetails />} />
      </Route>

      {/* Rota de Login (sem Sidebar) */}
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}