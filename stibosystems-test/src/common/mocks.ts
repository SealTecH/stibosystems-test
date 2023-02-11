import { User, Country, Payment } from './interfaces';
import { PaymentStatus } from './enums';

export const mockUsers: User[] = [{
   id: 'test-id',
   firstName: 'test name',
   lastName: 'test last name',
   email: 'test email',
   avatarUrl: 'avatarUrl'
},
{
   id: 'another-id',
   firstName: 'another name',
   lastName: 'another last name',
   email: 'another test email',
   avatarUrl: null
}];

export const mockCountries: Country[] = [{
   id: 'test-id',
   name: ' test country',
   flag: 'flag',
   code: 'CO'
},
{
   id: 'another-id',
   name: 'another test country',
   flag: 'another flag',
   code: 'CA'
}];

export const mockPayments: Payment[] = [{
   id: 'test-id',
   status: PaymentStatus.Declined,
   receiver: 'test receiver'
},
{
   id: 'another-id',
   status: PaymentStatus.WrongPayslip,
   receiver: 'test receiver'
}];
