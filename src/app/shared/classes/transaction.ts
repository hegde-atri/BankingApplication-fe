export interface ITransaction {
  TransactionId: number;
  AccountNumber: string;
  Type: string;
  Amount: number;
  Description: string;
  TransDateTime: Date;
  CreatedBy: string;
  CreatedDate: Date;
}
