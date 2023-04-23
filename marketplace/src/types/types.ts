export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

export type ProductType = "backpack" | "tent" | "sleeping-bag";
