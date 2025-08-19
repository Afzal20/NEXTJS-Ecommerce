"use client";

import { useState, useEffect } from 'react';
import { getProducts, getTopCategories, getSlider } from '@/lib/api';

export default function TestAPIPage() {
    const [apiStatus, setApiStatus] = useState({
        backend: 'checking...',
        products: 'checking...',
        categories: 'checking...',
        sliders: 'checking...'
    });

    const [data, setData] = useState({
        products: null,
        categories: null,
        sliders: null
    });

    const [errors, setErrors] = useState([]);

    useEffect(() => {
        testBackendConnection();
    }, []);

    const testBackendConnection = async () => {
        // Test basic backend connection
        try {
            const response = await fetch('http://127.0.0.1:8000/');
            if (response.ok) {
                setApiStatus(prev => ({ ...prev, backend: '✅ Connected' }));
            } else {
                setApiStatus(prev => ({ ...prev, backend: `❌ Error: ${response.status}` }));
            }
        } catch (error) {
            setApiStatus(prev => ({ ...prev, backend: `❌ Connection Failed: ${error.message}` }));
            setErrors(prev => [...prev, `Backend connection: ${error.message}`]);
        }

        // Test products API
        try {
            const products = await getProducts();
            setApiStatus(prev => ({ ...prev, products: '✅ Working' }));
            setData(prev => ({ ...prev, products }));
        } catch (error) {
            setApiStatus(prev => ({ ...prev, products: `❌ Error: ${error.message}` }));
            setErrors(prev => [...prev, `Products API: ${error.message}`]);
        }

        // Test categories API
        try {
            const categories = await getTopCategories();
            setApiStatus(prev => ({ ...prev, categories: '✅ Working' }));
            setData(prev => ({ ...prev, categories }));
        } catch (error) {
            setApiStatus(prev => ({ ...prev, categories: `❌ Error: ${error.message}` }));
            setErrors(prev => [...prev, `Categories API: ${error.message}`]);
        }

        // Test sliders API
        try {
            const sliders = await getSlider();
            setApiStatus(prev => ({ ...prev, sliders: '✅ Working' }));
            setData(prev => ({ ...prev, sliders }));
        } catch (error) {
            setApiStatus(prev => ({ ...prev, sliders: `❌ Error: ${error.message}` }));
            setErrors(prev => [...prev, `Sliders API: ${error.message}`]);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">API Connection Test</h1>
            
            {/* Status Overview */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4">Connection Status</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-4 border rounded">
                        <h3 className="font-medium">Backend Server</h3>
                        <p className="text-sm">{apiStatus.backend}</p>
                    </div>
                    <div className="p-4 border rounded">
                        <h3 className="font-medium">Products API</h3>
                        <p className="text-sm">{apiStatus.products}</p>
                    </div>
                    <div className="p-4 border rounded">
                        <h3 className="font-medium">Categories API</h3>
                        <p className="text-sm">{apiStatus.categories}</p>
                    </div>
                    <div className="p-4 border rounded">
                        <h3 className="font-medium">Sliders API</h3>
                        <p className="text-sm">{apiStatus.sliders}</p>
                    </div>
                </div>
            </div>

            {/* Error Messages */}
            {errors.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
                    <h2 className="text-xl font-semibold text-red-800 mb-4">Errors</h2>
                    <ul className="space-y-2">
                        {errors.map((error, index) => (
                            <li key={index} className="text-red-700 text-sm">• {error}</li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Data Preview */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Products Data */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-semibold mb-4">Products Data</h3>
                    {data.products ? (
                        <div className="space-y-2">
                            <p className="text-sm text-gray-600">Count: {data.products.results?.length || 0}</p>
                            {data.products.results?.slice(0, 3).map((product, index) => (
                                <div key={index} className="p-2 bg-gray-50 rounded text-sm">
                                    <p className="font-medium">{product.name}</p>
                                    <p className="text-gray-600">${product.price}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 text-sm">No data available</p>
                    )}
                </div>

                {/* Categories Data */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-semibold mb-4">Categories Data</h3>
                    {data.categories ? (
                        <div className="space-y-2">
                            <p className="text-sm text-gray-600">Count: {data.categories.length || 0}</p>
                            {data.categories.slice(0, 3).map((category, index) => (
                                <div key={index} className="p-2 bg-gray-50 rounded text-sm">
                                    <p className="font-medium">{category.name}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 text-sm">No data available</p>
                    )}
                </div>

                {/* Sliders Data */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-semibold mb-4">Sliders Data</h3>
                    {data.sliders ? (
                        <div className="space-y-2">
                            <p className="text-sm text-gray-600">Count: {data.sliders.results?.length || 0}</p>
                            {data.sliders.results?.slice(0, 3).map((slider, index) => (
                                <div key={index} className="p-2 bg-gray-50 rounded text-sm">
                                    <p className="font-medium">{slider.title}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 text-sm">No data available</p>
                    )}
                </div>
            </div>

            {/* Raw Data (for debugging) */}
            <div className="mt-8 bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Raw API Responses (for debugging)</h3>
                <div className="space-y-4">
                    <details className="cursor-pointer">
                        <summary className="font-medium">Products Response</summary>
                        <pre className="mt-2 text-xs bg-white p-4 rounded border overflow-auto max-h-40">
                            {JSON.stringify(data.products, null, 2)}
                        </pre>
                    </details>
                    <details className="cursor-pointer">
                        <summary className="font-medium">Categories Response</summary>
                        <pre className="mt-2 text-xs bg-white p-4 rounded border overflow-auto max-h-40">
                            {JSON.stringify(data.categories, null, 2)}
                        </pre>
                    </details>
                    <details className="cursor-pointer">
                        <summary className="font-medium">Sliders Response</summary>
                        <pre className="mt-2 text-xs bg-white p-4 rounded border overflow-auto max-h-40">
                            {JSON.stringify(data.sliders, null, 2)}
                        </pre>
                    </details>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-8 bg-blue-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                <div className="flex flex-wrap gap-4">
                    <button 
                        onClick={testBackendConnection}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Retest Connections
                    </button>
                    <a 
                        href="http://127.0.0.1:8000/docs/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 inline-block"
                    >
                        Open API Docs
                    </a>
                    <a 
                        href="http://127.0.0.1:8000/admin/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 inline-block"
                    >
                        Open Admin Panel
                    </a>
                </div>
            </div>
        </div>
    );
}
