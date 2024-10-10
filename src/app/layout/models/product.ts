import { Product } from 'src/app/demo/api/product';
import { ProductModel } from './productModel';

export interface BesyessaProduct {
    id: string; // UUID
    reference?: string;
    productModel?: ProductModel;
    publishedBy?: string; // UUID of the admin who published it
    isAvailable?: boolean;
    publishedOn?: string;
    currentPrice?: PriceDTO;
    reservations?: ReservationDTO[];
    inventoryStatus?: 'INSTOCK' | 'OUTOFSTOCK' | null;
    img?: string;
    rating?: number;
}

export interface PriceDTO {
    id?: string;
    amount?: number; // Assuming the amount is a number
    currency?: string; // Assuming currency is a string (e.g., "USD", "TND", etc.)
    product?: BesyessaProduct;
}

export interface ReservationDTO {
    id?: string; // Assuming id is a string (UUID format)
    loanedFrom: string; // Assuming loanedFrom is a string (ISO date format)
    loanedUntil: string; // Assuming loanedUntil is a string (ISO date format)
    price?: PriceDTO;
    product?: ProductItemDTO;
}

export interface ProductItemDTO {
    id: string; // UUID in string format
    reference?: string; // Reference of the product
    currentPrice?: PriceDTO; // Current price information
    reservations?: ReservationDTO[]; // List of reservations for the product
    inventoryStatus?: 'INSTOCK' | 'OUTOFSTOCK' | null;
    img?: string;
    rating?: number;
}
