import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [authToken, setAuthToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (authToken) {
      fetchUser();
    }
  }, [authToken]);

  const fetchUser = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/auth/me', {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      setUser(res.data);
    } catch (err) {
      console.error('Failed to fetch user', err);
      logout();
    }
  };

  const login = async (email, password) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { 
        email, 
        password 
      });
      
      localStorage.setItem('token', res.data.token);
      setAuthToken(res.data.token);
      navigate('/');
      return { success: true };
    } catch (err) {
      return { 
        success: false, 
        error: err.response?.data?.message || 'Ошибка авторизации' 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuthToken(null);
    setUser(null);
    navigate('http://localhost:5000/login');
  };

  return (
    <AuthContext.Provider value={{ authToken, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext)
}