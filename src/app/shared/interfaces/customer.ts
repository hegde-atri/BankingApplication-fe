export interface ICustomer {
  customerId: number;
  firstname: string;
  lastname: string;
  email: string;
  gender: string;
  // doB is spelt like this to allow mapping of json customer objects to customer objects
  doB: Date;
  status: string;
  createdDate: Date;
  createdBy: string;
  modifiedDate: Date;
  modifiedBy: string;
  budget: number;
}
