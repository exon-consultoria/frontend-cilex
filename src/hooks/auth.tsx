/* eslint-disable camelcase */
import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  avatar_url: string;

  group_id: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  username: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  updateUser(user: User): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@Cilex:token');
    const user = localStorage.getItem('@Cilex:user');

    if (token && user) {
      api.defaults.headers.Authorization = `Bearer ${token}`;

      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signOut = useCallback(() => {
    localStorage.removeItem('@Cilex:token');
    localStorage.removeItem('@Cilex:user');
    localStorage.removeItem('@Cilex:companySelected');

    setData({} as AuthState);
  }, []);

  const signIn = useCallback(async ({ username, password }: any) => {
    const response = await api.post('sessions', {
      username,
      password,
    });

    const { token, user } = response.data;

    localStorage.setItem('@Cilex:token', token);
    localStorage.setItem('@Cilex:user', JSON.stringify(user));

    api.defaults.headers.Authorization = `Bearer ${token}`;

    setData({ token, user });
  }, []);

  const updateUser = useCallback(
    (user: User) => {
      localStorage.setItem('@Cilex:user', JSON.stringify(user));

      setData({
        token: data.token,
        user,
      });
    },
    [setData, data.token],
  );

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
