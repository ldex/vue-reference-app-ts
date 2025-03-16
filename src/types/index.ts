export interface Product {
  id?: number;
  name: string;
  price: number;
  description: string;
  imageUrl?: string;
  discontinued: boolean;
  fixedPrice: boolean;
  modifiedDate?: string;
}

export interface User {
  username: string;
  token: string | null;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface UserState {
  username: string | null;
  token: string | null;
}