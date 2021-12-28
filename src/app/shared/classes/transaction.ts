export interface ITransaction {
  transactionId: number;
  accountId: number;
  accountNumber: string;
  type: string;
  amount: number;
  description: string;
  transDateTime: Date;
  createdBy: string;
  createdDate: Date;
}
