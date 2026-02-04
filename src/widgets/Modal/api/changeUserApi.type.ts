import type { UserAddress, UserCompany } from "@/app/ui/MainPage/api/userApi.type";

export type UserUpload = {
  id?: number;
  firstName: string;
  lastName: string;
  maidenName?: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  password?: string;
  birthDate: string;
  image?: string;
  bloodGroup?: string;
  height: number;
  weight: number;
  eyeColor?: string;
  hair?: {
    color: string;
    type: string;
  };
  ip?: string;
  address: UserAddress;
  macAddress?: string;
  university?: string;
  bank?: {
    cardExpire: string;
    cardNumber: string;
    cardType?: string;
    currency: string;
    iban: string;
  };
  company?: UserCompany;
  ein?: string;
  ssn?: string;
  userAgent?: string;
  crypto?: {
    coin: string;
    wallet: string;
    network: string;
  };
  role: 'admin' | 'user' | 'moderator';
};

export interface AddUserResponse extends UserUpload {
  id: number;
}