import { IconK } from '@dokkan/assets/icons';

export type Address = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  street: string;
  postal_code: number;
  isSelected: boolean
}

export type Addresses = {
  shipping: Address[];
  billing: Address[];
}

export type UserInfo =  {
  id: number | null;
  email: string | null;
  name: string;
  first_name: string;
            last_name: string;
  image: string;
  cart: {total: number | null, items:{id:number, quantity:number,product:Product}[] }
  wishlist: [];
  orders: [];
  addresses: Addresses
}

export type Field = {
  id?:number,
  label?: string,
  name: string,
  type?: string,
  require?: boolean,
  icon?: IconK,
  value?: any

}


export type Product = {
  id: number;
  image: string;
  name: string;
  price: number;
  rating:number;
  reviewsNumber: number;
  descript?: string;
  image_url: string;
  key?: number;
  slug: string
}


export type Order = {
  id: number;
  number: number;
  status: 'pending' | 'processing' | 'delivered' | 'failed' | 'dispatched',
  created_at: string;
  total: number;
  payment_method: string;

  products: {
    id: number;
    title: string;
    image_url: string;
    details: {
      quantity: number;
    price: number;
    name: string; 
    product_name: string
    }
  }[]

  
    shipping_addr: Address;
    billing_addr: Address;
}  

// export type User = {
//   loading: boolean;
//   userInfo:  UserInfo
// }