
export interface ApiResponse<T> {
    data: T | null;
    error: string | null;
    success: boolean;
}


export interface User {
    id: number;
    name: string;
    email: string;
    password_hash: string;
    role: 'user' | 'admin';
    created_at: string;
    updated_at: string;
}


export interface Category {
    id: number;
    name: string;
    slug: string;
    description?: string;
    created_at: string;
}


export interface Product {
    id: number;
    name: string;
    description?: string;
    price: number;
    stock: number;
    image_url?: string;
    category_id: number;
    is_featured: boolean;
    created_at: string;
    updated_at: string;
}


export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';


export interface Order {
    id: number;
    user_id: number;
    order_number: string;
    total_amount: number;
    status: OrderStatus;
    shipping_name: string;
    shipping_address: string;
    shipping_phone: string;
    payment_method: string;
    created_at: string;
    updated_at: string;
}


export interface OrderItem {
    id: number;
    order_id: number;
    product_id: number;
    quantity: number;
    unit_price: number;
}


export interface CartItem {
    productId: number;
    quantity: number;
}


export interface CartItemDetailed {
    product: Product;
    quantity: number;
}


export type AuthSession = Omit<User, 'password_hash'>;