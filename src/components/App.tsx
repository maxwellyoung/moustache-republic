import React, { useState, useEffect } from 'react';
import ProductDetails from './components/ProductDetails';
import MiniCart from './components/MiniCart';

function App() {
  const [product, setProduct] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch('https://3sb655pz3a.execute-api.ap-southeast-2.amazonaws.com/live/product')
      .then(response => response.json())
      .then(data => setProduct(data))
      .catch(error => console.error('Error fetching product:', error));
  }, []);

  const addToCart = (size) => {
    if (product) {
      const newItem = { ...product, size, quantity: 1 };
      setCart(prevCart => {
        const existingItem = prevCart.find(item => item.id === product.id && item.size === size);
        if (existingItem) {
          return prevCart.map(item =>
            item.id === product.id && item.size === size
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        return [...prevCart, newItem];
      });
    }
  };

  const updateQuantity = (id, size, newQuantity) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id && item.size === size
          ? { ...item, quantity: Math.max(0, newQuantity) }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-6 py-8">
      <header className="flex justify-end mb-8">
        <div className="text-sm text-gray-600">
          My Cart ( {cart.reduce((sum, item) => sum + item.quantity, 0)} )
        </div>
      </header>
      <main className="flex flex-col md:flex-row gap-12">
        {product && <ProductDetails product={product} addToCart={addToCart} />}
        <MiniCart cart={cart} updateQuantity={updateQuantity} />
      </main>
    </div>
  );
}

export default App;

