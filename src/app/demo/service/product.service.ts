import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductModelItem } from 'src/app/layout/models/productModelItem';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BesyessaProduct, PriceDTO, ProductItemDTO, ReservationDTO } from 'src/app/layout/models/product';
import { MyDropdownItem } from 'src/app/layout/models/dropdown-item';
import { ProductModel } from 'src/app/layout/models/productModel';
import { Product } from '../api/product';

@Injectable()
export class ProductService {
    private product: ProductModelItem | null = null; // Shared product variable
    private apiUrl = environment.apiUrl + 'product'; // Your backend API endpoint

    constructor(private http: HttpClient) {}

    getAllProductModels(): Observable<ProductModelItem[]> {
        return this.http.get<ProductModelItem[]>(this.apiUrl + '/models');
    }

    getAllProducts(uuid: string): Observable<ProductItemDTO[]> {
        return this.http.get<ProductItemDTO[]>(
            this.apiUrl + '/by-model/' + uuid
        );
    }

    getProductModelByID(uuid: string): Observable<ProductModel> {
        return this.http.get<ProductModel>(this.apiUrl + '/models/' + uuid);
    }

    getBrandsDropdown(): Observable<MyDropdownItem[]> {
        return this.http.get<MyDropdownItem[]>(this.apiUrl + '/brands/items');
    }

    getCategories(): Observable<string[]> {
        return this.http.get<string[]>(this.apiUrl + '/models/categories');
    }

    saveProductModel(productModel: ProductModel): Observable<ProductModel> {
        return this.http.post<ProductModel>(
            this.apiUrl + '/models',
            productModel
        );
    }

    updateProductModel(productModel: ProductModel): Observable<ProductModel> {
        return this.http.put<ProductModel>(
            this.apiUrl + '/models/' + productModel.id,
            productModel
        );
    }

    updateProduct(product: ProductModel): Observable<BesyessaProduct> {
        return this.http.put<BesyessaProduct>(
            this.apiUrl + '/' + product.id,
            product
        );
    }

    saveProduct(product: ProductModel): Observable<BesyessaProduct> {
        return this.http.post<BesyessaProduct>(
            this.apiUrl,
            product
        );
    }

    changeProductPrice(price: PriceDTO): Observable<void> {
        return this.http.post<void>(
            this.apiUrl + '/prices',
            price
        );
    }

    makeReservation(reservation: ReservationDTO): Observable<void> {
        return this.http.post<void>(
            this.apiUrl + '/reservations',
            reservation
        );
    }

    // SET VARIABLE for state: 
    setProduct(product: ProductModelItem): void {
        this.product = product;
    }

    getProduct(): ProductModelItem | null {
        return this.product;
    }

    clearProduct(): void {
        this.product = null;
    }
    // END OF setting variable for state.

    getProductsSmall() {
        return this.http
            .get<any>('assets/demo/data/products-small.json')
            .toPromise()
            .then((res) => res.data as Product[])
            .then((data) => data);
    }

    getProducts() {
        return this.http
            .get<any>('assets/demo/data/products.json')
            .toPromise()
            .then((res) => res.data as Product[])
            .then((data) => data);
    }

    getProductsMixed() {
        return this.http
            .get<any>('assets/demo/data/products-mixed.json')
            .toPromise()
            .then((res) => res.data as Product[])
            .then((data) => data);
    }

    getProductsWithOrdersSmall() {
        return this.http
            .get<any>('assets/demo/data/products-orders-small.json')
            .toPromise()
            .then((res) => res.data as Product[])
            .then((data) => data);
    }
}
