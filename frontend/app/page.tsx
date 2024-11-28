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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3004/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data: Product[] = await response.json();
        setProducts(data);
      } catch (err: any) {
        setError(err.message);
      }
    };
    fetchData();

  }, []);

  if (error) {
    return <div>Error: {error}</div>
  }

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch("http://localhost:3004/cart/fetch?userId=1");
        if (!response.ok) {
          throw new Error("Failed to fetch cart");
        }
        const data: CartItem[] = await response.json();

        // Map cart items to products
        const mappedCart = data.map((cartItem) => {
          const product = products.find((p) => p.id === cartItem.productId);
          return product ? { ...product, quantity: cartItem.quantity } : null;
        }).filter((item): item is Product & { quantity: number } => item !== null);

        setCart(mappedCart);
      } catch (err: any) {
        setError(err.message);
      }
    };

    if (products.length > 0) {
      fetchCart();
    }
  }, [products]);


  const handleAddToCart = async (product: Product) => {
    try {
      const response = await fetch("http://localhost:3004/add", {
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

      // Map the updated cart item to include product details
      const productDetails = products.find((p) => p.id === updatedCartItem.productId);
  
      if (!productDetails) {
        throw new Error("Product details not found for cart item");
      }
  
      setCart((prevCart) => {
        const existingItem = prevCart.find((item) => item.id === updatedCartItem.productId);
  
        if (existingItem) {
          // Update quantity of existing item
          return prevCart.map((item) =>
            item.id === updatedCartItem.productId
              ? { ...item, quantity: updatedCartItem.quantity }
              : item
          );
        }
  
        // Add new item with product details to cart
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
      const response = await fetch("http://localhost:3004/cart/remove", {
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
        // Update cart state
        setCart((prevCart) =>
          prevCart.filter((item) => item.id !== productId)
        );
      } else {
        // Update quantity if not fully removed
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
                  {item.name} - ${item.price.toFixed(2) + " "} x {item.quantity}{" "}
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
