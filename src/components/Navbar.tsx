'use client';

import React, { useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../hooks/useCart';

function Navbar() {
    const { user, logout } = useAuth();
    const { totalItems } = useCart();
    const router = useRouter();

    const handleLogout = useCallback(async () => {
        await logout();
        router.push('/login');
    }, [logout, router]);

    return (
        <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 justify-between items-center">

                    {/* Logo / Marka */}
                    <div className="flex flex-shrink-0 items-center">
                        <Link href="/" className="text-2xl font-black tracking-wider text-blue-600 hover:opacity-90">
                            RETUR<span className="text-gray-800 text-sm font-medium tracking-normal ml-1">Market</span>
                        </Link>
                    </div>

                    {/* Menü Linkleri */}
                    <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                        <Link href="/" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors">
                            Ana Sayfa
                        </Link>
                        <Link href="/products" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors">
                            Tüm Ürünler
                        </Link>
                    </div>

                    {/* Sağ Taraf: Sepet ve Kullanıcı Durumu */}
                    <div className="flex items-center space-x-4">

                        {/* Sepet Butonu ve Dinamik Sayaç (Checklist İsteri) */}
                        <Link href="/cart" className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors">
                            <span className="sr-only">Sepeti Görüntüle</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                            </svg>
                            {totalItems > 0 && (
                                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full animate-pulse">
                                    {totalItems}
                                </span>
                            )}
                        </Link>

                        {/* Giriş Durumuna Göre Koşullu Render (Conditional Rendering İsteri) */}
                        {user ? (
                            <div className="flex items-center space-x-3">
                                <Link href="/profile" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                                    Merhaba, <span className="font-bold text-gray-900">{user.name}</span>
                                </Link>

                                {/* Eğer giriş yapan kişi admin ise Yönetim Paneli linkini göster */}
                                {user.role === 'admin' && (
                                    <Link href="/admin" className="rounded-md bg-amber-500 px-2.5 py-1 text-xs font-semibold text-white shadow-sm hover:bg-amber-600">
                                        Admin
                                    </Link>
                                )}

                                <button
                                    onClick={handleLogout}
                                    className="rounded-md bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
                                >
                                    Çıkış
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-2">
                                <Link href="/login" className="text-sm font-medium text-gray-500 hover:text-blue-600 px-3 py-1.5">
                                    Giriş
                                </Link>
                                <Link href="/register" className="rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors">
                                    Kayıt Ol
                                </Link>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </nav>
    );
}

export default React.memo(Navbar);