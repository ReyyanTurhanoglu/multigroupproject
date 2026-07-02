'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '../../hooks/useCart';

export default function CartPage() {
    const { cartDetailed, totalAmount, updateQuantity, removeFromCart, clearCart } = useCart();
    const router = useRouter();

    // Sabit kargo ve vergi oranları hesabı 
    const shippingCost = totalAmount > 500 ? 0 : 35; // 500 TL üzeri kargo bedava
    const taxCost = totalAmount * 0.20; // %20 KDV dahil hesabı
    const finalTotal = totalAmount + shippingCost;

    if (cartDetailed.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center rounded-3xl bg-white p-12 text-center shadow-sm border border-gray-100 min-h-[50vh]">
                <div className="rounded-full bg-blue-50 p-4 text-blue-600 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Alışveriş Sepetiniz Boş</h2>
                <p className="mt-2 text-sm text-gray-500 max-w-sm">
                    Sepetinizde henüz bir ürün bulunmuyor. Kataloğumuza göz atarak harika ürünleri keşfedebilirsiniz.
                </p>
                <Link href="/products" className="mt-6 inline-flex items-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors">
                    Alışverişe Devam Et
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Alışveriş Sepetim</h1>
                <button
                    onClick={clearCart}
                    className="text-sm font-medium text-red-600 hover:text-red-500 transition-colors"
                >
                    Sepeti Tamamen Temizle
                </button>
            </div>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-12">
                {/* SOL TARAF: SEPETTEKİ ÜRÜN LİSTESİ */}
                <div className="lg:col-span-7 space-y-4">
                    {cartDetailed.map((item) => (
                        <div
                            key={item.product.id}
                            className="flex items-center space-x-4 rounded-2xl bg-white p-4 shadow-sm border border-gray-100"
                        >
                            {/* Ürün Görseli */}
                            <img
                                src={item.product.image_url}
                                alt={item.product.name}
                                className="h-20 w-20 rounded-xl object-cover object-center bg-gray-50 shrink-0"
                            />

                            {/* Ürün Bilgileri */}
                            <div className="flex-1 min-w-0">
                                <h3 className="text-sm font-semibold text-gray-900 truncate">
                                    {item.product.name}
                                </h3>
                                <p className="text-xs text-gray-500 mt-0.5">
                                    Birim Fiyat: {item.product.price.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
                                </p>
                                <p className="text-sm font-bold text-blue-600 mt-2">
                                    Ara Toplam: {(item.product.price * item.quantity).toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
                                </p>
                            </div>

                            {/* Miktar Kontrolleri (+ / - Butonları) */}
                            <div className="flex items-center space-x-2 border border-gray-200 rounded-xl p-1 bg-gray-50">
                                <button
                                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                    className="p-1 rounded-lg text-gray-500 hover:bg-white hover:text-gray-900 transition-all"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                                    </svg>
                                </button>
                                <span className="text-sm font-bold text-gray-900 px-2 min-w-[20px] text-center">
                                    {item.quantity}
                                </span>
                                <button
                                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                    className="p-1 rounded-lg text-gray-500 hover:bg-white hover:text-gray-900 transition-all"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                </button>
                            </div>

                            {/* Silme Butonu */}
                            <button
                                onClick={() => removeFromCart(item.product.id)}
                                className="p-2 text-gray-400 hover:text-red-600 rounded-xl hover:bg-red-50 transition-all"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                            </button>

                        </div>
                    ))}
                </div>

                {/* SAĞ TARAF: SİPARİŞ ÖZETİ PANELİ */}
                <div className="lg:col-span-5">
                    <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100 space-y-4">
                        <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3">Sipariş Özeti</h2>

                        <div className="space-y-2 text-sm text-gray-600">
                            <div className="flex justify-between">
                                <span>Ara Toplam</span>
                                <span className="font-semibold text-gray-900">{totalAmount.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Kargo Ücreti</span>
                                <span>{shippingCost === 0 ? <span className="text-green-600 font-bold">Bedava</span> : `${shippingCost} TL`}</span>
                            </div>
                            <div className="flex justify-between text-xs text-gray-400">
                                <span>Tahmini KDV (%20)</span>
                                <span>{taxCost.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })} (Dahil)</span>
                            </div>
                        </div>

                        <div className="border-t border-gray-100 pt-4 flex justify-between text-base font-black text-gray-900">
                            <span>Genel Toplam</span>
                            <span className="text-xl text-blue-600">{finalTotal.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}</span>
                        </div>

                        {shippingCost > 0 && (
                            <p className="text-xs text-amber-600 bg-amber-50 p-2.5 rounded-lg font-medium">
                                💡 <span className="font-bold">Bilgi:</span> 500 TL ve üzeri alışverişlerinizde kargo ücretsiz!
                            </p>
                        )}

                        <button
                            onClick={() => router.push('/checkout')}
                            className="w-full flex justify-center items-center rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white shadow-md hover:bg-blue-700 transition-colors"
                        >
                            Alışverişi Tamamla &rarr;
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}