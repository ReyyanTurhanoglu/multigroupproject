import React from 'react';
import { AuthProvider } from '../context/AuthContext';
import { CartProvider } from '../context/CartContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import './globals.css';

export const metadata = {
    title: 'E-Ticaret Mezuniyet Projesi',
    description: 'MultiAcademy React Foundations Bootcamp Graduation Project',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="tr" className="h-full">
            <body className="flex flex-col min-h-full bg-gray-50 text-gray-900 antialiased">
                <AuthProvider>
                    <CartProvider>
                        <Navbar />
                        <main className="flex-grow mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
                            {children}
                        </main>
                        <Footer />
                    </CartProvider>
                </AuthProvider>
            </body>
        </html>
    );
}