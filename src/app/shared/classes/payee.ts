export interface IPayee {
  payeeId: number;
  customerId: number;
  name: string;
  accountNumber: string;
  // AS I AM SINGLE BANK ENTITY, SORTCODE NOT REQUIRED
  sortcode: string;
  description: string;
}
