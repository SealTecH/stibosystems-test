import { PaymentStatus, EntityType } from './enums';

export interface Payment {
  id: string,
  status: string,
  receiver: string
}
export interface PaymentResponse extends Payment {
  status: PaymentStatus,
  internalFieldA: string,
  xYZRandomField: string
}

export interface Country {
  id: string,
  name: string,
  flag: string,
  code: string,
}
export interface CountryResponse extends Country {
  someWeirdServerFieldNameWithCount: 966
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl: string | null;
}

export type EntityItem = Payment | User | Country;
export type EntityResponse = PaymentResponse | CountryResponse | User;

export type ConcreteEntity<T extends EntityType> = T extends EntityType.Users ? User : (T extends EntityType.Payments ? Payment : Country)
