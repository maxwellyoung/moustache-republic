export interface Size {
  id: number;
  label: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  imageURL: string;
  sizeOptions: Size[];
}

export interface CartItem extends Product {
  size: string;
  quantity: number;
}

export interface ApiError {
  message: string;
  code?: string;
}
