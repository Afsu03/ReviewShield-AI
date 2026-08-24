import React, { createContext, useContext, useState } from 'react';
import { apiService } from '../services/apiService';

const AuthContext = createContext();

export const INITIAL_USER = {
  id: 'usr-8812',
  name: 'Alex Vance',
  email: 'alex.vance@reviewshield.ai',
  role: 'ADMIN', // Options: CUSTOMER, SELLER, ADMIN
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  token: 'mock-jwt-token-reviewshield-xyz',
  trustReputation: 98
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(INITIAL_USER);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const login = async (email, password, role = 'ADMIN') => {
    const apiResult = await apiService.login(email, password, role);

    let newUser;
    if (apiResult && apiResult.user && apiResult.token) {
      newUser = {
        ...apiResult.user,
        token: apiResult.token,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
      };
    } else {
      newUser = {
        id: `usr-${Math.floor(1000 + Math.random() * 9000)}`,
        name: email.split('@')[0].toUpperCase(),
        email,
        role,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
        token: `jwt-${Date.now()}`,
        trustReputation: role === 'ADMIN' ? 99 : 85
      };
    }

    setUser(newUser);
    setIsAuthenticated(true);
    return newUser;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const switchRole = (newRole) => {
    if (user) {
      setUser(prev => ({ ...prev, role: newRole }));
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

