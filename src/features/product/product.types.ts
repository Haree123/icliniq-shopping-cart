export interface CreateProductRequest {
  name: string;
  description: string;
  price: number;
  stock: number;
}

export interface UpdateProductRequest {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  active: boolean;
}

export interface ProductResponse {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  active: boolean;
}
