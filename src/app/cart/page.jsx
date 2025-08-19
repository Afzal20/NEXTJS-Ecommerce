"use client"; 

import React, { Fragment, useState, useEffect } from "react";
import { Trash2, ShoppingCart } from "lucide-react";
import useCartStore from "@/hooks/useCartStore";
import { useAuth } from "@/hooks/useAuth";

const QtyField = ({ name, value, onChange, isLoading }) => {
    const qtyControl = (qty) => {
        const newQty = qty < 1 ? 1 : qty;
        onChange(newQty);
    };

    return (
        <div className="h-10 border border-border rounded-full flex w-36 relative mt-4 overflow-hidden">
            <button 
                className="px-4 py-1 inline-flex justify-center border-r border-border text-primary hover:bg-primary hover:bg-opacity-10 disabled:opacity-50" 
                type="button" 
                onClick={() => qtyControl(parseInt(value) - 1)}
                disabled={isLoading}
            >
                -
            </button>
            <input 
                type="number" 
                className="px-4 py-1 inline-flex justify-center max-w-[60px] text-center bg-transparent focus:outline-none" 
                value={value} 
                onChange={(e) => qtyControl(e.target.value)}
                disabled={isLoading}
            />
            <button 
                className="px-4 py-1 inline-flex justify-center border-l border-border text-primary hover:bg-primary hover:bg-opacity-10 disabled:opacity-50" 
                type="button" 
                onClick={() => qtyControl(parseInt(value) + 1)}
                disabled={isLoading}
            >
                +
            </button>
        </div>
    );
};

const ProductItem = ({ item, onQuantityChange, onDelete, isLoading }) => {
    const { id, thumbnail, title, price, quantity } = item;
    
    return (
        <div className="flex flex-col md:flex-row items-start p-2 md:p-6 mb-4">
            <div className="w-full lg:max-w-[150px] rounded-xl mr-4 md:mr-6 mb-4 lg:mb-0">
                <a href="#!">
                    <img 
                        src={thumbnail || "https://via.placeholder.com/150"} 
                        alt={title} 
                        className="max-w-full h-auto rounded-xl mx-auto" 
                    />
                </a>
            </div>

            <div className="flex flex-1 justify-between">
                {/* product details */}
                <div className="flex-1">
                    <div className="text-base md:text-lg hover:text-primary mb-4">
                        <a href="#!">{title}</a>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-primary">${parseFloat(price).toFixed(2)}</h3>
                        <QtyField 
                            name={`cart-qty-${id}`} 
                            value={quantity} 
                            onChange={(newQty) => onQuantityChange(id, newQty)}
                            isLoading={isLoading}
                        />
                    </div>
                </div>
                {/* delete button  */}
                <div className="ml-4">
                    <button 
                        className="w-10 h-10 bg-secondary hover:bg-destructive hover:bg-opacity-10 text-destructive hover:text-destructive-foreground inline-flex justify-center items-center rounded-full transition-colors disabled:opacity-50"
                        onClick={() => onDelete(id)}
                        disabled={isLoading}
                        title="Remove item"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            </div> 
        </div>
    );
};

const CartContent = () => {
    const { isAuthenticated } = useAuth();
    const { 
        cartItems, 
        cartSummary, 
        isLoading, 
        error,
        fetchCartItems, 
        removeFromCart, 
        updateQuantity,
        removeFromLocalCart,
        updateLocalQuantity
    } = useCartStore();

    useEffect(() => {
        if (isAuthenticated) {
            fetchCartItems();
        }
    }, [isAuthenticated, fetchCartItems]);

    const handleQuantityChange = async (itemId, newQuantity) => {
        if (isAuthenticated) {
            await updateQuantity(itemId, newQuantity);
        } else {
            updateLocalQuantity(itemId, newQuantity);
        }
    };

    const handleDelete = async (itemId) => {
        if (isAuthenticated) {
            await removeFromCart(itemId);
        } else {
            removeFromLocalCart(itemId);
        }
    };

    if (isLoading) {
        return (
            <section className="py-14 md:py-24 bg-background text-foreground relative overflow-hidden z-10">
                <div className="container px-4 mx-auto">
                    <div className="flex justify-center items-center py-16">
                        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-14 md:py-24 bg-background text-foreground relative overflow-hidden z-10">
            <div className="container px-4 mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold">Shopping Cart</h1>
                    <p className="text-muted-foreground mt-2">
                        {cartSummary.totalItems} {cartSummary.totalItems === 1 ? 'item' : 'items'} in your cart
                    </p>
                    {error && (
                        <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-2 rounded-lg mt-4">
                            Error: {error}
                        </div>
                    )}
                </div>
                
                {cartItems.length === 0 ? (
                    <div className="text-center py-16">
                        <ShoppingCart size={64} className="mx-auto mb-4 text-muted-foreground" />
                        <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
                        <p className="text-muted-foreground mb-8">Add some products to get started!</p>
                        <a href="/Products" className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg inline-block transition-colors">
                            Continue Shopping
                        </a>
                    </div>
                ) : (
                    <div className="flex flex-col lg:flex-row gap-6">
                        {/* products  */}
                        <div className="bg-card rounded-xl w-full lg:w-2/3">
                            {cartItems.map((item, i) => (
                                <Fragment key={`product-${item.id || i}`}>
                                    {!!i && <hr className="my-4 border-border" />}
                                    <ProductItem 
                                        item={item} 
                                        onQuantityChange={handleQuantityChange} 
                                        onDelete={handleDelete}
                                        isLoading={isLoading}
                                    />
                                </Fragment>
                            ))}
                        </div>

                        {/* sidebar */}
                        <div className="w-full lg:w-1/3">
                            <div className="bg-card rounded-xl flex flex-col gap-6 p-4 md:p-6 sticky top-4">
                                <div className="">
                                    <h6 className="font-medium mb-6 text-muted-foreground">Order Summary</h6>

                                    <div className="flex justify-between items-center">
                                        <span>Sub total</span>
                                        <span className="font-bold">${cartSummary.subtotal.toFixed(2)}</span>
                                    </div>
                                    <hr className="my-4 border-border" />
                                    <div className="flex justify-between items-center">
                                        <span>Shipping Fee</span>
                                        <span className="font-bold">${cartSummary.shippingFee.toFixed(2)}</span>
                                    </div>
                                    <hr className="my-4 border-border" />
                                    <div className="flex justify-between items-center">
                                        <span>Tax</span>
                                        <span className="font-bold">${cartSummary.tax.toFixed(2)}</span>
                                    </div>
                                    <hr className="my-4 border-border" />
                                    <div className="flex justify-between items-center">
                                        <span className="text-lg font-bold">Total</span>
                                        <span className="text-lg font-bold">${cartSummary.total.toFixed(2)}</span>
                                    </div>
                                </div>
                                <div className="">
                                    <button 
                                        className="w-full bg-primary rounded-md text-primary-foreground hover:bg-primary/90 transition-colors py-3 font-medium disabled:opacity-50" 
                                        onClick={() => window.location.href = '/checkout'}
                                        disabled={isLoading || cartItems.length === 0}
                                    >
                                        CHECKOUT ({cartSummary.totalItems})
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default function CartPage() {
    return <CartContent />
}