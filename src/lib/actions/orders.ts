'use server';
import { Order, OrderItem, ApiResponse, OrderStatus } from '../../types';

// Simüle edilmiş orders ve order_items tabloları
const mockOrdersTable: Order[] = [];
const mockOrderItemsTable: OrderItem[] = [];

interface CreateOrderInput {
    userId: number;
    shippingName: string;
    shippingAddress: string;
    shippingPhone: string;
    totalAmount: number;
    items: { productId: number; quantity: number; unitPrice: number }[];
}

/**
 * Yeni Sipariş Oluşturma (Checkout) Aksiyonu
 */
export async function createOrderAction(input: CreateOrderInput): Promise<ApiResponse<Order>> {
    try {
        // 1. Benzersiz, görünür sipariş numarası üretme (Örn: ORD-2026-0001)
        const orderCount = mockOrdersTable.length + 1;
        const paddedCount = String(orderCount).padStart(4, '0');
        const orderNumber = `ORD-2026-${paddedCount}`;

        // 2. Ana sipariş kartını oluşturma (orders tablosu şeması)
        const newOrder: Order = {
            id: orderCount,
            user_id: input.userId,
            order_number: orderNumber,
            total_amount: input.totalAmount,
            status: 'pending', // İlk durum her zaman pending başlar
            shipping_name: input.shippingName,
            shipping_address: input.shippingAddress,
            shipping_phone: input.shippingPhone,
            payment_method: 'credit_card',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        };

        mockOrdersTable.push(newOrder);

        // 3. Sepet kalemlerini order_items tablosuna tek tek aktarma (1 -> N İlişkisi)
        input.items.forEach((item) => {
            const newItem: OrderItem = {
                id: mockOrderItemsTable.length + 1,
                order_id: newOrder.id,
                product_id: item.productId,
                quantity: item.quantity,
                unit_price: item.unitPrice // Satın alma anındaki fiyat güvenle saklanır
            };
            mockOrderItemsTable.push(newItem);
        });

        return { data: newOrder, error: null, success: true };
    } catch (error) {
        return { data: null, error: 'Siparişiniz işlenirken teknik bir hata oluştu.', success: false };
    }
}

/**
 * Kullanıcının Geçmiş Siparişlerini Getirme Aksiyonu
 */
export async function getUserOrdersAction(userId: number): Promise<Order[]> {
    return mockOrdersTable.filter(order => order.user_id === userId);
}

/**
 * Admin İçin Tüm Siparişleri Listeleme Aksiyonu
 */
export async function getAllOrdersAction(): Promise<Order[]> {
    return mockOrdersTable;
}

/**
 * Admin İçin Sipariş Durumu Güncelleme Aksiyonu
 */
export async function updateOrderStatusAction(orderId: number, status: OrderStatus): Promise<ApiResponse<Order>> {
    const order = mockOrdersTable.find(o => o.id === orderId);
    if (!order) {
        return { data: null, error: 'Sipariş bulunamadı.', success: false };
    }

    order.status = status;
    order.updated_at = new Date().toISOString();
    return { data: order, error: null, success: true };
}