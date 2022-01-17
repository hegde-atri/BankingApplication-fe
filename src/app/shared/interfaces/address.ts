export interface IAddress {
  addressId: number;
  customerId: number;
  line1: string;
  line2: string;
  city: string;
  state: string;
  country: string;
  postcode: string;
  type: string;
  status: string;
  createdBy: string;
  createdDate: Date;
  modifiedBy: string;
  modifiedDate: Date;
}
