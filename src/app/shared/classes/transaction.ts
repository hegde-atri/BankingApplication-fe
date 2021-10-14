export interface ITransaction {
  AccountNumber: string;
  Type: string;
  Amount: number;
  Description: string;
  TransDateTime: Date;
  CreatedBy: string;
  CreatedDate: Date;
}
