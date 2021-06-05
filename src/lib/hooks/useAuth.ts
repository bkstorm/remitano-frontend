import { useCallback, useState } from 'react';
import jwt from 'jsonwebtoken';

import { User } from '../../graphql/graphql';

const TOKEN_KEY = 'token';

export const useAuth = () => {
  const [user, setUser] = useState<User | undefined>(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    return (token && (jwt.decode(token)! as { user: User }).user) || undefined;
  });

  const saveUser = useCallback((user: User, token: string) => {
    localStorage.setItem(TOKEN_KEY, token);
    setUser(user);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setUser(undefined);
  }, []);

  return {
    user,
    saveUser,
    logout
  };
};
