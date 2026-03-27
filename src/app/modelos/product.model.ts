export interface Producto {
  id: number;
  name: string;
  price: number;
  description?: string;
  category: string;
  imageUrl: string;
  inStock: boolean;
}

export interface CartItem extends Producto {
  quantity: number;
}
