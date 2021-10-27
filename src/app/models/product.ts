export interface Product {
  id: number;
  price: number;
  name: string;
  description: string;
  category: string;
  stock: number;
  imageUrl: string;
  quantity?: number;
  isSelected?: boolean;
}
