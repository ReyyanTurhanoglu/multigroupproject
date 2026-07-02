"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../hooks/useAuth';

export default function RegisterPage() {
    const router = useRouter();
    const { register } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        const ok = await register(name, email, password);
        if (ok) router.push('/');
        else setError('Kayıt başarısız. Lütfen bilgilerinizi kontrol edin.');
    };

    return (
        <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4">Kayıt Ol</h1>
            {error && <div className="mb-4 text-red-600">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="Ad Soyad" 
                    className="w-full rounded border px-3 py-2" 
                    required
                />
                <input 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="E-posta" 
                    className="w-full rounded border px-3 py-2" 
                    required
                />
                <input 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Şifre" 
                    type="password" 
                    className="w-full rounded border px-3 py-2" 
                    required
                />
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Kayıt Ol</button>
            </form>
            <p className="mt-4 text-center text-sm text-gray-600">
                Zaten hesabınız var mı? <a href="/login" className="text-blue-600 hover:underline">Giriş Yap</a>
            </p>
        </div>
    );
}
