import React from 'react';
import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="max-w-2xl mx-auto text-center py-16">
            <div className="rounded-full bg-amber-50 p-4 text-amber-600 mb-4 inline-block">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.12-3.381-3.12 3.381 5.227-7.917-.569 9.47-2.51-2.225zM12 2.25V4.5m5.834.166-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243-1.59-1.59" />
                </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Ürün Bulunamadı</h1>
            <p className="text-gray-600 mb-6 max-w-sm mx-auto">
                Aradığınız ürün mevcut değil veya kaldırılmış olabilir. Diğer ürünlerimizi keşfetmek için kataloğumuza göz atın.
            </p>
            <Link
                href="/products"
                className="inline-flex items-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors"
            >
                Ürün Kataloğuna Dön
            </Link>
        </div>
    );
}
