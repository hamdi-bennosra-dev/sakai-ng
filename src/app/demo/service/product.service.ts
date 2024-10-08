import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../api/product';
import { ProductModelItem } from 'src/app/layout/models/productModelItem';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductItemDTO } from 'src/app/layout/models/product';

@Injectable()
export class ProductService {
    private apiUrl = environment.apiUrl + 'product'; // Your backend API endpoint

    constructor(private http: HttpClient) { }

    getAllProductModels(): Observable<ProductModelItem[]> {
        return this.http.get<ProductModelItem[]>(this.apiUrl + "/models");
    }

    getAllProducts(uuid: string): Observable<ProductItemDTO[]> {
        return this.http.get<ProductItemDTO[]>(this.apiUrl + "/by-model/" + uuid);
    }

    getProductsSmall() {
        return this.http.get<any>('assets/demo/data/products-small.json')
            .toPromise()
            .then(res => res.data as Product[])
            .then(data => data);
    }

    getProducts() {
        return this.http.get<any>('assets/demo/data/products.json')
            .toPromise()
            .then(res => res.data as Product[])
            .then(data => data);
    }

    getProductsMixed() {
        return this.http.get<any>('assets/demo/data/products-mixed.json')
            .toPromise()
            .then(res => res.data as Product[])
            .then(data => data);
    }

    getProductsWithOrdersSmall() {
        return this.http.get<any>('assets/demo/data/products-orders-small.json')
            .toPromise()
            .then(res => res.data as Product[])
            .then(data => data);
    }
}
