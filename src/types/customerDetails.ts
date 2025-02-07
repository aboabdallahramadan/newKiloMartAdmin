interface Location {
    locationId: number,
    locationLongitude: number,
    locationLatitude: number,
    locationName: string,
    locationParty: number,
    locationIsActive: boolean,
    locationDetailsId: number,
    locationDetailsBuildingType: string,
    locationDetailsBuildingNumber: string,
    locationDetailsFloorNumber: string,
    locationDetailsApartmentNumber: string,
    locationDetailsStreetNumber: string,
    locationDetailsPhoneNumber: string
}

export interface CustomerDetails {
    displayName: string,
    customerId: number,
    userId: number,
    email: string,
    isActive: boolean,
    customer: number,
    firstName: string,
    secondName: string,
    nationalName: string,
    nationalId: string,
    isEmailVerified: boolean,
    ordersCount: number,
    ordersValue: number,
    locations: Location[]
    
}