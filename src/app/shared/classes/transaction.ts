// export class Transaction {
//   constructor(private AccountNumber: string,
//   private Type: string,
//   private Amount: number,
//   private Description: string,
//   private TransDateTime: Date,
//   private CreatedBy: string,
//     private CreatedDate: Date) {
//     this.Type = Type;
//     this.Amount = Amount;
//     this.Description = Description;
//     this.TransDateTime = TransDateTime;
//     this.CreatedBy = CreatedBy;
//     this.CreatedDate = CreatedDate;

//   }
// }

export interface ITransaction {
  AccountNumber: string;
  Type: string;
  Amount: number;
  Description: string;
  TransDateTime: Date;
  CreatedBy: string;
  CreatedDate: Date;
}
