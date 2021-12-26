// import { ITransaction } from "./transaction";

// export class Account{
//   constructor(
//   private AccountId: number,
//   private CustomerId: number,
//   private AccountNumber: string,
//   private Sortcode: string,
//   private Type: string,
//   private Balance: number,
//   private Status: string,
//   private OpenDate: Date,
//   private CloseDate: Date,
//   private CreatedBy: string,
//   private CreatedDate: Date,
//   private ModifiedBy: string,
//   private ModifiedDate: Date,
//   private Transactions: ITransaction[]) {
//     this.AccountId = AccountId;
//     this.CustomerId = CustomerId;
//     this.AccountNumber = AccountNumber;
//     this.Sortcode = Sortcode;
//     this.Type = Type;
//     this.Balance = Balance;
//     this.Status = Status;
//     this.OpenDate = OpenDate;
//     this.CloseDate = CloseDate;
//     this.CreatedBy = CreatedBy;
//     this.CreatedDate = CreatedDate;
//     this.ModifiedBy = ModifiedBy;
//     this.ModifiedDate = ModifiedDate;
//     this.Transactions = Transactions;
//   }
// }

export interface IAccount {
  accountId: number;
  customerId: number;
  accountNumber: string;
  sortcode: string;
  type: string;
  balance: number;
  status: string;
  openDate: Date;
  closeDate: Date;
  createdBy: string;
  createdDate: Date;
  modifiedBy: string;
  modifiedDate: Date;
}
