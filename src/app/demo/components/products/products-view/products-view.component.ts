import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SelectItem } from 'primeng/api';
import { DataView } from 'primeng/dataview';
import { ProductService } from 'src/app/demo/service/product.service';
import { ProductItemDTO } from 'src/app/layout/models/product';
import { ProductModel } from 'src/app/layout/models/productModel';
import { ProductModelItem } from 'src/app/layout/models/productModelItem';

@Component({
    selector: 'app-products-view',
    templateUrl: './products-view.component.html',
    styleUrls: ['./products-view.component.scss'],
})
export class ProductsViewComponent implements OnInit {
    modelId: string;
    model: ProductModelItem | ProductModel;
    products: ProductItemDTO[] = [];
    sortOptions: SelectItem[] = [];
    sortOrder: number = 0;
    sortField: string = '';

    constructor(
        private productService: ProductService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.sortOptions = [
            { label: 'Price High to Low', value: '!price' },
            { label: 'Price Low to High', value: 'price' },
        ];
    }

    ngOnInit(): void {
        const product = this.productService.getProduct();
        if (product) {
            this.model = product;
            this.modelId = product.id;
            this.fetchProducts(this.modelId);
        } else {
            this.modelId = this.route.snapshot.paramMap.get('id'); // Fallback if not passed through state
            this.productService
                .getProductModelByID(this.modelId)
                .subscribe((p: ProductModel) => {
                    this.model = p;
                });
        }
        if (this.modelId) {
            this.fetchProducts(this.modelId);
        } else {
            console.error('No modelId found.');
        }
    }

    fetchProducts(modelId: string): void {
        console.log('Fetching products for modelId:', modelId);
        this.productService
            .getAllProducts(modelId)
            .subscribe((data: ProductItemDTO[]) => {
                this.products = [...data];
                this.products.forEach((p: ProductItemDTO) => {
                    p.inventoryStatus = p.reservations[0]
                        ? 'OUTOFSTOCK'
                        : 'INSTOCK';
                    p.rating = this.getRandomInt();
                });
            });
    }

    getRandomInt() {
        return Math.floor(Math.random() * (5 - 1 + 1)) + 1;
    }

    onSortChange(event: any) {
        const value = event.value;

        if (value.indexOf('!') === 0) {
            this.sortOrder = -1;
            this.sortField = value.substring(1, value.length);
        } else {
            this.sortOrder = 1;
            this.sortField = value;
        }
    }

    onFilter(dv: DataView, event: Event) {
        dv.filter((event.target as HTMLInputElement).value);
    }
}
