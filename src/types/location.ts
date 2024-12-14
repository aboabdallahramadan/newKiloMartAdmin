export interface Location {
    id: number;
    name: string;
    userId: number;
    userName: string;
    type: "Apartment" | "House" | "Office";
    buildingNumber: string;
    apartmentNumber: string;
    floorNumber: string;
    streetName: string;
    phoneNumber: string;
    mapDetails: {
        latitude: number;
        longitude: number;
    }
}
