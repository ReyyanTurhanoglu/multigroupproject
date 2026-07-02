'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '../../hooks/useAuth';
import { seedOrders } from '../../lib/seedData';

export default function OrdersPage() {
    const { user } = useAuth();

    // KOŞULLU FİLTRELEME: Yalnızca giriş yapan kullanıcının siparişlerini getiriyoruz
    const userOrders = seedOrders.filter(order => order.user_id === user?.id);

    // Oturum açmış kullanıcıya ait sipariş bulunamadıysa (Boş Durum Tasarımı)
    if (userOrders.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center rounded-3xl bg-white p-12 text-center shadow-sm border border-gray-100 min-h-[50vh]">
                <div className="rounded-full bg-amber-50 p-4 text-amber-600 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.03 0 1.9.693 2.166 1.638m-7.377 12.408-.621 3.276a.75.75 0 0 0 .99.814l3.007-1.204a.75.75 0 0 1 .536 0l3.007 1.204a.75.75 0 0 0 .99-.814l-.621-3.276m-7.377 0A9.017 9.017 0 0 1 12 12.75c1.554 0 3.013.393 4.288 1.085" />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Henüz Bir Siparişiniz Yok</h2>
                <p className="mt-2 text-sm text-gray-500 max-w-sm">
                    Sistemde kayıtlı herhangi bir sipariş izine rastlayamadık. Güvenli alışveriş altyapımızla hemen ilk siparişinizi verebilirsiniz.
                </p>
                <Link href="/products" className="mt-6 inline-flex items-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors">
                    Alışverişe Başla
                </Link>
            </div>
        );
    }

    // Siparişlerin durumuna göre dinamik Tailwind renk sınıfı üreten fonksiyon
    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'processing':
                return 'bg-amber-50 text-amber-700 border-amber-200';
            case 'shipped':
                return 'bg-blue-50 text-blue-700 border-blue-200';
            case 'delivered':
                return 'bg-green-50 text-green-700 border-green-200';
            default:
                return 'bg-gray-50 text-gray-700 border-gray-200';
        }
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Sipariş Geçmişim</h1>
                <p className="mt-2 text-sm text-gray-500">
                    Geçmişte vermiş olduğunuz siparişlerin durumunu ve detaylarını bu ekrandan anlık olarak takip edebilirsiniz.
                </p>
            </div>

            {/* SİPARİŞ KARTLARI LİSTESİ */}
            <div className="space-y-6">
                {userOrders.map((order) => (
                    <div
                        key={order.id}
                        className="overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                    >
                        {/* Üst Bilgi Çubuğu (Order Header) */}
                        <div className="bg-gray-50 px-6 py-4 flex flex-wrap gap-4 items-center justify-between border-b border-gray-100 text-sm">
                            <div className="flex items-center space-x-6">
                                <div>
                                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Sipariş Tarihi</p>
                                    <p className="font-medium text-gray-900 mt-0.5">{order.created_at}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Sipariş No</p>
                                    <p className="font-mono font-bold text-gray-900 mt-0.5">#RTR-{order.id}094</p>
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Toplam Tutar</p>
                                    <p className="font-black text-blue-600 mt-0.5">
                                        {order.total_amount.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
                                    </p>
                                </div>
                            </div>

                            {/* Dinamik Rozet Tanımı */}
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${getStatusStyle(order.status)}`}>
                                <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 animate-pulse" />
                                {order.status}
                            </span>
                        </div>

                        {/* İç Ürün Detayları Döngüsü (Nested List) */}
                        <div className="px-6 py-4 divide-y divide-gray-50">
                            {order.items.map((item, index) => (
                                <div key={index} className="flex justify-between items-center py-4 first:pt-2 last:pb-2">
                                    <div className="min-w-0">
                                        <p className="text-sm font-semibold text-gray-900 truncate">
                                            {item.product_name}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-0.5">
                                            Adet: <span className="font-bold text-gray-700">{item.quantity}</span> x {item.price.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
                                        </p>
                                    </div>
                                    <span className="text-sm font-bold text-gray-900 ml-4">
                                        {(item.price * item.quantity).toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
                                    </span>
                                </div>
                            ))}
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
}