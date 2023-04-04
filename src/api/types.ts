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
  isPrimary: boolean
}

export type Addresses = {
  shipping: Address[];
  belling: Address[];
}

export type UserInfo =  {
  name: string;
  cart: [];
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
    image: string;
    quantity: number;
    price: number
  }[]

  address: {
    shipping: Address;
    belling: Address;
  }
}  

// export type User = {
//   loading: boolean;
//   userInfo:  UserInfo
// }