'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, CartItemDetailed, Product } from '../types';
import { seedProducts, getStoredProducts } from '../lib/seedData';


interface CartContextType {
    cart: CartItem[];
    cartDetailed: CartItemDetailed[];
    totalItems: number;
    totalAmount: number;
    addToCart: (productId: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    removeFromCart: (productId: number) => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [cart, setCart] = useState<CartItem[]>([]);
    const [isInitialized, setIsInitialized] = useState<boolean>(false);
    const [products, setProducts] = useState<Product[]>(seedProducts);


    useEffect(() => {
        try {
            const savedCart = localStorage.getItem('cart');
            if (savedCart) {
                setCart(JSON.parse(savedCart));
            }
        } catch (error) {
            console.error('Sepet verisi yüklenirken hata oluştu:', error);
        } finally {
            setIsInitialized(true);
        }
    }, []);


    useEffect(() => {
        const storedProducts = getStoredProducts();
        setProducts(storedProducts);
    }, []);


    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    }, [cart, isInitialized]);


    const cartDetailed: CartItemDetailed[] = cart.map(item => {
        const product = products.find(p => p.id === item.productId) as Product;
        return {
            product,
            quantity: item.quantity
        };
    }).filter(item => item.product !== undefined);


    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);


    const totalAmount = cartDetailed.reduce((total, item) => total + (item.quantity * item.product.price), 0);


    const addToCart = (productId: number) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.productId === productId);

            // Eğer ürün sepette zaten varsa miktarını 1 artır
            if (existingItem) {
                return prevCart.map(item =>
                    item.productId === productId
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }


            return [...prevCart, { productId, quantity: 1 }];
        });
    };


    const updateQuantity = (productId: number, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }
        setCart(prevCart =>
            prevCart.map(item =>
                item.productId === productId ? { ...item, quantity } : item
            )
        );
    };


    const removeFromCart = (productId: number) => {
        setCart(prevCart => prevCart.filter(item => item.productId !== productId));
    };


    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{
            cart,
            cartDetailed,
            totalItems,
            totalAmount,
            addToCart,
            updateQuantity,
            removeFromCart,
            clearCart
        }}>
            {children}
        </CartContext.Provider>
    );
};


export const useCartInternal = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart veya useCartInternal mutlaka bir CartProvider bileşeni içinde kullanılmalıdır.');
    }
    return context;
};