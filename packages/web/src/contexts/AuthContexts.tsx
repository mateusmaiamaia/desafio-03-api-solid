import { api } from '@/services/api'
import { createContext, ReactNode, useState, useContext } from 'react'

interface AuthContextType {
  isAuthenticated: boolean
  signIn: (data: SignInCredentials) => Promise<void>
}

interface SignInCredentials {
  email: string
  password: string
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(() => {
    // Busca o token do localStorage ao iniciar a aplicação
    const storedToken = localStorage.getItem('@FindAFriend:token')
    if (storedToken) {
      api.defaults.headers.common.Authorization = `Bearer ${storedToken}`
      return storedToken
    }
    return null
  })

  const isAuthenticated = !!token

  async function signIn({ email, password }: SignInCredentials) {
    const response = await api.post('/sessions', {
      email,
      password,
    })

    const { token: newToken } = response.data

    // Salva o token no estado e no localStorage
    localStorage.setItem('@FindAFriend:token', newToken)
    api.defaults.headers.common.Authorization = `Bearer ${newToken}`
    setToken(newToken)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  )
}

// Hook customizado para facilitar o uso do contexto
export const useAuth = () => useContext(AuthContext)