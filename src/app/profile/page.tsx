"use client";

import React from 'react';
import { useAuth } from '../../hooks/useAuth';

export default function ProfilePage() {
    const { user } = useAuth();

    if (!user) {
        return (
            <div className="max-w-md mx-auto text-center py-8">
                <p className="text-gray-600">Profil bilgileri yükleniyor...</p>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Profil Bilgileri</h1>
            <div className="bg-white rounded-lg shadow p-6 space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ad Soyad</label>
                    <p className="text-gray-900">{user.name}</p>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">E-posta</label>
                    <p className="text-gray-900">{user.email}</p>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Rol</label>
                    <p className="text-gray-900 capitalize">{user.role === 'admin' ? 'Yönetici' : 'Kullanıcı'}</p>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Kayıt Tarihi</label>
                    <p className="text-gray-900">{new Date(user.created_at).toLocaleDateString('tr-TR')}</p>
                </div>
            </div>
        </div>
    );
}
