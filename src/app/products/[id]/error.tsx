'use client';

import React from 'react';
import { useEffect } from 'react';

export default function ProductDetailError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error('Product detail error:', error);
    }, [error]);

    return (
        <div className="max-w-2xl mx-auto text-center py-16">
            <div className="rounded-full bg-red-50 p-4 text-red-600 mb-4 inline-block">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ürün Detayları Yüklenemedi</h2>
            <p className="text-gray-600 mb-6 max-w-sm mx-auto">
                Ürün bilgileri getirilirken bir hata oluştu. Lütfen tekrar deneyin.
            </p>
            <div className="flex gap-3 justify-center">
                <button
                    onClick={() => reset()}
                    className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
                >
                    Tekrar Dene
                </button>
                <button
                    onClick={() => window.location.href = '/products'}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200"
                >
                    Ürünlere Dön
                </button>
            </div>
        </div>
    );
}
