import { createContext, useContext, useState, useEffect } from 'react';
import { adminLogin, getAdminProfile } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      getAdminProfile()
        .then((res) => setAdmin(res.data))
        .catch(() => localStorage.removeItem('adminToken'))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const res = await adminLogin({ email, password });
    localStorage.setItem('adminToken', res.data.token);
    setAdmin(res.data);
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
