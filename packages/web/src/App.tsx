import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { PetDetails } from './pages/PetDetails'
import { DefaultLayout } from './components/DefaultLayout'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { ProtectedRoute } from './components/ProtectedRoute'
import { CreatePet } from './pages/CreatePet'

export function App() {
  return (
    <Routes>
      {/* Rotas Públicas */}
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/pets/:id" element={<PetDetails />} />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Rotas Protegidas (que também usam o DefaultLayout) */}
      <Route element={<ProtectedRoute />}>
        <Route path="/admin" element={<DefaultLayout />}>
          <Route path="pets/create" element={<CreatePet />} />
          {/* Outras futuras rotas de admin podem ser adicionadas aqui */}
        </Route>
      </Route>
    </Routes>
  )
}