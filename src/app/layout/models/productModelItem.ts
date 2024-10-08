export interface ProductModelItem {
    id: string;            // UUID of the product model
    name: string;         // Name of the product model
    brandName: string;    // Brand name of the product model
    type: string;         // Type/category of the product model
    hasAvailable: boolean; // Indicates if there are available products
    availableCount: number; // Count of available products
    totalCount: number;   // Total count of products
    minPrice: number | null; // Minimum price of the products (can be null)
    maxPrice: number | null; // Maximum price of the products (can be null)
    rating: number | null;
    img: string
}
