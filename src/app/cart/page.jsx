"use client"; 

import React, { Fragment, useState } from "react";
import { Trash2 } from "lucide-react";


const productList = [
    {
        id: 1,
        img: "https://cdn.easyfrontend.com/pictures/portfolio/portfolio14.jpg",
        title: "ABUK Home Appliance Surge Protector Voltage Brownout Plug Outlet Power Strip Surge Protector With Pass Button",
        price: "158",
        qty: 2,
    },
    {
        id: 2,
        img: "https://cdn.easyfrontend.com/pictures/portfolio/portfolio20.jpg",
        title: "Forsining 3d Logo Design Hollow Engraving Black Gold Case Leather Skeleton Mechanical Watches Men Luxury Brand Heren Horloge",
        price: "7390",
        qty: 2,
    },
    {
        id: 3,
        img: "https://cdn.easyfrontend.com/pictures/portfolio/portfolio19.jpg",
        title: "Factory Brand Wholesale 5# Zinc Accessories Custom Hook Slider Metal #5 For Clothing garment jacket",
        price: "21452",
        qty: 2,
    },
    {
        id: 4,
        img: "https://cdn.easyfrontend.com/pictures/portfolio/portfolio15.jpg",
        title: "Factory Direct Sales Stainless Steel Heat Resistant Custom Compression Spring Manufacturer Spring Steel",
        price: "17652",
        qty: 2,
    },
];

const QtyField = ({ name, value, onChange }) => {
    const qtyControl = (qty) =>
        onChange({
            target: {
                name,
                type: "radio",
                value: qty < 1 ? 1 : qty,
            },
        });

    return (
        <div className="h-10 border border-border rounded-full flex w-36 relative mt-4 overflow-hidden">
            <button className="px-4 py-1 inline-flex justify-center border-r border-border text-primary hover:bg-primary hover:bg-opacity-10" type="button" onClick={() => qtyControl(parseInt(value) - 1)}>
                -
            </button>
            <input type="number" className="px-4 py-1 inline-flex justify-center max-w-[60px] text-center bg-transparent focus:outline-none" value={value} onChange={(e) => qtyControl(e.target.value)} />
            <button className="px-4 py-1 inline-flex justify-center border-l border-border text-primary hover:bg-primary hover:bg-opacity-10" type="button" onClick={() => qtyControl(parseInt(value) + 1)}>
                +
            </button>
        </div>
    );
};

const ProductItem = ({ item, index, onChange, onDelete }) => {
    const { img, title, price, qty } = item;
    return (
        <div className="flex flex-col md:flex-row items-start p-2 md:p-6 mb-4">
            <div className="w-full lg:max-w-[150px] rounded-xl mr-4 md:mr-6 mb-4 lg:mb-0">
                <a href="#!">
                    <img src={img} alt={title} className="max-w-full h-auto rounded-xl mx-auto" />
                </a>
            </div>

            <div className="flex flex-1 justify-between">
                {/* product details */}
                <div className="flex-1">
                    <div className="text-base md:text-lg hover:text-primary mb-4">
                        <a href="#!">{title}</a>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-primary">{price}$ </h3>
                        <QtyField name={`ezy__epcart2-qty-${index}`} value={qty} onChange={(e) => onChange(e, index)} />
                    </div>
                </div>
                {/* delete button  */}
                <div className="ml-4">
                    <button 
                        className="w-10 h-10 bg-secondary hover:bg-destructive hover:bg-opacity-10 text-destructive hover:text-destructive-foreground inline-flex justify-center items-center rounded-full transition-colors"
                        onClick={() => onDelete(index)}
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
    const [products, setProducts] = useState([...productList]);

    const onChange = (e, index) => {
        const { value } = e.target;

        setProducts([
            ...products.slice(0, index),
            {
                ...products[index],
                qty: parseInt(value) || 1,
            },
            ...products.slice(index + 1),
        ]);
    };

    const onDelete = (index) => {
        setProducts(products.filter((_, i) => i !== index));
    };

    const calculateSubtotal = () => {
        return products.reduce((total, product) => {
            return total + (parseFloat(product.price.replace(/,/g, '')) * product.qty);
        }, 0);
    };

    const subtotal = calculateSubtotal();
    const shippingFee = 99;
    const tax = Math.round(subtotal * 0.08); // 8% tax
    const total = subtotal + shippingFee + tax;
    const totalItems = products.reduce((total, product) => total + product.qty, 0);

    return (
        <section className="py-14 md:py-24 bg-background text-foreground relative overflow-hidden z-10">
            <div className="container px-4 mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold">Shopping Cart</h1>
                    <p className="text-muted-foreground mt-2">
                        {totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart
                    </p>
                </div>
                
                {products.length === 0 ? (
                    <div className="text-center py-16">
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
                            {products.map((item, i) => (
                                <Fragment key={`product-${i}`}>
                                    {!!i && <hr className="my-4 border-border" />}
                                    <ProductItem 
                                        item={item} 
                                        index={i} 
                                        onChange={onChange} 
                                        onDelete={onDelete}
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
                                        <span className="font-bold">$.{subtotal.toLocaleString()}</span>
                                    </div>
                                    <hr className="my-4 border-border" />
                                    <div className="flex justify-between items-center">
                                        <span>Shipping Fee</span>
                                        <span className="font-bold">$. {shippingFee}</span>
                                    </div>
                                    <hr className="my-4 border-border" />
                                    <div className="flex justify-between items-center">
                                        <span>Tax</span>
                                        <span className="font-bold">$. {tax.toLocaleString()}</span>
                                    </div>
                                    <hr className="my-4 border-border" />
                                    <div className="flex justify-between items-center">
                                        <span className="text-lg font-bold">Total</span>
                                        <span className="text-lg font-bold">$.{total.toLocaleString()}</span>
                                    </div>
                                </div>
                                <div className="">
                                    <button className="w-full bg-primary rounded-md text-primary-foreground hover:bg-primary/90 transition-colors py-3 font-medium" 
                                        onClick={() => 
                                            window.location.href = '/checkout'
                                        }
                                    >
                                        CHECKOUT ({totalItems})
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