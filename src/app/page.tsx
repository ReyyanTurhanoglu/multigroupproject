import React from 'react';
import Link from 'next/link';

export default function Home() {
    return (
        <section className="mx-auto max-w-4xl py-16 px-4 text-center">
            <h1 className="text-3xl font-bold mb-4">RETUR Market</h1>
            <p className="text-gray-600 mb-6">E-ticaret uygulaması demo ana sayfası.</p>
            <div className="space-x-3">
                <Link href="/products" className="px-4 py-2 bg-blue-600 text-white rounded">Ürünlere Git</Link>
                <Link href="/cart" className="px-4 py-2 bg-gray-100 rounded">Sepet</Link>
            </div>
        </section>
    );
}
