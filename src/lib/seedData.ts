import { Category, Product, OrderStatus } from '../types';


export function getStoredProducts(): Product[] {
    if (typeof window === 'undefined') return seedProducts;
    try {
        const stored = localStorage.getItem('products');
        if (stored) {
            return JSON.parse(stored);
        }
    } catch (error) {
        console.error('Ürünler yüklenirken hata:', error);
    }
    return seedProducts;
}


export function setStoredProducts(products: Product[]): void {
    if (typeof window === 'undefined') return;
    try {
        localStorage.setItem('products', JSON.stringify(products));
    } catch (error) {
        console.error('Ürünler kaydedilirken hata:', error);
    }
}


export const seedCategories: Category[] = [
    {
        id: 1,
        name: 'Elektronik',
        slug: 'elektronik',
        description: 'En son teknoloji telefonlar, bilgisayarlar, oyuncu ekipmanları ve aksesuarlar.',
        created_at: new Date('2026-01-01T10:00:00Z').toISOString()
    },
    {
        id: 2,
        name: 'Giyim',
        slug: 'giyim',
        description: 'Her mevsime ve tarza uygun şık, rahat, kaliteli kıyafetler ve günlük giyim.',
        created_at: new Date('2026-01-01T10:00:00Z').toISOString()
    },
    {
        id: 3,
        name: 'Kitap & Hobi',
        slug: 'kitap-hobi',
        description: 'En çok satan romanlar, eğitici kitaplar, sanatsal aktiviteler ve hobi setleri.',
        created_at: new Date('2026-01-01T10:00:00Z').toISOString()
    }
];


