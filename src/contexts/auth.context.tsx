'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { AuthService } from '@/services/auth.service';
import type {
  AuthContextType,
  LoginRequest,
  RegisterRequest,
  User,
} from '@/types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      const token = localStorage.getItem('access_token');
      if (token) {
        AuthService.setAuthToken(token);
        const userData = await AuthService.getCurrentUser();
        setUser(userData);
      }
    } catch (error) {
      console.error('Erro ao inicializar autenticação:', error);
      localStorage.removeItem('access_token');
      AuthService.removeAuthToken();
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (data: LoginRequest) => {
    try {
      const response = await AuthService.login(data);

      setUser(response.user);
      localStorage.setItem('access_token', response.access_token);
      
      document.cookie = `access_token=${response.access_token}; path=/; max-age=86400; samesite=strict`;
      
      AuthService.setAuthToken(response.access_token);
    } catch (error) {
      console.error('Erro no login:', error);
      throw error;
    }
  };

  const register = async (data: RegisterRequest) => {
    try {
      const response = await AuthService.register(data);
      setUser(response.user);
      localStorage.setItem('access_token', response.access_token);
      
      document.cookie = `access_token=${response.access_token}; path=/; max-age=86400; samesite=strict`;
      
      AuthService.setAuthToken(response.access_token);
    } catch (error) {
      console.error('Erro no registro:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('access_token');
    
    document.cookie = 'access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    
    AuthService.removeAuthToken();
  };

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}


