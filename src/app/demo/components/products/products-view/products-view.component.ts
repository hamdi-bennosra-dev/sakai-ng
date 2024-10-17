import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SelectItem } from 'primeng/api';
import { DataView } from 'primeng/dataview';
import { DialogService } from 'primeng/dynamicdialog';
import { ProductService } from 'src/app/demo/service/product.service';
import { ProductItemDTO } from 'src/app/layout/models/product';
import { ProductModel } from 'src/app/layout/models/productModel';
import { ProductModelItem } from 'src/app/layout/models/productModelItem';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';
import { StorageService } from 'src/app/demo/service/storage.service';
import { isAfter, isBefore, parse } from 'date-fns';
import { LoanDialogComponent } from '../loan-dialog/loan-dialog.component';

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
        private dialogService: DialogService,
        private storageService: StorageService
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
                    this.checkInventoryStatus(p)
                    p.rating = this.getRandomInt();
                    this.storageService
                        .downloadFile('products', p.id)
                        .subscribe({
                            next: (blob: Blob) => {
                                const url = window.URL.createObjectURL(blob);
                                p.img = url; // Set the image URL to display
                            },
                            error: () => (p.img = null),
                        });
                });
            });
    }

    getRandomInt() {
        return Math.floor(Math.random() * (5 - 2 + 1)) + 1;
    }

    checkInventoryStatus(p: ProductItemDTO): void {
        const now = new Date(); // Current date
      
        const formatString = 'dd/MM/yyyy HH:mm:ss'; // Format of loanedFrom and loanedUntil
      
        // Loop through reservations
        for (const reservation of p.reservations) {
          const loanedFromDate = parse(reservation.loanedFrom, formatString, new Date());
          const loanedUntilDate = parse(reservation.loanedUntil, formatString, new Date());
      
          // Check if current date is between loanedFrom and loanedUntil
          if (isAfter(now, loanedFromDate) && isBefore(now, loanedUntilDate)) {
            p.inventoryStatus = 'OUTOFSTOCK';
            return; // Exit early if found
          }
        }
      
        // If no reservation found, set inventoryStatus to INSTOCK
        p.inventoryStatus = 'INSTOCK';
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

    openProductModelEdit(product?: ProductItemDTO) {
        const ref = this.dialogService.open(ProductDialogComponent, {
            header: product
                ? `Edit Product - ${product.reference}`
                : 'Create a new Product Model',
            modal: true,
            data: {
                id: product?.id,
                img: product?.img,
                price: product?.currentPrice?.amount ?? 0,
                productModelId: this.modelId,
                reference: product?.reference,
            },
        });

        ref.onClose.subscribe((success: boolean) => {
            if (success) this.fetchProducts(this.modelId);
        });
    }

    openReservationDialog(product: ProductItemDTO) {
        const ref = this.dialogService.open(LoanDialogComponent, {
            header: `Loan - ${product.reference}`,
            modal: true,
            data: {
                id: product.id,
                reservations: product.reservations,
                priceId: product.currentPrice.id
            },
        });

        ref.onClose.subscribe((success: boolean) => {
            if (success) this.fetchProducts(this.modelId);
        });
    }
}
