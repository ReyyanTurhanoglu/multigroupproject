'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../hooks/useAuth';
import { seedOrders } from '../../lib/seedData';

export default function CheckoutPage() {
    const { cartDetailed, totalAmount, clearCart } = useCart();
    const { user } = useAuth();
    const router = useRouter();

    // Form State'leri
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [localError, setLocalError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Ticari hesaplama kurallarımız (Sepet sayfasındakiyle tam uyumlu)
    const shippingCost = totalAmount > 500 ? 0 : 35;
    const finalTotal = totalAmount + shippingCost;

    // Sepet boşsa kullanıcıyı doğrudan kataloğa geri gönderelim
    if (cartDetailed.length === 0) {
        return (
            <div className="text-center py-12">
                <h2 className="text-xl font-bold text-gray-900">Onaylanacak bir sepet bulunamadı.</h2>
                <button onClick={() => router.push('/products')} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-xl">
                    Ürünlere Göz At
                </button>
            </div>
        );
    }

    const handlePlaceOrder = (e: React.FormEvent) => {
        e.preventDefault();
        setLocalError(null);

        // 1. FORM VALIDATION (Hocanın dikkat ettiği kritik yer)
        if (!address.trim() || !city.trim() || !zipCode.trim() || !cardNumber.trim()) {
            setLocalError('Lütfen teslimat ve ödeme bilgilerini eksiksiz doldurunuz.');
            return;
        }

        if (cardNumber.replace(/\s/g, '').length < 16) {
            setLocalError('Geçersiz kart numarası. Lütfen 16 haneli kart numaranızı kontrol edin.');
            return;
        }

        setIsSubmitting(true);

        // Simüle edilmiş sipariş oluşturma süreci
        setTimeout(() => {
            // 2. STATE GÜNCELLEMESİ VE VERİ KAYDI
            // Mock veri havuzumuza yeni bir sipariş kaydı ekliyoruz
                const newOrder = {
                id: seedOrders.length + 1,
                user_id: user?.id || 2, // Giriş yapan kullanıcının ID'si
                total_amount: finalTotal,
                    status: 'processing' as const,
                created_at: new Date().toISOString().split('T')[0],
                items: cartDetailed.map(item => ({
                    product_name: item.product.name,
                    quantity: item.quantity,
                    price: item.product.price
                }))
            };

            seedOrders.unshift(newOrder); // Yeni siparişi listenin en başına ekle

            // 3. SEPETİ SIFIRLAMA (Checklist & Kalıcılık İsteri)
            clearCart(); // Context'teki sepet array'ini sıfırlar ve localStorage'ı temizler

            setIsSubmitting(false);

            // Kullanıcıyı sipariş geçmişi / başarı sayfasına yönlendiriyoruz
            router.push('/orders');
        }, 1500); // Kullanıcıya gerçekçi bir işlem hissi vermek için 1.5 saniye bekletiyoruz
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Güvenli Ödeme ve Onay</h1>
                <p className="mt-2 text-sm text-gray-500">
                    Siparişinizi tamamlamak için lütfen teslimat ve kart bilgilerinizi giriniz.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-12">
                {/* SOL TARAF: ADRES VE KART FORMU */}
                <form onSubmit={handlePlaceOrder} className="lg:col-span-7 space-y-6">
                    {localError && (
                        <div className="rounded-xl bg-red-50 p-4 text-sm text-red-700 font-medium border border-red-100">
                            ⚠️ {localError}
                        </div>
                    )}

                    {/* Adres Bilgileri Grubu */}
                    <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100 space-y-4">
                        <h2 className="text-base font-bold text-gray-900 border-b border-gray-50 pb-2">1. Teslimat Adresi</h2>

                        <div>
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Açık Adres</label>
                            <textarea
                                id="address"
                                rows={3}
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder="Mahalle, sokak, kapı numarası..."
                                className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">Şehir</label>
                                <input
                                    id="city"
                                    type="text"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    placeholder="Örn: Konya"
                                    className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-1">Posta Kodu</label>
                                <input
                                    id="zip"
                                    type="text"
                                    value={zipCode}
                                    onChange={(e) => setZipCode(e.target.value)}
                                    placeholder="34000"
                                    className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Ödeme Bilgileri Grubu */}
                    <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100 space-y-4">
                        <h2 className="text-base font-bold text-gray-900 border-b border-gray-50 pb-2">2. Kart ile Ödeme</h2>

                        <div>
                            <label htmlFor="card" className="block text-sm font-medium text-gray-700 mb-1">Kart Numarası</label>
                            <input
                                id="card"
                                type="text"
                                maxLength={16}
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ''))}
                                placeholder="4355 •••• •••• ••••"
                                className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono tracking-widest"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full flex justify-center items-center rounded-xl bg-green-600 py-3.5 text-base font-bold text-white shadow-md hover:bg-green-700 transition-colors disabled:bg-green-400"
                    >
                        {isSubmitting ? 'Siparişiniz İşleniyor...' : `Siparişi Onayla ve Öde (${finalTotal.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })})`}
                    </button>
                </form>

                {/* SAĞ TARAF: SEPET ÖZETİ (YALNIZCA OKUNABİLİR ÖNİZLEME) */}
                <div className="lg:col-span-5">
                    <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100 space-y-4 sticky top-24">
                        <h2 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-3">Sipariş Edilecek Ürünler</h2>

                        <div className="divide-y divide-gray-100 max-h-60 overflow-y-auto pr-2 space-y-3">
                            {cartDetailed.map((item) => (
                                <div key={item.product.id} className="flex justify-between items-center pt-3 first:pt-0">
                                    <div className="min-w-0 flex-1">
                                        <p className="text-sm font-medium text-gray-900 truncate">{item.product.name}</p>
                                        <p className="text-xs text-gray-500">{item.quantity} Adet x {item.product.price} TL</p>
                                    </div>
                                    <span className="text-sm font-semibold text-gray-900 ml-4">
                                        {(item.product.price * item.quantity).toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="border-t border-gray-100 pt-4 space-y-2 text-sm text-gray-600">
                            <div className="flex justify-between">
                                <span>Ürün Toplamı</span>
                                <span className="font-medium text-gray-900">{totalAmount.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Kargo</span>
                                <span>{shippingCost === 0 ? <span className="text-green-600 font-bold">Bedava</span> : `${shippingCost} TL`}</span>
                            </div>
                            <div className="flex justify-between border-t border-gray-100 pt-2 text-base font-black text-gray-900">
                                <span>Ödenecek Tutar</span>
                                <span className="text-lg text-blue-600">{finalTotal.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}