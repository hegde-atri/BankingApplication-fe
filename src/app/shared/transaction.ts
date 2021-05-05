export interface Transaction {
  accountID: string;
  type: string;
  amount: number;
  description: string;
  dateTime: Date;
}
