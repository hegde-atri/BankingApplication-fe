export interface IAccount{
  AccountId: number;
  CustomerId: number;
  AccountNumber: string;
  Sortcode: string;
  Type: string;
  Balance: number;
  Status: string;
  OpenDate: Date;
  CloseDate: Date;
  CreatedBy: string;
  CreatedDate: Date;
  ModifiedBy: string;
  ModifiedDate: Date;
}