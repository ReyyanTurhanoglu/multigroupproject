'use server';

import { cookies } from 'next/headers';
// İki klasör yukarı çık (lib/ ve src/ dizinlerini geç), types klasörüne gir:
import { User, ApiResponse, AuthSession } from '../../types';

// LocalStorage'dan kullanıcıları getiren yardımcı fonksiyon
function getUsersFromStorage(): User[] {
    try {
        const cookieStore = cookies();
        const usersCookie = cookieStore.get('users')?.value;
        if (usersCookie) {
            return JSON.parse(decodeURIComponent(usersCookie));
        }
    } catch (err) {
        console.error('Kullanıcılar yüklenirken hata:', err);
    }
    // Varsayılan kullanıcılar
    return [
        {
            id: 1,
            name: 'Admin Reyyan',
            email: 'admin@reyyan.com',
            password_hash: 'admin123',
            role: 'admin',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        },
        {
            id: 2,
            name: 'Ahmet Yılmaz',
            email: 'ahmet@test.com',
            password_hash: 'user123',
            role: 'user',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        }
    ];
}

// LocalStorage'a kullanıcıları kaydeden yardımcı fonksiyon
function setUsersToStorage(users: User[]): void {
    try {
        const cookieStore = cookies();
        const cookieValue = encodeURIComponent(JSON.stringify(users));
        cookieStore.set('users', cookieValue);
    } catch (err) {
        console.error('Kullanıcılar kaydedilirken hata:', err);
    }
}

// Cookie'den session okuma yardımcı fonksiyonu
function getSessionFromCookie(): AuthSession | null {
    try {
        const cookieStore = cookies();
        const sessionCookie = cookieStore.get('session')?.value;
        if (sessionCookie) {
            return JSON.parse(decodeURIComponent(sessionCookie));
        }
    } catch (err) {
        console.error('Session cookie okuma hatası:', err);
    }
    return null;
}

/**
 * Kullanıcı Kayıt (Register) Aksiyonu
 */
export async function registerAction(name: string, email: string, password: string): Promise<ApiResponse<AuthSession>> {
    try {
        const mockUsersTable = getUsersFromStorage();

        // E-posta benzersizlik kontrolü
        const existingUser = mockUsersTable.find(u => u.email === email);
        if (existingUser) {
            return { data: null, error: 'Bu e-posta adresi zaten kullanımda.', success: false };
        }

        // Yeni kullanıcı nesnesi oluşturma (users tablosu şemasına tam uyumlu)
        const newUser: User = {
            id: mockUsersTable.length + 1,
            name,
            email,
            password_hash: password, // Şifre simülasyonu
            role: 'user',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        };

        mockUsersTable.push(newUser);
        setUsersToStorage(mockUsersTable);

        // Güvenlik için password_hash alanını dışarıda bırakarak session oluşturuyoruz (Omit kullanımı)
        const { password_hash, ...sessionData } = newUser;

        return { data: sessionData, error: null, success: true };
    } catch (error) {
        return { data: null, error: 'Kayıt esnasında beklenmedik bir hata oluştu.', success: false };
    }
}

/**
 * Kullanıcı Giriş (Login) Aksiyonu
 */
export async function loginAction(email: string, password: string): Promise<ApiResponse<AuthSession>> {
    try {
        const mockUsersTable = getUsersFromStorage();
        const user = mockUsersTable.find(u => u.email === email && u.password_hash === password);

        if (!user) {
            return { data: null, error: 'Hatalı e-posta veya şifre girdiniz.', success: false };
        }

        const { password_hash, ...sessionData } = user;

        return { data: sessionData, error: null, success: true };
    } catch (error) {
        return { data: null, error: 'Giriş yapılırken bir hata oluştu.', success: false };
    }
}

/**
 * Oturum Kapatma (Logout) Aksiyonu
 */
export async function logoutAction(): Promise<ApiResponse<null>> {
    // Cookie silme işlemi API route'ta yapılıyor
    return { data: null, error: null, success: true };
}

/**
 * Mevcut Oturumu Getirme Aksiyonu (Middleware ve Context için)
 */
export async function getSessionAction(): Promise<AuthSession | null> {
    return getSessionFromCookie();
}