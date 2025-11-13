import { Restaurant, MenuItem, Order, User } from '@/types';

export const mockRestaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Bella Napoli',
    image: 'https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg',
    cuisine: 'Italian',
    rating: 4.8,
    deliveryTime: '25-35 min',
    deliveryFee: 2.99,
    minimumOrder: 15,
    isPromoted: true,
    categories: ['Pizza', 'Pasta', 'Salads'],
    menu: [
      {
        id: '1',
        name: 'Margherita Pizza',
        description: 'Fresh mozzarella, tomato sauce, basil, olive oil',
        price: 18.99,
        image: 'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg',
        category: 'Pizza',
        isPopular: true,
        customizations: [
          {
            id: '1',
            name: 'Size',
            type: 'radio',
            required: true,
            options: [
              { id: '1', name: 'Small', price: 0 },
              { id: '2', name: 'Medium', price: 3 },
              { id: '3', name: 'Large', price: 6 }
            ]
          }
        ]
      },
      {
        id: '2',
        name: 'Spaghetti Carbonara',
        description: 'Pasta with eggs, cheese, pancetta, and black pepper',
        price: 16.99,
        image: 'https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg',
        category: 'Pasta',
      }
    ]
  },
  {
    id: '2',
    name: 'Tokyo Sushi Bar',
    image: 'https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg',
    cuisine: 'Japanese',
    rating: 4.9,
    deliveryTime: '30-40 min',
    deliveryFee: 3.99,
    minimumOrder: 20,
    categories: ['Sushi', 'Ramen', 'Appetizers'],
    menu: [
      {
        id: '3',
        name: 'Salmon Avocado Roll',
        description: 'Fresh salmon, avocado, cucumber, sushi rice',
        price: 12.99,
        image: 'https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg',
        category: 'Sushi',
        isPopular: true,
      }
    ]
  },
  {
    id: '3',
    name: 'Burger Palace',
    image: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg',
    cuisine: 'American',
    rating: 4.6,
    deliveryTime: '20-30 min',
    deliveryFee: 1.99,
    minimumOrder: 12,
    categories: ['Burgers', 'Fries', 'Milkshakes'],
    menu: [
      {
        id: '4',
        name: 'Classic Cheeseburger',
        description: 'Beef patty, cheese, lettuce, tomato, onion, pickles',
        price: 13.99,
        image: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg',
        category: 'Burgers',
        isPopular: true,
      }
    ]
  },
  {
    id: '4',
    name: 'Green Garden',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
    cuisine: 'Healthy',
    rating: 4.7,
    deliveryTime: '15-25 min',
    deliveryFee: 2.49,
    minimumOrder: 10,
    categories: ['Salads', 'Bowls', 'Smoothies'],
    menu: [
      {
        id: '5',
        name: 'Quinoa Buddha Bowl',
        description: 'Quinoa, roasted vegetables, avocado, tahini dressing',
        price: 14.99,
        image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
        category: 'Bowls',
        isPopular: true,
      }
    ]
  },
  {
    id: '5',
    name: 'Spice Route',
    image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg',
    cuisine: 'Indian',
    rating: 4.8,
    deliveryTime: '35-45 min',
    deliveryFee: 3.49,
    minimumOrder: 18,
    categories: ['Curry', 'Biryani', 'Naan'],
    menu: [
      {
        id: '6',
        name: 'Chicken Tikka Masala',
        description: 'Tender chicken in creamy tomato-based curry sauce',
        price: 17.99,
        image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg',
        category: 'Curry',
        isPopular: true,
      }
    ]
  },
  {
    id: '6',
    name: 'Taco Fiesta',
    image: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg',
    cuisine: 'Mexican',
    rating: 4.5,
    deliveryTime: '20-30 min',
    deliveryFee: 2.99,
    minimumOrder: 15,
    categories: ['Tacos', 'Burritos', 'Nachos'],
    menu: [
      {
        id: '7',
        name: 'Carnitas Tacos',
        description: 'Slow-cooked pork, onions, cilantro, lime, corn tortillas',
        price: 11.99,
        image: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg',
        category: 'Tacos',
        isPopular: true,
      }
    ]
  }
];

export const mockUser: User = {
  id: '1',
  name: 'Alex Johnson',
  email: 'alex.johnson@example.com',
  phone: '+1 (555) 123-4567',
  photo: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
  addresses: [
    {
      id: '1',
      type: 'home',
      street: '123 Main St, Apt 4B',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94102',
      coordinates: { latitude: 37.7749, longitude: -122.4194 }
    },
    {
      id: '2',
      type: 'work',
      street: '456 Market St, Floor 10',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94105',
      coordinates: { latitude: 37.7849, longitude: -122.4094 }
    }
  ],
  favoriteRestaurants: ['1', '2', '4']
};

export const mockDriver = {
  id: '2',
  name: 'Maria Rodriguez',
  email: 'driver@example.com',
  phone: '+1 (555) 987-6543',
  photo: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
  rating: 4.9,
  vehicle: {
    make: 'Honda',
    model: 'Civic',
    year: 2022,
    color: 'Blue',
    licensePlate: 'ABC 123'
  },
  earnings: {
    today: 127.50,
    week: 891.25,
    trips: 23
  },
  isOnline: false,
  currentLocation: {
    latitude: 37.7749,
    longitude: -122.4194
  }
};

export const mockOrders: Order[] = [
  {
    id: '1',
    restaurant: mockRestaurants[0],
    items: [
      {
        id: '1',
        menuItem: mockRestaurants[0].menu[0],
        quantity: 1,
        customizations: { 'Size': 'Medium' },
        totalPrice: 21.99
      }
    ],
    status: 'on_the_way',
    totalAmount: 26.97,
    deliveryAddress: '123 Main St, Apt 4B, San Francisco, CA 94102',
    orderTime: new Date(Date.now() - 45 * 60 * 1000),
    estimatedDelivery: new Date(Date.now() + 15 * 60 * 1000),
    driver: {
      id: '1',
      name: 'Maria Rodriguez',
      photo: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
      rating: 4.9,
      vehicle: 'Honda Civic - Blue',
      location: { latitude: 37.7849, longitude: -122.4194 }
    }
  },
  {
    id: '2',
    restaurant: mockRestaurants[1],
    items: [
      {
        id: '2',
        menuItem: mockRestaurants[1].menu[0],
        quantity: 2,
        customizations: {},
        totalPrice: 25.98
      }
    ],
    status: 'delivered',
    totalAmount: 29.97,
    deliveryAddress: '123 Main St, Apt 4B, San Francisco, CA 94102',
    orderTime: new Date(Date.now() - 2 * 60 * 60 * 1000),
    estimatedDelivery: new Date(Date.now() - 1.5 * 60 * 60 * 1000)
  }
];

export const cuisineTypes = [
  'All',
  'Italian',
  'Japanese',
  'American',
  'Healthy',
  'Indian',
  'Mexican',
  'Chinese',
  'Thai',
  'Mediterranean'
];

export const sortOptions = [
  { label: 'Recommended', value: 'recommended' },
  { label: 'Delivery Time', value: 'delivery_time' },
  { label: 'Rating', value: 'rating' },
  { label: 'Price: Low to High', value: 'price_low' },
  { label: 'Price: High to Low', value: 'price_high' }
];