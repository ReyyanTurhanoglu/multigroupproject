'use client';

import React from 'react';
import { useEffect } from 'react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error('Application error:', error);
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] rounded-3xl bg-white p-12 text-center shadow-sm border border-gray-100">
            <div className="rounded-full bg-red-50 p-4 text-red-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Bir Hata Oluştu</h2>
            <p className="text-sm text-gray-500 max-w-sm mb-6">
                Uygulamada beklenmedik bir hata oluştu. Lütfen sayfayı yenileyin veya daha sonra tekrar deneyin.
            </p>
            <div className="flex gap-3">
                <button
                    onClick={() => reset()}
                    className="inline-flex items-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors"
                >
                    Sayfayı Yenile
                </button>
                <button
                    onClick={() => window.location.href = '/'}
                    className="inline-flex items-center rounded-xl bg-gray-100 px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-200 transition-colors"
                >
                    Ana Sayfaya Dön
                </button>
            </div>
        </div>
    );
}
