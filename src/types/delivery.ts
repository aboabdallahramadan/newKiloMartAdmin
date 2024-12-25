export type Delivery = {
    deliveryId: number;
    userId: number;
    displayName: string;
    firstName: string;
    secondName: string;
    nationalId: string;
    nationalName: string;
    drivingLicenseExpiredDate: string;
    drivingLicenseNumber: string;
    licenseExpiredDate: string;
    licenseNumber: string;
    email: string;
    isActive: boolean;
    totalOrders: number;
    availableBalance: number;
    totalBalance: number;
  };