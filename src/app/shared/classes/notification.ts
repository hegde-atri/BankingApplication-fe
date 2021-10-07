export interface INotification {
  NotificationId: number;
  CustomerId: number;
  Email: string;
  Phone: string;
  Preference: string;
  Status: string;
  CreatedBy: string;
  CreatedDate: Date;
  ModifiedBy: string;
  ModifiedDate: Date;
}
