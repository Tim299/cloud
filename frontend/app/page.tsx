"use client"
import { useState } from 'react';


interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
}

export default function Home() {
  const [cart, setCart] = useState<Product[]>([]);

  const products: Product[] = [
    {
      id: 1,
      name: 'Vintage Backpack',
      description: 'Stylish and durable backpack for daily use.',
      price: 49.99,
      stock: 10,
    },
    {
      id: 2,
      name: 'Wireless Earbuds',
      description: 'High-quality sound with a sleek design.',
      price: 79.99,
      stock: 15,
    },
    {
      id: 3,
      name: 'Ceramic Coffee Mug',
      description: 'Perfect for your morning coffee or tea.',
      price: 14.99,
      stock: 20,
    },
  ];

  const handleAddToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">E-Commerce Store</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between"
            >
              <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
              <p className="text-gray-600 mt-2">{product.description}</p>
              <p className="text-lg font-bold text-gray-900 mt-4">${product.price.toFixed(2)}</p>
              <button
                onClick={() => handleAddToCart(product)}
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Cart</h2>
          {cart.length > 0 ? (
            <ul>
              {cart.map((item, index) => (
                <li key={index} className="mb-2">
                  {item.name} - ${item.price.toFixed(2)}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">Your cart is empty.</p>
          )}
        </div>
      </div>
    </div>
  );
};
