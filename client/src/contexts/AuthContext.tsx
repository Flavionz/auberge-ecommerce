import { createContext } from 'react';

interface AuthContextType {
    isAdmin: boolean;
    setIsAdmin: (isAdmin: boolean) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
    isAdmin: false,
    setIsAdmin: () => {
        console.warn('setIsAdmin called on default context!');
    },
    logout: () => {},
});