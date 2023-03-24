import { IconK } from '@dokkan/assets/icons';

export type Address = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  country: string;
  city: string;
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
  id:number,
  label: string,
  name: string,
  type: string,
  require: boolean,
  icon?: IconK

}

// export type User = {
//   loading: boolean;
//   userInfo:  UserInfo
// }