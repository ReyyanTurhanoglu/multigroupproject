'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthSession, ApiResponse } from '../types';


interface AuthContextType {
    user: AuthSession | null;
    isLoading: boolean;
    error: string | null;
    login: (email: string, password: string) => Promise<boolean>;
    register: (name: string, email: string, password: string) => Promise<boolean>;
    logout: () => Promise<void>;
    clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<AuthSession | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true); // İlk başta oturum kontrol ediliyor
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        async function checkSession() {
            try {
                const res = await fetch('/api/session', { credentials: 'same-origin' });
                if (res.ok) {
                    const json: ApiResponse<AuthSession> = await res.json();
                    if (json.success && json.data) setUser(json.data);
                }
            } catch (err) {
                console.error('Oturum kontrol edilirken hata oluştu:', err);
            } finally {
                setIsLoading(false);
            }
        }
        checkSession();
    }, []);


    const login = async (email: string, password: string): Promise<boolean> => {
        setIsLoading(true);
        setError(null);
        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                credentials: 'same-origin',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const json: ApiResponse<AuthSession> = await res.json();
            if (res.ok && json.success && json.data) {
                setUser(json.data);
                return true;
            } else {
                setError(json.error || 'Giriş başarısız.');
                return false;
            }
        } catch (err) {
            setError('Giriş işlemi sırasında teknik bir hata oluştu.');
            return false;
        } finally {
            setIsLoading(false);
        }
    };


    const register = async (name: string, email: string, password: string): Promise<boolean> => {
        setIsLoading(true);
        setError(null);
        try {
            const res = await fetch('/api/register', {
                method: 'POST',
                credentials: 'same-origin',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            });
            const json: ApiResponse<AuthSession> = await res.json();
            if (res.ok && json.success && json.data) {
                setUser(json.data);
                return true;
            } else {
                setError(json.error || 'Kayıt başarısız.');
                return false;
            }
        } catch (err) {
            setError('Kayıt işlemi sırasında teknik bir hata oluştu.');
            return false;
        } finally {
            setIsLoading(false);
        }
    };


    const logout = async (): Promise<void> => {
        setIsLoading(true);
        try {
            await fetch('/api/logout', { method: 'POST', credentials: 'same-origin' });
            setUser(null);
            setError(null);
        } catch (err) {
            console.error('Çıkış yapılırken hata oluştu:', err);
        } finally {
            setIsLoading(false);
        }
    };


    const clearError = () => setError(null);

    return (
        <AuthContext.Provider value={{ user, isLoading, error, login, register, logout, clearError }}>
            {children}
        </AuthContext.Provider>
    );
};


export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth mutlaka bir AuthProvider bileşeni içinde kullanılmalıdır.');
    }
    return context;
};