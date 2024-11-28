"use client"
import { useState, useEffect } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

interface CartItem {
  id: number;
  productId: number;
  quantity: number;
}

export default function Home() {
  const [cart, setCart] = useState<(Product & { quantity: number })[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [receipts, setReceipts] = useState<any[]>([]); 

  const [productsError, setProductsError] = useState<string | null>(null);
  const [cartError, setCartError] = useState<string | null>(null);
  const [receiptsError, setReceiptsError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://192.168.49.2:30004/products");
        if (!response.ok) throw new Error("Failed to fetch products.");
        const data: Product[] = await response.json();
        setProducts(data);
        setProductsError(null);
      } catch (error: any) {
        setProductsError(error.message);
      }
    };

    fetchProducts();
  }, []);

  // Fetch Cart
  const fetchCart = async () => {
    try {
      const response = await fetch("http://192.168.49.2:30004/cart/fetch?userId=1");
      if (!response.ok) throw new Error("Failed to fetch cart.");
      const data: CartItem[] = await response.json();

      const mappedCart = data
        .map((cartItem) => {
          const product = products.find((p) => p.id === cartItem.productId);
          return product ? { ...product, quantity: cartItem.quantity } : null;
        })
        .filter((item): item is Product & { quantity: number } => item !== null);

      setCart(mappedCart);
      setCartError(null);
    } catch (error: any) {
      setCartError(error.message);
    }
  };

  // Fetch Receipts
  const fetchReceipts = async () => {
    try {
      const response = await fetch("http://192.168.49.2:30004/orders/fetch?userId=1");
      if (!response.ok) throw new Error("Failed to fetch receipts.");
      const data = await response.json();
      setReceipts(data);
      setReceiptsError(null);
    } catch (error: any) {
      setReceiptsError(error.message);
    }
  };

  // Fetch Cart and Receipts after component mounts
  useEffect(() => {
    fetchCart();
    fetchReceipts();
  }, [products]);

  const handleAddToCart = async (product: Product) => {
    try {
      const response = await fetch("http://192.168.49.2:30004/add", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: 1, productId: product.id }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to add item to cart");
      }
      const updatedCartItem = await response.json();
      const productDetails = products.find((p) => p.id === updatedCartItem.productId);
  
      if (!productDetails) {
        throw new Error("Product details not found for cart item");
      }
  
      setCart((prevCart) => {
        const existingItem = prevCart.find((item) => item.id === updatedCartItem.productId);
  
        if (existingItem) {
          return prevCart.map((item) =>
            item.id === updatedCartItem.productId
              ? { ...item, quantity: updatedCartItem.quantity }
              : item
          );
        }
          return [
          ...prevCart,
          {
            ...productDetails,
            quantity: updatedCartItem.quantity,
          },
        ];
      });
    } catch (error: any) {
      console.error(error.message);
      setError("Failed to add item to cart");
    }
  };
  const handleRemoveFromCart = async (productId: number) => {
    try {
      const response = await fetch("http://192.168.49.2:30004/remove", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: 1, productId }),
      });

      if (!response.ok) {
        throw new Error("Failed to remove item from cart");
      }

      const result = await response.json();
      if (result.message === "Item removed from the cart") {
        setCart((prevCart) =>
          prevCart.filter((item) => item.id !== productId)
        );
      } else {
        const updatedItem = result;
        setCart((prevCart) =>
          prevCart.map((item) =>
            item.id === updatedItem.productId
              ? { ...item, quantity: updatedItem.quantity }
              : item
          )
        );
      }
    } catch (error:any) {
      console.error(error.message);
      setError("Failed to remove item from cart");
    }
  };

  const handleCheckout = async () => {
    try {
      const response = await fetch("http://192.168.49.2:30004/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: 1 }), 
      });

      if (!response.ok) {
        throw new Error("Failed to checkout");
      }
      fetchReceipts();
      console.log(receipts)
      setCart([]);
    } catch (err: any) {
      console.error(err.message);
      setError("Checkout failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          E-Commerce Store
        </h1>

        {/* Error Notifications */}
        <div>
          {productsError && (
            <p className="text-red-500 text-center">Error loading products: {productsError}</p>
          )}
          {cartError && (
            <p className="text-red-500 text-center">Error loading cart: {cartError}</p>
          )}
          {receiptsError && (
            <p className="text-red-500 text-center">Error loading receipts: {receiptsError}</p>
          )}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-md rounded-lg p-6 flex flex-col justify-between"
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

        {/* Cart Section */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Cart</h2>
          {cart.length > 0 ? (
            <div className="bg-white shadow-md rounded-lg p-6">
              {/* Cart Items */}
              <ul className="space-y-4">
                {cart.map((item) => (
                  <li
                    key={item.id}
                    className="flex justify-between items-center border-b pb-2"
                  >
                    <div>
                      <p className="text-lg font-semibold text-gray-800">{item.name}</p>
                      <p className="text-gray-600">
                        ${item.price.toFixed(2)} x {item.quantity}
                      </p>
                    </div>
                    <button
                      onClick={() => handleRemoveFromCart(item.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>

              {/* Checkout */}
              <div className="text-right mt-4">
                <button
                  onClick={handleCheckout}
                  className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 text-lg font-semibold"
                >
                  Checkout
                </button>
              </div>
            </div>
          ) : (
            <p className="text-gray-600">Your cart is empty.</p>
          )}
        </div>

        {/* Receipts Section */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Receipts</h2>
          {receipts.length > 0 ? (
            <div className="space-y-6">
              {receipts.map((receipt, index) => (
                <div
                  key={index}
                  className="bg-white shadow-md rounded-lg p-6 border border-gray-200"
                >
                  <p className="text-lg font-semibold text-gray-800">
                    Receipt #{receipt.id}
                  </p>
                  <p className="text-gray-600">Total: ${receipt.total.toFixed(2)}</p>
                  <p className="text-gray-700 font-semibold mt-4">Items:</p>
                  <ul className="mt-2 space-y-2">
                    {receipt.items.map((item: any, idx: number) => (
                      <li key={idx} className="flex justify-between">
                        <span>{item.product.name}</span>
                        <span>
                          ${item.price.toFixed(2)} x {item.quantity}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No receipts found.</p>
          )}
        </div>
      </div>
    </div>
  );
}