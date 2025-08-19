import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { cartApi } from '@/lib/cartApi';

const useCartStore = create(
    persist(
        (set, get) => ({
            // State
            cartItems: [],
            cartSummary: {
                subtotal: 0,
                shippingFee: 99,
                tax: 0,
                total: 0,
                totalItems: 0
            },
            isLoading: false,
            error: null,

            // Actions
            fetchCartItems: async () => {
                set({ isLoading: true, error: null });
                try {
                    const summary = await cartApi.getCartSummary();
                    set({ 
                        cartItems: summary.items,
                        cartSummary: {
                            subtotal: summary.subtotal,
                            shippingFee: summary.shippingFee,
                            tax: summary.tax,
                            total: summary.total,
                            totalItems: summary.totalItems
                        },
                        isLoading: false 
                    });
                } catch (error) {
                    set({ error: error.message, isLoading: false });
                }
            },

            addToCart: async (product, quantity = 1) => {
                set({ isLoading: true, error: null });
                try {
                    const cartData = {
                        title: product.title || product.name,
                        price: product.price,
                        quantity: quantity,
                        total: product.price * quantity,
                        discountPercentage: product.discountPercentage || 0,
                        discountedTotal: product.price * quantity * (1 - (product.discountPercentage || 0) / 100),
                        thumbnail: product.thumbnail || product.image
                    };

                    await cartApi.addToCart(cartData);
                    await get().fetchCartItems(); // Refresh cart
                } catch (error) {
                    set({ error: error.message, isLoading: false });
                }
            },

            removeFromCart: async (itemId) => {
                set({ isLoading: true, error: null });
                try {
                    await cartApi.removeFromCart(itemId);
                    await get().fetchCartItems(); // Refresh cart
                } catch (error) {
                    set({ error: error.message, isLoading: false });
                }
            },

            updateQuantity: async (itemId, quantity) => {
                if (quantity <= 0) {
                    await get().removeFromCart(itemId);
                    return;
                }

                set({ isLoading: true, error: null });
                try {
                    await cartApi.updateCartQuantity(itemId, quantity);
                    await get().fetchCartItems(); // Refresh cart
                } catch (error) {
                    set({ error: error.message, isLoading: false });
                }
            },

            clearCart: () => {
                set({
                    cartItems: [],
                    cartSummary: {
                        subtotal: 0,
                        shippingFee: 99,
                        tax: 0,
                        total: 0,
                        totalItems: 0
                    }
                });
            },

            // Local cart management (for non-authenticated users)
            addToLocalCart: (product, quantity = 1) => {
                const cartItems = get().cartItems;
                const existingItem = cartItems.find(item => item.id === product.id);

                let updatedItems;
                if (existingItem) {
                    updatedItems = cartItems.map(item =>
                        item.id === product.id
                            ? { ...item, quantity: item.quantity + quantity }
                            : item
                    );
                } else {
                    const newItem = {
                        id: product.id,
                        title: product.title || product.name,
                        price: product.price,
                        quantity: quantity,
                        thumbnail: product.thumbnail || product.image,
                        discountPercentage: product.discountPercentage || 0
                    };
                    updatedItems = [...cartItems, newItem];
                }

                const subtotal = updatedItems.reduce((total, item) => {
                    return total + (parseFloat(item.price) * item.quantity);
                }, 0);
                
                const totalItems = updatedItems.reduce((total, item) => total + item.quantity, 0);
                const tax = Math.round(subtotal * 0.08);
                const total = subtotal + 99 + tax; // 99 is shipping fee

                set({
                    cartItems: updatedItems,
                    cartSummary: {
                        subtotal,
                        shippingFee: 99,
                        tax,
                        total,
                        totalItems
                    }
                });
            },

            removeFromLocalCart: (itemId) => {
                const cartItems = get().cartItems;
                const updatedItems = cartItems.filter(item => item.id !== itemId);
                
                const subtotal = updatedItems.reduce((total, item) => {
                    return total + (parseFloat(item.price) * item.quantity);
                }, 0);
                
                const totalItems = updatedItems.reduce((total, item) => total + item.quantity, 0);
                const tax = Math.round(subtotal * 0.08);
                const total = subtotal + 99 + tax;

                set({
                    cartItems: updatedItems,
                    cartSummary: {
                        subtotal,
                        shippingFee: 99,
                        tax,
                        total,
                        totalItems
                    }
                });
            },

            updateLocalQuantity: (itemId, quantity) => {
                if (quantity <= 0) {
                    get().removeFromLocalCart(itemId);
                    return;
                }

                const cartItems = get().cartItems;
                const updatedItems = cartItems.map(item =>
                    item.id === itemId
                        ? { ...item, quantity: quantity }
                        : item
                );

                const subtotal = updatedItems.reduce((total, item) => {
                    return total + (parseFloat(item.price) * item.quantity);
                }, 0);
                
                const totalItems = updatedItems.reduce((total, item) => total + item.quantity, 0);
                const tax = Math.round(subtotal * 0.08);
                const total = subtotal + 99 + tax;

                set({
                    cartItems: updatedItems,
                    cartSummary: {
                        subtotal,
                        shippingFee: 99,
                        tax,
                        total,
                        totalItems
                    }
                });
            }
        }),
        {
            name: 'cart-storage',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                cartItems: state.cartItems,
                cartSummary: state.cartSummary
            })
        }
    )
);

export default useCartStore;
