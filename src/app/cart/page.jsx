"use client";

import React, { Fragment, useEffect, useState } from "react";
import { Trash2, ShoppingCart, Minus, Plus, ArrowLeft } from "lucide-react";
import Cookies from "js-cookie";
import { getCart } from "@/lib/api";

// Quantity input component
const QtyField = ({ value, onChange, isLoading }) => {
  const qtyControl = (qty) => {
    const newQty = qty < 1 ? 1 : qty;
    onChange(newQty);
  };

  return (
    <div className="h-10 border border-border rounded-full flex w-36 relative mt-4 overflow-hidden bg-card">
      <button
        className="px-4 py-1 inline-flex justify-center border-r border-border text-primary hover:bg-primary hover:bg-opacity-10 disabled:opacity-50"
        type="button"
        onClick={() => qtyControl(parseInt(value) - 1)}
        disabled={isLoading || value <= 1}
      >
        <Minus size={16} />
      </button>
      <div className="flex-1 text-center px-2 font-medium">{value}</div>
      <button
        className="px-4 py-1 inline-flex justify-center border-l border-border text-primary hover:bg-primary hover:bg-opacity-10 disabled:opacity-50"
        type="button"
        onClick={() => qtyControl(parseInt(value) + 1)}
        disabled={isLoading}
      >
        <Plus size={16} />
      </button>
    </div>
  );
};

