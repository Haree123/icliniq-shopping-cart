export interface AddCartItemRequest {
  productId: string;
  quantity: number;
}

export interface UpdateCartItemRequest {
  quantity: number;
}

export interface CartItem {
  productId: string;
  productName: string;
  unitPrice: number;
  quantity: number;
}

export interface Cart {
  id: string;
  items: CartItem[];
}

export interface CartResponse {
  id: string;
  items: CartItem[];
}
