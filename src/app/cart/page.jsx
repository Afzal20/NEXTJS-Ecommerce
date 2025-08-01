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
        <div className="h-10 border dark:border-slate-700 rounded-full flex w-36 relative mt-4 overflow-hidden">
            <button className="px-4 py-1 inline-flex justify-center border-r dark:border-slate-700 text-blue-600 hover:bg-blue-600 hover:bg-opacity-10" type="button" onClick={() => qtyControl(parseInt(value) - 1)}>
                -
            </button>
            <input type="number" className="px-4 py-1 inline-flex justify-center max-w-[60px] text-center bg-transparent focus:outline-none" value={value} onChange={(e) => qtyControl(e.target.value)} />
            <button className="px-4 py-1 inline-flex justify-center border-l dark:border-slate-700 text-blue-600 hover:bg-blue-600 hover:bg-opacity-10" type="button" onClick={() => qtyControl(parseInt(value) + 1)}>
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
                    <div className="text-base md:text-lg hover:text-blue-600 mb-4">
                        <a href="#!">{title}</a>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-blue-600">Rs. {price}</h3>
                        <QtyField name={`ezy__epcart2-qty-${index}`} value={qty} onChange={(e) => onChange(e, index)} />
                    </div>
                </div>
                {/* delete button  */}
                <div className="ml-4">
                    <button 
                        className="w-10 h-10 bg-gray-200 dark:bg-slate-900 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 inline-flex justify-center items-center rounded-full transition-colors"
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

export default function CartPage() {
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
        <section className="ezy__epcart2 light py-14 md:py-24 bg-white dark:bg-[#0b1727] text-zinc-900 dark:text-white relative overflow-hidden z-10">
            <div className="container px-4 mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold">Shopping Cart</h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                        {totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart
                    </p>
                </div>
                
                {products.length === 0 ? (
                    <div className="text-center py-16">
                        <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-8">Add some products to get started!</p>
                        <a href="/Products" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg inline-block transition-colors">
                            Continue Shopping
                        </a>
                    </div>
                ) : (
                    <div className="flex flex-col lg:flex-row gap-6">
                        {/* products  */}
                        <div className="bg-blue-50 dark:bg-slate-800 rounded-xl w-full lg:w-2/3">
                            {products.map((item, i) => (
                                <Fragment key={`product-${i}`}>
                                    {!!i && <hr className="my-4 dark:border-slate-700" />}
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
                            <div className="bg-blue-50 dark:bg-slate-800 rounded-xl flex flex-col gap-6 p-4 md:p-6 sticky top-4">
                                <div className="">
                                    <h6 className="font-medium mb-6 opacity-75">Order Summary</h6>

                                    <div className="flex justify-between items-center">
                                        <span>Sub total</span>
                                        <span className="font-bold">Rs. {subtotal.toLocaleString()}</span>
                                    </div>
                                    <hr className="my-4 dark:border-slate-700" />
                                    <div className="flex justify-between items-center">
                                        <span>Shipping Fee</span>
                                        <span className="font-bold">Rs. {shippingFee}</span>
                                    </div>
                                    <hr className="my-4 dark:border-slate-700" />
                                    <div className="flex justify-between items-center">
                                        <span>Tax</span>
                                        <span className="font-bold">Rs. {tax.toLocaleString()}</span>
                                    </div>
                                    <hr className="my-4 dark:border-slate-700" />
                                    <div className="flex justify-between items-center">
                                        <span className="text-lg font-bold">Total</span>
                                        <span className="text-lg font-bold">Rs. {total.toLocaleString()}</span>
                                    </div>
                                </div>
                                <div className="">
                                    <button className="w-full bg-blue-600 rounded-md text-white hover:bg-blue-700 transition-colors py-3 font-medium">
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
}