import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../api/product';
import { ProductModelItem } from 'src/app/layout/models/productModelItem';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductItemDTO } from 'src/app/layout/models/product';
import { MyDropdownItem } from 'src/app/layout/models/dropdown-item';
import { ProductModel } from 'src/app/layout/models/productModel';

@Injectable()
export class ProductService {
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
