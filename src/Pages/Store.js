import React, { useState, useEffect } from 'react';
import { useUser } from '../context';

export default function Store() {
    const { user, setLoading } = useUser();
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '' });

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                // Replace this with your actual fetch call
                const response = await fetch('/api/products'); // Example API endpoint
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [setLoading]);

    const handleAddProduct = async () => {
        try {
            // Replace this with your actual API call
            const response = await fetch('/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProduct),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const addedProduct = await response.json();
            setProducts([...products, addedProduct]);
            setNewProduct({ name: '', description: '', price: '' });
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    const handleEditProduct = async (product) => {
        try {
            // Replace this with your actual API call
            const response = await fetch(`/api/products/${product.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const updatedProduct = await response.json();
            setProducts(products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)));
            setEditingProduct(null);
        } catch (error) {
            console.error('Error editing product:', error);
        }
    };

    const handleDeleteProduct = async (id) => {
        try {
            // Replace this with your actual API call
            const response = await fetch(`/api/products/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            setProducts(products.filter((p) => p.id !== id));
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <section className="py-20 px-12">
            <h1 className="text-4xl font-bold mb-6">Store</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                    <div key={product.id} className="border p-4 rounded-lg">
                        {editingProduct && editingProduct.id === product.id ? (
                            <>
                                <input
                                    type="text"
                                    value={editingProduct.name}
                                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                                    className="border p-2 mb-2 w-full"
                                />
                                <input
                                    type="text"
                                    value={editingProduct.description}
                                    onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                                    className="border p-2 mb-2 w-full"
                                />
                                <input
                                    type="number"
                                    value={editingProduct.price}
                                    onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                                    className="border p-2 mb-2 w-full"
                                />
                                <button onClick={() => handleEditProduct(editingProduct)} className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
                                <button onClick={() => setEditingProduct(null)} className="bg-gray-500 text-white px-4 py-2 rounded ml-2">Cancel</button>
                            </>
                        ) : (
                            <>
                                <h2 className="text-2xl font-bold">{product.name}</h2>
                                <p>{product.description}</p>
                                <p>${product.price}</p>
                                {user.admin && (
                                    <>
                                        <button onClick={() => setEditingProduct(product)} className="bg-yellow-500 text-white px-4 py-2 rounded mt-2">Edit</button>
                                        <button onClick={() => handleDeleteProduct(product.id)} className="bg-red-500 text-white px-4 py-2 rounded mt-2 ml-2">Delete</button>
                                    </>
                                )}
                            </>
                        )}
                    </div>
                ))}
            </div>
            {user.admin && (
                <div className="mt-6">
                    <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
                    <input
                        type="text"
                        placeholder="Product Name"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        className="border p-2 mb-2 w-full"
                    />
                    <input
                        type="text"
                        placeholder="Product Description"
                        value={newProduct.description}
                        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                        className="border p-2 mb-2 w-full"
                    />
                    <input
                        type="number"
                        placeholder="Product Price"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                        className="border p-2 mb-2 w-full"
                    />
                    <button onClick={handleAddProduct} className="bg-green-500 text-white px-4 py-2 rounded">Add Product</button>
                </div>
            )}
        </section>
    );
}
