
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  joinDate: string;
  articlesCount: number;
  filesCount: number;
  centersCount: number;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const fakeUsers: { [email: string]: User & { password: string } } = {
  'user@test.com': {
    id: '1',
    name: 'محمد أحمد',
    email: 'user@test.com',
    password: '123456',
    role: 'user',
    joinDate: '2024-01-15',
    articlesCount: 5,
    filesCount: 3,
    centersCount: 2
  },
  'admin@test.com': {
    id: '2',
    name: 'أمين الإدارة',
    email: 'admin@test.com',
    password: 'admin123',
    role: 'admin',
    joinDate: '2023-12-01',
    articlesCount: 15,
    filesCount: 10,
    centersCount: 8
  }
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('legalEncyclopedia_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('legalEncyclopedia_user');
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const foundUser = fakeUsers[email];
    if (foundUser && foundUser.password === password) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('legalEncyclopedia_user', JSON.stringify(userWithoutPassword));
      return true;
    }
    return false;
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    if (fakeUsers[email]) {
      return false; // User already exists
    }
    
    const newUser: User = {
      id: String(Date.now()),
      name,
      email,
      role: 'user',
      joinDate: new Date().toISOString().split('T')[0],
      articlesCount: 0,
      filesCount: 0,
      centersCount: 0
    };

    fakeUsers[email] = { ...newUser, password };
    setUser(newUser);
    localStorage.setItem('legalEncyclopedia_user', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('legalEncyclopedia_user');
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
