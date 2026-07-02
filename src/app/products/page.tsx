"use client";

import React, { useState, useMemo, useCallback, lazy, Suspense, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { Product } from '../../types';
import { seedProducts, seedCategories, getStoredProducts } from '../../lib/seedData';
import { useCart } from '../../hooks/useCart';

// Lazy loading for ProductCard component - loaded only when needed
const ProductCard = lazy(() => import('../../components/ProductCard'));

export default function ProductsPage() {
    const { addToCart } = useCart();
    const router = useRouter();
    const searchParams = useSearchParams();

    const categoryParam = searchParams.get('category');

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<number | null>(
        categoryParam ? parseInt(categoryParam) : null
    );
    const [sortBy, setSortBy] = useState<string>('default');
    const [products, setProducts] = useState<Product[]>(seedProducts);

    // LocalStorage'dan ürünleri yükle (admin tarafından eklenen ürünleri görmek için)
    useEffect(() => {
        const storedProducts = getStoredProducts();
        setProducts(storedProducts);
    }, []);

    React.useEffect(() => {
        if (categoryParam) {
            setSelectedCategory(parseInt(categoryParam));
        } else {
            setSelectedCategory(null);
        }
    }, [categoryParam]);

    const filteredAndSortedProducts = useMemo(() => {
        let result = [...products];
        if (selectedCategory !== null) {
            result = result.filter(product => product.category_id === selectedCategory);
        }
        if (searchTerm.trim() !== '') {
            const term = searchTerm.toLowerCase();
            result = result.filter(
                product =>
                    product.name.toLowerCase().includes(term) ||
                    product.description?.toLowerCase().includes(term)
            );
        }
        if (sortBy === 'price-asc') {
            result.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'price-desc') {
            result.sort((a, b) => b.price - a.price);
        }
        return result;
    }, [searchTerm, selectedCategory, sortBy, products]);

    const handleResetFilters = useCallback(() => {
        setSearchTerm('');
        setSelectedCategory(null);
        setSortBy('default');
        router.push('/products');
    }, [router]);

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Ürün Kataloğu</h1>
                <p className="mt-2 text-sm text-gray-500">
                    Geniş ürün yelpazemizde arama yapabilir, kategorilere göre süzebilir ve fiyatları sıralayabilirsiniz.
                </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-2xl bg-white p-4 shadow-sm border border-gray-100">
                <div className="relative flex-1">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Ürün adı veya açıklama ara..."
                        className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </div>

                <div className="flex items-center space-x-2">
                    <label htmlFor="sort" className="text-sm font-medium text-gray-600 shrink-0">Sırala:</label>
                    <select
                        id="sort"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="rounded-xl border border-gray-300 bg-gray-50 px-3 py-2.5 text-sm font-medium text-gray-700 focus:border-blue-500 focus:bg-white focus:outline-none"
                    >
                        <option value="default">Önerilen</option>
                        <option value="price-asc">Fiyat: Düşükten Yükseğe</option>
                        <option value="price-desc">Fiyat: Yüksekten Düşüğe</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                <div className="space-y-6">
                    <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100 space-y-4">
                        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Kategoriler</h2>
                        <div className="flex flex-wrap gap-2 lg:flex-col lg:gap-1">
                            <button
                                onClick={() => { setSelectedCategory(null); router.push('/products'); }}
                                className={`flex w-full items-center rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${selectedCategory === null
                                    ? 'bg-blue-600 text-white shadow-sm'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                            >
                                Tüm Ürünler
                            </button>
                            {seedCategories.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => {
                                        setSelectedCategory(category.id);
                                        router.push(`/products?category=${category.id}`);
                                    }}
                                    className={`flex w-full items-center rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${selectedCategory === category.id
                                        ? 'bg-blue-600 text-white shadow-sm'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                        }`}
                                >
                                    {category.name}
                                </button>
                            ))}
                        </div>

                        {(selectedCategory !== null || searchTerm !== '' || sortBy !== 'default') && (
                            <button
                                onClick={handleResetFilters}
                                className="w-full rounded-xl border border-dashed border-gray-300 py-2 text-xs font-semibold text-gray-500 hover:border-red-500 hover:text-red-500 transition-colors"
                            >
                                Filtreleri Temizle
                            </button>
                        )}
                    </div>
                </div>

                <div className="lg:col-span-3">
                    {filteredAndSortedProducts.length === 0 ? (
                        <div className="rounded-2xl bg-white border border-dashed border-gray-200 py-16 text-center">
                            <h3 className="mt-4 text-sm font-semibold text-gray-900">Ürün Bulunamadı</h3>
                        </div>
                    ) : (
                        <Suspense fallback={<div className="text-center text-gray-500">Ürünler yükleniyor...</div>}>
                            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 xl:grid-cols-3">
                                {filteredAndSortedProducts.map((product) => (
                                    <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
                                ))}
                            </div>
                        </Suspense>
                    )}
                </div>
            </div>
        </div>
    );
}
