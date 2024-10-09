import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Product } from 'src/app/demo/api/product';
import { ProductService } from 'src/app/demo/service/product.service';
import { StorageService } from 'src/app/demo/service/storage.service';
import { ProductItemDTO } from 'src/app/layout/models/product';
import { ProductModelItem } from 'src/app/layout/models/productModelItem';
import { ProductModelDialogComponent } from '../product-model-dialog/product-model-dialog.component';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrl: './product-list.component.scss',
})
export class ProductListComponent implements OnInit {
    products: Product[] = [];
    ref: DynamicDialogRef | undefined;

    constructor(
        private productService: ProductService,
        private storageService: StorageService,
        private dialogService: DialogService
    ) {}

    ngOnInit() {
        this.productService.getAllProductModels().subscribe({
            next: (data: ProductModelItem[]) => {
                this.products = [...data];
                this.products.forEach((p: ProductModelItem) => {
                    this.storageService.downloadFile('models', p.id).subscribe({
                        next: (blob: Blob) => {
                            const url = window.URL.createObjectURL(blob);
                            p.img = url; // Set the image URL to display
                        },
                        error: () => (p.img = null),
                    });
                });
            },
        });
    }

    getProductsByModelId(model: ProductModelItem) {
        console.log('getProductsByModelId', model);
        this.productService
            .getAllProducts(model.id)
            .subscribe((products: ProductItemDTO[]) => {
                model.products = [...products];
            });
    }

    openProductModelEdit(product?: ProductModelItem) {
        this.ref = this.dialogService.open(ProductModelDialogComponent, {
            header: product ? `Edit ${product.name}` : 'Create a new Product',
            data: {
                id: product?.id,
            },
        });
    }
}
