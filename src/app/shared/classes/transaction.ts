export interface ITransaction {
  accountNumber: string;
  type: string;
  amount: number;
  description: string;
  transDateTime: Date;
  createdBy: string;
  createdDate: Date;
}
