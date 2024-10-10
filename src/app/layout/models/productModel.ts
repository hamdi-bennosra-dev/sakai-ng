import { Brand } from './brand';

export class ProductModel {
    id: string; // UUID
    name?: string;
    description?: string;
    addedBy?: string; // UUID of the user who added the product model
    addedOn?: Date;
    brand?: Brand | { id: string } | null;
    productType?: string;
    // products?: Product[]; // Uncomment if needed
}
