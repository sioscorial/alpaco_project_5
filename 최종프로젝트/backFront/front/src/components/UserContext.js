import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const UserContext = createContext(null);
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(() => {
    const storedUserId = localStorage.getItem('userId');
    return storedUserId || null;
  });

  const [accessToken, setAccessToken] = useState(() => {
    const storedAccessToken = localStorage.getItem('accessToken');
    return storedAccessToken || null;
  });



  useEffect(() => {
    const getInfo = async () => {
      if (!accessToken) return;
      try {
        const response = await axios.get('http://112.175.29.231:30001/users/info', {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        });
        const { id } = response.data.data;
        setUserId(id);
        localStorage.setItem('userId', id);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    getInfo();
  }, [accessToken]);

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
    } else {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userId');
    }
  }, [accessToken]);

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Current userId:', userId);
    }
  }, [userId]);

  return (
    <UserContext.Provider value={{ userId, setUserId, accessToken, setAccessToken }}>
      {children}
    </UserContext.Provider>
  );
};