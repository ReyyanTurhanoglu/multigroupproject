'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Product } from '../../types';
import { seedProducts, seedOrders, seedCategories, setStoredProducts, getStoredProducts } from '../../lib/seedData';

export default function AdminPage() {

    const [products, setProducts] = useState<Product[]>([]);


    useEffect(() => {
        const storedProducts = getStoredProducts();
        setProducts(storedProducts);
    }, []);


    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [categoryId, setCategoryId] = useState(seedCategories[0]?.id || 1);
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [stock, setStock] = useState('');
    const [formError, setFormError] = useState<string | null>(null);
    const [formSuccess, setFormSuccess] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState<string | null>(null);


    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [editName, setEditName] = useState('');
    const [editPrice, setEditPrice] = useState('');
    const [editCategoryId, setEditCategoryId] = useState(seedCategories[0]?.id || 1);
    const [editDescription, setEditDescription] = useState('');
    const [editImageUrl, setEditImageUrl] = useState('');
    const [editStock, setEditStock] = useState('');
    const [editFormError, setEditFormError] = useState<string | null>(null);
    const [editFormSuccess, setEditFormSuccess] = useState<string | null>(null);
    const [isEditUploading, setIsEditUploading] = useState(false);
    const [editUploadProgress, setEditUploadProgress] = useState<string | null>(null);


    const metrics = useMemo(() => {
        const totalEarnings = seedOrders.reduce((sum, order) => sum + order.total_amount, 0);
        const totalOrders = seedOrders.length;
        const totalProducts = products.length;

        return { totalEarnings, totalOrders, totalProducts };
    }, [products]);


    const handleAddProduct = (e: React.FormEvent) => {
        e.preventDefault();
        setFormError(null);
        setFormSuccess(null);


        if (!name.trim() || !price.trim() || !description.trim() || !stock.trim()) {
            setFormError('Lütfen ürün adı, fiyatı, stok ve açıklamasını eksiksiz doldurunuz.');
            return;
        }

        const parsedPrice = parseFloat(price);
        if (isNaN(parsedPrice) || parsedPrice <= 0) {
            setFormError('Lütfen geçerli ve pozitif bir fiyat giriniz.');
            return;
        }

        const parsedStock = parseInt(stock);
        if (isNaN(parsedStock) || parsedStock < 0) {
            setFormError('Lütfen geçerli ve pozitif bir stok miktarı giriniz.');
            return;
        }


        const newProduct = {
            id: products.length + 1,
            name: name.trim(),
            price: parsedPrice,
            category_id: Number(categoryId),
            description: description.trim(),
            image_url: imageUrl.trim() || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
            stock: parsedStock,
            is_featured: true,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        };


        const updatedProducts = [newProduct as Product, ...products];
        setProducts(updatedProducts);


        setStoredProducts(updatedProducts);



        setName('');
        setPrice('');
        setDescription('');
        setImageUrl('');
        setStock('');
        setFormSuccess('Harika! Yeni ürün sisteme başarıyla eklendi ve vitrinde listelendi.');
    };


    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        setUploadProgress('Dosya yükleniyor...');

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (response.ok && data.imageUrl) {
                setImageUrl(data.imageUrl);
                setUploadProgress(null);
                setFormSuccess('✅ Görsel başarıyla yüklendi!');
            } else {
                setUploadProgress(null);
                setFormError(`❌ ${data.error || 'Yükleme başarısız'}`);
            }
        } catch (error) {
            setUploadProgress(null);
            setFormError('❌ Yükleme sırasında bir hata oluştu');
            console.error('Upload error:', error);
        } finally {
            setIsUploading(false);
            // Input'u sıfırla (aynı dosya tekrar seçilebilsin)
            e.target.value = '';
        }
    };


    const handleStartEdit = (product: Product) => {
        setEditingProduct(product);
        setEditName(product.name);
        setEditPrice(product.price.toString());
        setEditCategoryId(product.category_id);
        setEditDescription(product.description || '');
        setEditImageUrl(product.image_url || '');
        setEditStock(product.stock?.toString() || '0');
        setEditFormError(null);
        setEditFormSuccess(null);
    };

    const handleUpdateProduct = (e: React.FormEvent) => {
        e.preventDefault();
        setEditFormError(null);
        setEditFormSuccess(null);

        if (!editName.trim() || !editPrice.trim() || !editDescription.trim() || !editStock.trim()) {
            setEditFormError('Lütfen tüm alanları eksiksiz doldurunuz.');
            return;
        }

        const parsedPrice = parseFloat(editPrice);
        if (isNaN(parsedPrice) || parsedPrice <= 0) {
            setEditFormError('Lütfen geçerli ve pozitif bir fiyat giriniz.');
            return;
        }

        const parsedStock = parseInt(editStock);
        if (isNaN(parsedStock) || parsedStock < 0) {
            setEditFormError('Lütfen geçerli ve pozitif bir stok miktarı giriniz.');
            return;
        }

        if (!editingProduct) return;

        const updatedProduct = {
            ...editingProduct,
            name: editName.trim(),
            price: parsedPrice,
            category_id: Number(editCategoryId),
            description: editDescription.trim(),
            image_url: editImageUrl.trim() || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
            stock: parsedStock,
            updated_at: new Date().toISOString()
        };

        const updatedProducts = products.map(p => p.id === editingProduct.id ? updatedProduct as Product : p);
        setProducts(updatedProducts);
        setStoredProducts(updatedProducts);

        setEditFormSuccess('Ürün başarıyla güncellendi!');
        setTimeout(() => {
            setEditingProduct(null);
            setEditFormSuccess(null);
        }, 1500);
    };


    const handleCancelEdit = () => {
        setEditingProduct(null);
        setEditFormError(null);
        setEditFormSuccess(null);
    };


    const handleEditFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsEditUploading(true);
        setEditUploadProgress('Dosya yükleniyor...');

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (response.ok && data.imageUrl) {
                setEditImageUrl(data.imageUrl);
                setEditUploadProgress(null);
                setEditFormSuccess('✅ Görsel başarıyla yüklendi!');
            } else {
                setEditUploadProgress(null);
                setEditFormError(`❌ ${data.error || 'Yükleme başarısız'}`);
            }
        } catch (error) {
            setEditUploadProgress(null);
            setEditFormError('❌ Yükleme sırasında bir hata oluştu');
            console.error('Upload error:', error);
        } finally {
            setIsEditUploading(false);
            e.target.value = '';
        }
    };

    return (
        <div className="space-y-10">
            <div>
                <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Yönetim (Admin) Paneli</h1>
                <p className="mt-2 text-sm text-gray-500">
                    Sistemdeki metrikleri inceleyebilir, envantere yeni ürünler ekleyebilir ve mevcut ürünleri yönetebilirsiniz.
                </p>
            </div>

            {/* 1. KATMAN: METRİK KARTLARI */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                {/* Kazanç Kartı */}
                <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100 flex items-center space-x-4">
                    <div className="rounded-xl bg-green-50 p-3 text-green-600">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.559c.211.135.442.21.678.223m0-11.181a4.5 4.5 0 0 1 1.907 1.077M14.121 8.021a4.5 4.5 0 0 0-1.907-1.077m0 11.182a4.5 4.5 0 0 1-1.907-1.077m1.907 1.077a4.5 4.5 0 0 0 1.907-1.077M14.121 15.979c.382-.228.656-.605.736-1.046M6.165 5.304A12.073 12.073 0 0 0 12 3c1.739 0 3.358.362 4.835 1.015m-11.13 13.047A12.072 12.072 0 0 0 12 21c1.739 0 3.358-.362 4.835-1.015M10 5h4M10 19h4M5 12h14" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Toplam Ciro</p>
                        <p className="text-2xl font-black text-gray-900 mt-0.5">
                            {metrics.totalEarnings.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
                        </p>
                    </div>
                </div>

                {/* Sipariş Sayısı Kartı */}
                <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100 flex items-center space-x-4">
                    <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Gelen Sipariş</p>
                        <p className="text-2xl font-black text-gray-900 mt-0.5">{metrics.totalOrders} Adet</p>
                    </div>
                </div>

                {/* Envanter Kartı */}
                <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100 flex items-center space-x-4">
                    <div className="rounded-xl bg-purple-50 p-3 text-purple-600">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Kayıtlı Ürün</p>
                        <p className="text-2xl font-black text-gray-900 mt-0.5">{metrics.totalProducts} Çeşit</p>
                    </div>
                </div>
            </div>

            {/* 2. KATMAN: YENİ ÜRÜN EKLEME FORMU */}
            <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
                <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3">Envantere Yeni Ürün Ekle</h2>

                <form onSubmit={handleAddProduct} className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {formError && <div className="sm:col-span-2 rounded-xl bg-red-50 p-4 text-xs font-semibold text-red-700">⚠️ {formError}</div>}
                    {formSuccess && <div className="sm:col-span-2 rounded-xl bg-green-50 p-4 text-xs font-semibold text-green-700">✅ {formSuccess}</div>}

                    <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wider">Ürün Adı *</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Örn: Kablosuz Mouse" className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm" />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wider">Fiyat (TL) *</label>
                        <input type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="850.00" className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm" />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wider">Kategori *</label>
                        <select value={categoryId} onChange={(e) => setCategoryId(Number(e.target.value))} className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm bg-white">
                            {seedCategories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wider">Stok Miktarı *</label>
                        <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} placeholder="50" className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm" />
                    </div>

                    <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wider">Ürün Görseli</label>
                        <div className="flex gap-2">
                            <label className="flex-1 relative cursor-pointer">
                                <div className="w-full rounded-xl border-2 border-dashed border-gray-300 px-3 py-4 text-center hover:border-blue-400 hover:bg-blue-50 transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mx-auto text-gray-400 mb-1">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33A3 3 0 0116.5 19.5H6.75z" />
                                    </svg>
                                    <p className="text-xs font-semibold text-gray-600">
                                        {isUploading ? uploadProgress : 'Masaüstünden görsel seç'}
                                    </p>
                                    <p className="text-xs text-gray-400 mt-1">JPG, PNG, GIF, WEBP (Max 5MB)</p>
                                </div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileUpload}
                                    disabled={isUploading}
                                    className="hidden"
                                />
                            </label>
                            <div className="flex-1 relative">
                                <input
                                    type="text"
                                    value={imageUrl}
                                    onChange={(e) => setImageUrl(e.target.value)}
                                    placeholder="veya URL gir..."
                                    className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm"
                                />
                            </div>
                        </div>
                        {imageUrl && (
                            <div className="mt-2 rounded-lg border border-gray-200 p-2 bg-gray-50">
                                <img src={imageUrl} alt="Önizleme" className="h-24 w-24 object-cover rounded-lg mx-auto" />
                            </div>
                        )}
                    </div>

                    <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wider">Ürün Açıklaması *</label>
                        <textarea rows={3} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Ürün detayları ve teknik özellikleri..." className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm" />
                    </div>

                    <div className="sm:col-span-2 flex justify-end">
                        <button type="submit" className="rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 shadow-md">
                            Ürünü Envantere Kaydet
                        </button>
                    </div>
                </form>
            </div>

            {/* 3. KATMAN: MEVCUT ÜRÜNLER TABLOSU */}
            <div className="rounded-2xl bg-white shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                    <h2 className="text-lg font-bold text-gray-900">Mevcut Ürün Listesi</h2>
                    {editingProduct && (
                        <button
                            onClick={handleCancelEdit}
                            className="text-sm text-gray-500 hover:text-gray-700"
                        >
                            Düzenlemeyi İptal Et
                        </button>
                    )}
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-500">
                        <thead className="bg-gray-50 text-xs text-gray-700 uppercase font-bold border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-3">Görsel</th>
                                <th className="px-6 py-3">Ürün Adı</th>
                                <th className="px-6 py-3">Kategori</th>
                                <th className="px-6 py-3">Fiyat</th>
                                <th className="px-6 py-3">Stok</th>
                                <th className="px-6 py-3">İşlemler</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {products.map((product) => {
                                const categoryName = seedCategories.find(c => c.id === product.category_id)?.name || 'Genel';
                                const isEditing = editingProduct?.id === product.id;
                                return (
                                    <tr key={product.id} className={isEditing ? 'bg-blue-50' : 'hover:bg-gray-50/50 transition-colors'}>
                                        <td className="px-6 py-3">
                                            <img src={product.image_url} alt={product.name} className="w-10 h-10 rounded-lg object-cover" />
                                        </td>
                                        <td className="px-6 py-3 font-semibold text-gray-900">{product.name}</td>
                                        <td className="px-6 py-3 text-xs font-medium text-gray-600">{categoryName}</td>
                                        <td className="px-6 py-3 font-mono font-bold text-gray-900">
                                            {product.price.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
                                        </td>
                                        <td className="px-6 py-3">
                                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border ${(product.stock || 0) > 0
                                                    ? 'bg-green-50 text-green-700 border-green-200'
                                                    : 'bg-red-50 text-red-700 border-red-200'
                                                }`}>
                                                {(product.stock || 0) > 0 ? `${product.stock} Adet` : 'Stokta Yok'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-3">
                                            <button
                                                onClick={() => handleStartEdit(product)}
                                                className="text-blue-600 hover:text-blue-800 font-medium text-xs"
                                            >
                                                Düzenle
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 4. KATMAN: ÜRÜN DÜZENLEME FORMU (Modal) */}
            {editingProduct && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-100">
                            <h2 className="text-lg font-bold text-gray-900">Ürün Düzenle: {editingProduct.name}</h2>
                        </div>
                        <form onSubmit={handleUpdateProduct} className="p-6 space-y-4">
                            {editFormError && <div className="rounded-xl bg-red-50 p-4 text-xs font-semibold text-red-700">⚠️ {editFormError}</div>}
                            {editFormSuccess && <div className="rounded-xl bg-green-50 p-4 text-xs font-semibold text-green-700">✅ {editFormSuccess}</div>}

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wider">Ürün Adı *</label>
                                    <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wider">Fiyat (TL) *</label>
                                    <input type="number" step="0.01" value={editPrice} onChange={(e) => setEditPrice(e.target.value)} className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wider">Kategori *</label>
                                    <select value={editCategoryId} onChange={(e) => setEditCategoryId(Number(e.target.value))} className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm bg-white">
                                        {seedCategories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wider">Stok Miktarı *</label>
                                    <input type="number" value={editStock} onChange={(e) => setEditStock(e.target.value)} className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wider">Ürün Görseli</label>
                                <div className="flex gap-2">
                                    <label className="flex-1 relative cursor-pointer">
                                        <div className="w-full rounded-xl border-2 border-dashed border-gray-300 px-3 py-4 text-center hover:border-blue-400 hover:bg-blue-50 transition-colors">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mx-auto text-gray-400 mb-1">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33A3 3 0 0116.5 19.5H6.75z" />
                                            </svg>
                                            <p className="text-xs font-semibold text-gray-600">
                                                {isEditUploading ? editUploadProgress : 'Masaüstünden görsel seç'}
                                            </p>
                                            <p className="text-xs text-gray-400 mt-1">JPG, PNG, GIF, WEBP (Max 5MB)</p>
                                        </div>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleEditFileUpload}
                                            disabled={isEditUploading}
                                            className="hidden"
                                        />
                                    </label>
                                    <div className="flex-1 relative">
                                        <input
                                            type="text"
                                            value={editImageUrl}
                                            onChange={(e) => setEditImageUrl(e.target.value)}
                                            placeholder="veya URL gir..."
                                            className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm"
                                        />
                                    </div>
                                </div>
                                {editImageUrl && (
                                    <div className="mt-2 rounded-lg border border-gray-200 p-2 bg-gray-50">
                                        <img src={editImageUrl} alt="Önizleme" className="h-24 w-24 object-cover rounded-lg mx-auto" />
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wider">Ürün Açıklaması *</label>
                                <textarea rows={3} value={editDescription} onChange={(e) => setEditDescription(e.target.value)} className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm" />
                            </div>

                            <div className="flex gap-3 justify-end pt-4">
                                <button
                                    type="button"
                                    onClick={handleCancelEdit}
                                    className="rounded-xl bg-gray-100 px-6 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-200"
                                >
                                    İptal
                                </button>
                                <button
                                    type="submit"
                                    className="rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                                >
                                    Güncelle
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}