import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProductService } from 'src/app/demo/service/product.service';
import { StorageService } from 'src/app/demo/service/storage.service';
import { ProductItemDTO } from 'src/app/layout/models/product';
import { ProductModelItem } from 'src/app/layout/models/productModelItem';
import { ProductModelDialogComponent } from '../product-model-dialog/product-model-dialog.component';
import { Router } from '@angular/router';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrl: './product-list.component.scss',
})
export class ProductListComponent implements OnInit {
    products: ProductModelItem[] = [];
    ref: DynamicDialogRef | undefined;

    constructor(
        private productService: ProductService,
        private storageService: StorageService,
        private dialogService: DialogService,
        private router: Router
    ) {}

    ngOnInit() {
        this.getAll();
    }

    getAll() {
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

                    // this.productService
                    //     .getAllProducts(p.id)
                    //     .subscribe((products: ProductItemDTO[]) => {
                    //         p.products = [...products];
                    //     });
                });
            },
        });
    }

    openProductModelEdit(product?: ProductModelItem) {
        this.ref = this.dialogService.open(ProductModelDialogComponent, {
            header: product
                ? `Edit Model - ${product.name}`
                : 'Create a new Product Model',
            modal: true,
            data: {
                id: product?.id,
                img: product?.img,
            },
        });

        this.ref.onClose.subscribe((success: boolean) => {
            if (success) this.getAll();
        });
    }

    goToModelProducts(product: ProductModelItem) {
        this.productService.setProduct(product);  // Save product in the service
        this.router.navigateByUrl('products/model/' + product.id);
    }
}
