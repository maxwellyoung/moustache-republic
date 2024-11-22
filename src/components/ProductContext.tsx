import React, { createContext, useState, useEffect, useContext } from 'react';

interface Size {
  id: number;
  label: string;
}

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  imageURL: string;
  sizeOptions: Size[];
}

interface ProductContextType {
  product: Product | null;
  loading: boolean;
  error: string | null;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch('https://3sb655pz3a.execute-api.ap-southeast-2.amazonaws.com/live/product');
        if (!response.ok) {
          throw new Error('Failed to fetch product data');
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, []);

  return (
    <ProductContext.Provider value={{ product, loading, error }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProduct must be used within a ProductProvider');
  }
  return context;
};

