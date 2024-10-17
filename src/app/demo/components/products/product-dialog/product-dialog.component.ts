import { Component } from '@angular/core';
import { FileUpload } from '../utils/file-upload';
import { ProductEditDialog } from '../utils/product-edit-dialog';
import { ProductService } from 'src/app/demo/service/product.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BesyessaProduct } from 'src/app/layout/models/product';
import { StorageService } from 'src/app/demo/service/storage.service';
import { forkJoin } from 'rxjs';

@Component({
    selector: 'app-product-dialog',
    templateUrl: './product-dialog.component.html',
    styleUrl: './product-dialog.component.scss',
})
export class ProductDialogComponent
    extends FileUpload
    implements ProductEditDialog
{
    reference: string = '';
    price: number = 0;
    uuid: string = null;
    productModelId: string = '';

    constructor(
        private productService: ProductService,
        private dialogRef: DynamicDialogRef,
        private dialogConfig: DynamicDialogConfig,
        private storageService: StorageService
    ) {
        super();

        if (this.dialogConfig.data) {
            const { id, img, price, productModelId, reference } =
                this.dialogConfig.data;
            this.uuid = id;
            this.reference = reference;
            this.imageSrc = img;
            this.price = price;
            this.productModelId = productModelId;
        }
    }

    isSaveValid(): boolean {
        return this.reference && this.price > 0;
    }

    save(): void {
        if (this.isSaveValid()) {
            const product = {
                id: this.uuid,
                reference: this.reference,
                productModel: {
                    id: this.productModelId,
                },
            };

            if (product.id) {
                this.changePriceAndImage(product.id);
            } else {
                this.productService.saveProduct(product).subscribe({
                    next: (result: BesyessaProduct) =>
                        this.changePriceAndImage(result.id),
                });
            }
        }
    }

    changePriceAndImage(id: string) {
        const changePrice = this.productService.changeProductPrice({
            amount: this.price,
            currency: 'TND',
            product: {
                id,
            },
        });
        const uploadImg = this.storageService.uploadFile(
            'products',
            id,
            this.file
        );
        if (this.price != this.dialogConfig.data?.price && this.file) {
            forkJoin({
                price: changePrice,
                file: uploadImg,
            }).subscribe({
                complete: () => this.dialogRef.close(true),
            });
        } else if (this.price != this.dialogConfig.data?.price) {
            changePrice.subscribe({
                complete: () => this.dialogRef.close(true),
            });
        } else if (this.file) {
            uploadImg.subscribe({
                complete: () => this.dialogRef.close(true),
            });
        } else {
            this.dialogRef.close(true);
        }
    }
}
