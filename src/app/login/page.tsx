"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../hooks/useAuth';

export default function LoginPage() {
    const router = useRouter();
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        const ok = await login(email, password);
        if (ok) router.push('/');
        else setError('Giriş başarısız. Lütfen bilgilerinizi kontrol edin.');
    };

    return (
        <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4">Giriş Yap</h1>
            {error && <div className="mb-4 text-red-600">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-posta" className="w-full rounded border px-3 py-2" />
                <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Şifre" type="password" className="w-full rounded border px-3 py-2" />
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Giriş</button>
            </form>
        </div>
    );
}