// Single product item in cart
const ProductItem = ({ item, onQuantityChange, onDelete, isLoading }) => {
  const productUrl = `/Products/${item.id}`;
  let imageUrl = item.thumbnail;
  if (imageUrl && !/^https?:\/\//i.test(imageUrl)) {
    imageUrl = `http://localhost:8000${imageUrl}`;
  }
  if (!imageUrl) {
    imageUrl = "https://via.placeholder.com/150";
  }
  return (
    <div className="flex flex-col md:flex-row items-start p-4 md:p-5 mb-4 bg-card rounded-xl shadow-sm border border-border">
      <div className="w-full md:w-32 flex-shrink-0 rounded-lg overflow-hidden mr-0 md:mr-5 mb-4 md:mb-0">
        <a href={productUrl} title={item.title}>
          <img
            src={imageUrl}
            alt={item.title}
            className="w-full h-auto object-cover rounded-lg product-image"
            onError={e => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/150"; }}
          />
        </a>
      </div>

      <div className="flex flex-1 flex-col md:flex-row w-full">
        <div className="flex-1">
          <div className="mb-2">
            <a 
              href={productUrl} 
              className="text-lg font-semibold text-card-foreground hover:text-primary transition-colors line-clamp-2" 
              title={item.title}
            >
              {item.title}
            </a>
          </div>
          <div className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {item.description}
          </div>
          <div className="flex items-center gap-3 mb-3">
            <div className="text-xl font-bold text-primary">
              ${parseFloat(item.price).toFixed(2)}
            </div>
            {item.discount_percentage && (
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                -{parseFloat(item.discount_percentage).toFixed(2)}%
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-2 mb-3">
            {item.tags && item.tags.slice(0, 3).map((tag, idx) => (
              <span key={idx} className="bg-muted px-2 py-1 rounded-md text-xs text-muted-foreground">{tag}</span>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-muted-foreground mb-3">
            <div>Brand: <span className="font-medium">{item.brand}</span></div>
            <div>SKU: <span className="font-mono">{item.sku}</span></div>
            <div>Stock: <span className="font-medium">{item.stock}</span></div>
            <div>Category: <span className="font-medium">{item.category}</span></div>
          </div>
          <QtyField
            value={item.quantity || 1}
            onChange={(newQty) => onQuantityChange(item.id, newQty)}
            isLoading={isLoading}
          />
        </div>
        <div className="mt-4 md:mt-0 md:ml-4 flex justify-between md:flex-col md:justify-start">
          <button
            className="flex items-center justify-center w-10 h-10 bg-secondary hover:bg-destructive hover:bg-opacity-10 text-destructive hover:text-destructive-foreground rounded-full transition-colors disabled:opacity-50"
            onClick={() => onDelete(item.id)}
            disabled={isLoading}
            title="Remove item"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

const CartContent = () => {
  const [cartItems, setCartItems] = useState([]);
  const [summary, setSummary] = useState({
    subtotal: 0,
    shippingFee: 5.99,
    tax: 0,
    total: 0,
    totalItems: 0,
  });
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Calculate cart summary
  useEffect(() => {
    if (cartItems.length > 0) {
      const subtotal = cartItems.reduce((total, item) => {
        return total + (parseFloat(item.price) * (item.quantity || 1));
      }, 0);
      
      const tax = subtotal * 0.08; // 8% tax
      const total = subtotal + summary.shippingFee + tax;
      const totalItems = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);
      
      setSummary({
        ...summary,
        subtotal,
        tax,
        total,
        totalItems
      });
    } else {
      setSummary({
        subtotal: 0,
        shippingFee: 0,
        tax: 0,
        total: 0,
        totalItems: 0,
      });
    }
  }, [cartItems]);

  // Fetch cart
  useEffect(() => {
    const fetchCart = async () => {
      try {
        setLoading(true);
        const token = Cookies.get("accessToken");
        if (!token) {
          setError("Please log in to view your cart");
          setLoading(false);
          return;
        }

        const data = await getCart(token);
        if (Array.isArray(data) && data.length > 0) {
          setCartItems(data[0].cart_items || []);
        } else {
          setCartItems([]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  // Quantity change handler
  const handleQuantityChange = (itemId, newQty) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, quantity: newQty } : item
      )
    );
  };

  // Delete handler
  const handleDelete = (itemId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  if (isLoading) {
    return (
      <section className="py-14 md:py-24 bg-background min-h-screen">
        <div className="container px-4 mx-auto">
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 md:py-12 bg-background min-h-screen">
      <div className="container px-4 mx-auto">
        <div className="mb-6">
          <a href="/Products" className="inline-flex items-center text-primary hover:text-primary/80 mb-4">
            <ArrowLeft size={18} className="mr-2" />
            Continue Shopping
          </a>
          <h1 className="text-3xl font-bold text-foreground">Your Shopping Cart</h1>
          <p className="text-muted-foreground mt-2">
            {summary.totalItems} {summary.totalItems === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        {error && (
          <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {cartItems.length === 0 ? (
          <div className="text-center py-16 bg-card rounded-xl shadow-sm">
            <ShoppingCart
              size={80}
              className="mx-auto mb-4 text-muted-foreground"
            />
            <h2 className="text-2xl font-semibold text-card-foreground mb-4">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Looks like you haven't added any items to your cart yet.
            </p>
            <a
              href="/Products"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg inline-block transition-colors font-medium"
            >
              Start Shopping
            </a>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="w-full lg:w-2/3">
              <div className="bg-card rounded-xl shadow-sm p-4 md:p-5 mb-6">
                <h2 className="text-lg font-semibold text-card-foreground mb-4">Cart Items</h2>
                {cartItems.map((item, i) => (
                  <Fragment key={item.id || i}>
                    <ProductItem
                      item={item}
                      onQuantityChange={handleQuantityChange}
                      onDelete={handleDelete}
                      isLoading={isLoading}
                    />
                    {i < cartItems.length - 1 && <hr className="my-4 border-border" />}
                  </Fragment>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="w-full lg:w-1/3">
              <div className="bg-card rounded-xl shadow-sm p-5 sticky top-4">
                <h3 className="text-xl font-semibold text-card-foreground mb-6 pb-3 border-b border-border">
                  Order Summary
                </h3>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Subtotal ({summary.totalItems} items)</span>
                    <span className="font-medium text-card-foreground">${summary.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium text-card-foreground">${summary.shippingFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Tax</span>
                    <span className="font-medium text-card-foreground">${summary.tax.toFixed(2)}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center mb-6 pt-4 border-t border-border">
                  <span className="text-lg font-semibold text-card-foreground">Total</span>
                  <span className="text-lg font-bold text-primary">${summary.total.toFixed(2)}</span>
                </div>
                <button
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg py-3 font-semibold transition-colors disabled:opacity-50"
                  onClick={() => (window.location.href = "/checkout")}
                  disabled={isLoading || cartItems.length === 0}
                >
                  Proceed to Checkout
                </button>
                <p className="text-xs text-muted-foreground text-center mt-4">
                  Taxes and shipping calculated at checkout
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default function CartPage() {
  return <CartContent />;
}