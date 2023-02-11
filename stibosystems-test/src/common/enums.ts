export enum EntityType {
  Users = 'users',
  Payments = 'payments',
  Countries = 'countries'
}

export enum PaymentStatus {
   WrongPayslip ='wrong_payslip',
   WrongAddress ='wrong_address',
   DeliveryError ='delivery_error',
   Successful ='successful',
   Declined ='declined',
}
