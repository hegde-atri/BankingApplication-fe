export interface INotification {
  notificationId: number;
  customerId: number;
  email: string;
  phone: string;
  preference: string;
  type: string;
  status: string;
  createdBy: string;
  createdDate: Date;
  modifiedBy: string;
  modifiedDate: Date;
}
