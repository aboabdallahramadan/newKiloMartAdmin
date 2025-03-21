export type DeliveryProfile = {
    id: number,
    firstName: string,
    secondName: string,
    nationalName: string,
    nationalId: string,
    licenseNumber: string,
    licenseExpiredDate: Date,
    drivingLicenseNumber: string,
    drivingLicenseExpiredDate: Date,
    vehicleNumber: string,
    vehicleModel: string,
    vehicleType: string,
    vehicleYear: string,
    vehiclePhotoFileUrl: string,
    drivingLicenseFileUrl: string,
    vehicleLicenseFileUrl: string,
    nationalIqamaIDFileUrl: string,
    submitDate: Date,
    reviewDate: Date | null,
    deliveryId: number,
    isActive: boolean,
    isRejected: boolean,
    isAccepted: boolean,
    reviewDescription: string | null
}