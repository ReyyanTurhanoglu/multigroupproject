'use client';

import React from 'react';
import Link from 'next/link';
import { Product } from '../types';

interface ProductCardProps {
    product: Product;
    onAddToCart: (productId: number) => void;
}

function ProductCard({ product, onAddToCart }: ProductCardProps) {
    return (
        <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-white p-4 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-200">
            <Link href={`/products/${product.id}`} className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-xl bg-gray-100 group-hover:opacity-90">
                <img src={product.image_url} alt={product.name} className="h-44 w-full object-cover object-center" />
            </Link>
            <div className="mt-4 flex flex-col flex-grow">
                <Link href={`/products/${product.id}`}>
                    <h3 className="text-sm font-semibold text-gray-900 line-clamp-1 hover:text-blue-600 transition-colors">{product.name}</h3>
                </Link>
                <p className="mt-1 text-xs text-gray-500 line-clamp-2 flex-grow">{product.description}</p>
                <p className="mt-3 text-base font-black text-gray-900">{product.price.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}</p>
            </div>
            <div className="mt-4">
                <button onClick={() => onAddToCart(product.id)} className="flex w-full items-center justify-center rounded-xl bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-200">Sepete Ekle</button>
            </div>
        </div>
    );
}

export default React.memo(ProductCard);
