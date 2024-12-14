export type ProductDetails = {
    id: number,
    name: string,
    description: string,
    imageUrl: string,
    measurementUnit: string,
    categoryName: string,
    totalOrders: number,
    minPrice: number,
    maxPrice: number,
    isActive: boolean,
    categoryId: number
}