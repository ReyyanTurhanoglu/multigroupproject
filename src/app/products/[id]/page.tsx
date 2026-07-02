"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { seedProducts, seedCategories, getStoredProducts } from '../../../lib/seedData';
import { useCart } from '../../../hooks/useCart';
import { Product } from '../../../types';

export default function ProductDetailPage() {
    const params = useParams();
    const router = useRouter();
    const { addToCart } = useCart();
    const [products, setProducts] = useState<Product[]>(seedProducts);

    // LocalStorage'dan ürünleri yükle
    useEffect(() => {
        const storedProducts = getStoredProducts();
        setProducts(storedProducts);
    }, []);

    const productId = parseInt(params.id as string);
    const product = products.find(p => p.id === productId);
    const category = product ? seedCategories.find(c => c.id === product.category_id) : null;

    if (!product) {
        return (
            <div className="max-w-2xl mx-auto text-center py-16">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Ürün Bulunamadı</h1>
                <p className="text-gray-600 mb-6">Aradığınız ürün mevcut değil veya kaldırılmış.</p>
                <button 
                    onClick={() => router.push('/products')}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Ürünlere Dön
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto">
            <button 
                onClick={() => router.back()}
                className="mb-6 text-sm text-gray-600 hover:text-blue-600 flex items-center gap-2"
            >
                ← Geri Dön
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Ürün Görseli */}
                <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100">
                    <img 
                        src={product.image_url} 
                        alt={product.name} 
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Ürün Bilgileri */}
                <div className="space-y-6">
                    <div>
                        <span className="inline-block px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full mb-3">
                            {category?.name}
                        </span>
                        <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                    </div>

                    <p className="text-gray-600 leading-relaxed">{product.description}</p>

                    <div className="flex items-baseline gap-3">
                        <span className="text-4xl font-bold text-gray-900">
                            {product.price.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
                        </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span className={`font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {product.stock > 0 ? `${product.stock} adet stokta` : 'Stokta yok'}
                        </span>
                    </div>

                    <div className="pt-6 border-t border-gray-200">
                        <button
                            onClick={() => addToCart(product.id)}
                            disabled={product.stock === 0}
                            className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all ${
                                product.stock > 0
                                    ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl'
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                        >
                            {product.stock > 0 ? 'Sepete Ekle' : 'Stokta Yok'}
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-200">
                        <div className="bg-gray-50 rounded-xl p-4">
                            <p className="text-xs text-gray-500 mb-1">Kategori</p>
                            <p className="font-medium text-gray-900">{category?.name}</p>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-4">
                            <p className="text-xs text-gray-500 mb-1">Ürün ID</p>
                            <p className="font-medium text-gray-900">#{product.id}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