export const seedProducts: Product[] = [

    {
        id: 101,
        name: 'Kablosuz Kulak Üstü Kulaklık',
        description: 'Yüksek ses kaliteli, aktif gürültü önleme (ANC) özellikli ve 40 saat pil ömürlü bluetooth kulaklık.',
        price: 1299.99,
        stock: 25,
        image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
        category_id: 1,
        is_featured: true,
        created_at: new Date('2026-01-05T12:00:00Z').toISOString(),
        updated_at: new Date('2026-01-05T12:00:00Z').toISOString()
    },
    {
        id: 102,
        name: 'Akıllı Saat Pro v4',
        description: 'Adım sayar, gelişmiş nabız ölçer, uyku takibi ve su geçirmezlik özelliklerine sahip spor akıllı saat.',
        price: 2499.00,
        stock: 15,
        image_url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
        category_id: 1,
        is_featured: true,
        created_at: new Date('2026-01-06T14:30:00Z').toISOString(),
        updated_at: new Date('2026-01-06T14:30:00Z').toISOString()
    },
    {
        id: 103,
        name: 'Mekanik Oyuncu Klavyesi',
        description: 'RGB arka aydınlatmalı, Türkçe dizilim, red switch hızlı tepki veren mekanik klavye.',
        price: 850.50,
        stock: 40,
        image_url: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500',
        category_id: 1,
        is_featured: false,
        created_at: new Date('2026-01-08T09:15:00Z').toISOString(),
        updated_at: new Date('2026-01-08T09:15:00Z').toISOString()
    },
    {
        id: 104,
        name: 'Kablosuz Gaming Mouse',
        description: '16000 DPI hassasiyet, ultra hafif ergonomik tasarım ve makro atanabilir oyuncu mouse.',
        price: 599.99,
        stock: 50,
        image_url: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500',
        category_id: 1,
        is_featured: false,
        created_at: new Date('2026-01-10T11:00:00Z').toISOString(),
        updated_at: new Date('2026-01-10T11:00:00Z').toISOString()
    },


    {
        id: 201,
        name: 'Pamuklu Kapüşonlu Sweatshirt',
        description: 'Rahat kesim, %100 organik pamuklu kumaş, içi polarlı kışlık sıcak tutan sweatshirt.',
        price: 450.00,
        stock: 100,
        image_url: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500',
        category_id: 2,
        is_featured: true,
        created_at: new Date('2026-02-01T15:00:00Z').toISOString(),
        updated_at: new Date('2026-02-01T15:00:00Z').toISOString()
    },
    {
        id: 202,
        name: 'Klasik Suni Deri Ceket',
        description: 'Slim-fit kesim, rüzgar geçirmez şık tasarım, kaliteli astarlı siyah deri ceket.',
        price: 1999.99,
        stock: 8,
        image_url: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500',
        category_id: 2,
        is_featured: true,
        created_at: new Date('2026-02-03T16:45:00Z').toISOString(),
        updated_at: new Date('2026-02-03T16:45:00Z').toISOString()
    },
    {
        id: 203,
        name: 'Hafif Taban Koşu Ayakkabısı',
        description: 'Ortopedik tabanlı, nefes alabilen fileli kumaştan üretilmiş yüksek performans spor ayakkabı.',
        price: 1850.00,
        stock: 30,
        image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
        category_id: 2,
        is_featured: false,
        created_at: new Date('2026-02-05T10:20:00Z').toISOString(),
        updated_at: new Date('2026-02-05T10:20:00Z').toISOString()
    },
    {
        id: 204,
        name: 'Minimalist Şehir Sırt Çantası',
        description: 'Su geçirmez kumaş, 15.6 inç özel korumalı laptop bölmeli, çok gözlü günlük çanta.',
        price: 650.00,
        stock: 60,
        image_url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
        category_id: 2,
        is_featured: false,
        created_at: new Date('2026-02-07T13:10:00Z').toISOString(),
        updated_at: new Date('2026-02-07T13:10:00Z').toISOString()
    },


    {
        id: 301,
        name: 'Bilim Kurgu Romanı - Geleceğin İzleri',
        description: 'Ödüllü yazardan, uzak galaksilerde geçen sürükleyici ve zihin açıcı bir uzay macerası romanı.',
        price: 120.00,
        stock: 200,
        image_url: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500',
        category_id: 3,
        is_featured: true,
        created_at: new Date('2026-03-01T08:00:00Z').toISOString(),
        updated_at: new Date('2026-03-01T08:00:00Z').toISOString()
    },
    {
        id: 302,
        name: '1000 Parça Doğa Manzarası Yapbozu',
        description: 'Kayıp parça destekli, yüksek çözünürlüklü baskı kalitesine sahip dinlendirici doğa temalı puzzle.',
        price: 240.50,
        stock: 12,
        image_url: 'https://images.unsplash.com/photo-1608755124035-77a82fb90232?w=500',
        category_id: 3,
        is_featured: false,
        created_at: new Date('2026-03-03T11:40:00Z').toISOString(),
        updated_at: new Date('2026-03-03T11:40:00Z').toISOString()
    },
    {
        id: 303,
        name: 'Profesyonel Akrilik Boya Seti (24 Renk)',
        description: 'Tuval, ahşap, seramik ve kağıt zeminler için uygun, yüksek pigmentli kapatıcı akrilik boya tüpleri.',
        price: 380.00,
        stock: 18,
        image_url: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=500',
        category_id: 3,
        is_featured: false,
        created_at: new Date('2026-03-05T14:50:00Z').toISOString(),
        updated_at: new Date('2026-03-05T14:50:00Z').toISOString()
    },
    {
        id: 304,
        name: 'Sert Kapak Klasik Eskiz Defteri',
        description: '120 gr kalınlığında kaliteli çizim kağıdı, 80 yaprak, kurşun ve füzen kalemlere uygun A4 defter.',
        price: 145.00,
        stock: 85,
        image_url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=500',
        category_id: 3,
        is_featured: true,
        created_at: new Date('2026-03-07T17:00:00Z').toISOString(),
        updated_at: new Date('2026-03-07T17:00:00Z').toISOString()
    }
];

export interface OrderItem {
    product_name: string;
    quantity: number;
    price: number;
}

export interface Order {
    id: number;
    user_id: number;
    total_amount: number;
    status: OrderStatus;
    created_at: string;
    items: OrderItem[];
}


export const seedOrders: Order[] = [
    {
        id: 1,
        user_id: 1,
        total_amount: 1450,
        status: 'processing',
        created_at: '2026-06-24',
        items: [
            { product_name: 'RETUR Smart Tracker Pro', quantity: 1, price: 1450 }
        ]
    },
    {
        id: 2,
        user_id: 2,
        total_amount: 450,
        status: 'delivered',
        created_at: '2026-06-22',
        items: [
            { product_name: 'Kablosuz Oyuncu Kulaklığı', quantity: 1, price: 450 }
        ]
    }
];