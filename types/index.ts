export interface Restaurant {
  id: string;
  name: string;
  image: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: number;
  minimumOrder: number;
  isPromoted?: boolean;
  categories: string[];
  menu: MenuItem[];
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  customizations?: Customization[];
  isPopular?: boolean;
}

export interface Customization {
  id: string;
  name: string;
  type: 'radio' | 'checkbox';
  required: boolean;
  options: CustomizationOption[];
}

export interface CustomizationOption {
  id: string;
  name: string;
  price: number;
}

export interface CartItem {
  id: string;
  menuItem: MenuItem;
  quantity: number;
  customizations: { [key: string]: string | string[] };
  totalPrice: number;
}

export interface Order {
  id: string;
  restaurant: Restaurant;
  items: CartItem[];
  status: 'preparing' | 'ready' | 'picked_up' | 'on_the_way' | 'delivered';
  totalAmount: number;
  deliveryAddress: string;
  orderTime: Date;
  estimatedDelivery: Date;
  driver?: Driver;
}

export interface Driver {
  id: string;
  name: string;
  photo: string;
  rating: number;
  vehicle: string;
  location: {
    latitude: number;
    longitude: number;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  photo?: string;
  addresses: Address[];
  favoriteRestaurants: string[];
}

export interface Address {
  id: string;
  type: 'home' | 'work' | 'other';
  street: string;
  city: string;
  state: string;
  zipCode: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}