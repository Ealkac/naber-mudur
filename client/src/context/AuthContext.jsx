import { create } from 'zustand';
import { createContext, useContext } from 'react';
import axiosInstance from '../api/axiosInstance';
import { toast } from 'react-toastify';

const createAuthStore = () =>
  create((set) => ({
    isAuthenticated: !!localStorage.getItem('token'),
    user: JSON.parse(localStorage.getItem('user')) || null,
    isLoading: true,
    token: localStorage.getItem('token'),

    login: async (email, password) => {
      try {
        const response = await axiosInstance.post('/auth/login', { email, password });
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        set({ isAuthenticated: true, user, token });
        toast.success('Login successful!');
        return true;
      } catch (error) {
        console.error('Login error:', error.response?.data || error.message);
        toast.error(error.response?.data?.message || 'Login failed');
        return false;
      }
    },

    register: async (username, email, password) => {
      try {
        const response = await axiosInstance.post('/auth/register', { username, email, password });
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        set({ isAuthenticated: true, user, token });
        toast.success('Registration successful!');
        return true;
      } catch (error) {
        console.error('Register error:', error.response?.data || error.message);
        const errors = error.response?.data?.errors;
        if (errors && Array.isArray(errors)) {
            errors.forEach(err => toast.error(`${err.path}: ${err.message}`));
        } else {
            toast.error(error.response?.data?.message || 'Registration failed');
        }
        return false;
      }
    },

    logout: () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      set({ isAuthenticated: false, user: null, token: null });
    },

    checkAuth: async () => {
      set({ isLoading: true });
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          set({ isAuthenticated: false, user: null, isLoading: false });
          return;
        }
        const response = await axiosInstance.get('/auth/me');
        const { user } = response.data;
        localStorage.setItem('user', JSON.stringify(user));
        set({ isAuthenticated: true, user, isLoading: false });
      } catch (error) {
        console.error('Auth check error:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        set({ isAuthenticated: false, user: null, isLoading: false });
      }
    },
  }));

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const store = createAuthStore();
  // Check auth status on initial load
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => { store.getState().checkAuth(); }, []);
  return <AuthContext.Provider value={store}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const store = useContext(AuthContext);
  if (!store) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return store();
};
