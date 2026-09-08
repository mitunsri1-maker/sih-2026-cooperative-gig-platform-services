import React, { createContext, useContext, useState, useEffect } from 'react';
import { loadFromStorage, saveToStorage } from '../utils/storage';

const DEMO_USERS = {
  customer: {
    id: 'cust-1',
    name: 'Priya Sharma',
    email: 'priya.sharma@gmail.com',
    phone: '+91 98765 43210',
    role: 'customer',
    address: 'Flat 402, Green Glen Layout, Bellandur, Bengaluru',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    coopMemberSince: '2025-01-15'
  },
  provider: {
    id: 'prov-1',
    name: 'Rajesh Kumar',
    email: 'rajesh.electrician@coserve.org',
    phone: '+91 98450 12345',
    role: 'provider',
    trade: 'Master Electrician',
    avatar: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=150&auto=format&fit=crop&q=80',
    coopMemberSince: '2024-06-10'
  },
  provider2: {
    id: 'prov-2',
    name: 'Anita Devi',
    email: 'anita.cleaning@coserve.org',
    phone: '+91 97312 34567',
    role: 'provider',
    trade: 'Deep Cleaning Specialist',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    coopMemberSince: '2024-08-22'
  },
  admin: {
    id: 'admin-1',
    name: 'Dr. K. S. Rao',
    email: 'board.chair@coserve.coop',
    phone: '+91 80 2555 1212',
    role: 'admin',
    title: 'CoServe Cooperative Oversight Officer',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    coopMemberSince: '2023-11-01'
  }
};

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentRole, setCurrentRole] = useState(() => {
    return loadFromStorage('active_role', 'customer');
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const savedRole = loadFromStorage('active_role', 'customer');
    return DEMO_USERS[savedRole] || DEMO_USERS.customer;
  });

  const switchRole = (roleKey) => {
    if (DEMO_USERS[roleKey]) {
      setCurrentRole(DEMO_USERS[roleKey].role);
      setCurrentUser(DEMO_USERS[roleKey]);
      saveToStorage('active_role', roleKey);
    }
  };

  const loginCustom = (userObj) => {
    setCurrentRole(userObj.role);
    setCurrentUser(userObj);
  };

  return (
    <AuthContext.Provider value={{
      currentRole,
      currentUser,
      switchRole,
      loginCustom,
      availableDemoUsers: DEMO_USERS
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
