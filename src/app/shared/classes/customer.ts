export interface ICustomer {
  CustomerId: number;
  Firstname: string;
  Lastname: string;
  Gender: string;
  DoB: Date;
  Status: string;
  CreatedDate: Date;
  CreatedBy: string;
  ModifiedDate: Date;
  ModifiedBy: string;
  //TODO: I don't know if I need to add Accounts/Payee objects
}
