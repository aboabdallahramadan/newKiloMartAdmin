export type ProvidersLocations = {
    providerId: number,
    displayName: string,
    locationDetails: {
        long: number,
        lat: number,
        city: string,
        buildingNumber: string,
        apartmentNumber: string,
        floorNumber: string,
        streetNumber: string
    }
};