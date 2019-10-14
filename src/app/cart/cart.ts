export interface Cart {
  orderId: string;
  username: string;
  items: CartItem[];
}

export interface CartItem {
  uuid: string;
  title: string;
  price: number;
  customizations?: CartCustomization[];
}

export interface CartCustomization {
  uuid: string;
  title: string;
  options: CartOption[];
}

export interface CartOption {
  uuid: string;
  title: string;
  price: number;
}
