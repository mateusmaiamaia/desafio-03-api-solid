import { useAuth } from '@/contexts/AuthContexts'
import { Navigate, Outlet } from 'react-router-dom'

export function ProtectedRoute() {
  const { isAuthenticated } = useAuth()

  // Se estiver autenticado, renderiza a rota filha, senão, redireciona para o login
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />
}