import { TitleCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProductService } from 'src/app/demo/service/product.service';
import { StorageService } from 'src/app/demo/service/storage.service';
import { MyDropdownItem } from 'src/app/layout/models/dropdown-item';
import { ProductModel } from 'src/app/layout/models/productModel';
import { FileUpload } from '../utils/file-upload';
import { ProductEditDialog } from '../utils/product-edit-dialog';

@Component({
    selector: 'app-product-model-dialog',
    templateUrl: './product-model-dialog.component.html',
    styleUrl: './product-model-dialog.component.scss',
})
export class ProductModelDialogComponent
    extends FileUpload
    implements ProductEditDialog
{
    brandItems: MyDropdownItem[] = [];
    categoryItems: MyDropdownItem[] = [];
    selectedBrand: string = '';
    selectedCategory: string = '';
    description: string = '';
    name: string = '';
    uuid: string | null;

    constructor(
        private productService: ProductService,
        private storageService: StorageService,
        titleCasePipe: TitleCasePipe,
        private dialogRef: DynamicDialogRef,
        private dialogConfig: DynamicDialogConfig
    ) {
        super();
        productService
            .getBrandsDropdown()
            .subscribe((brands: MyDropdownItem[]) => {
                this.brandItems = [...brands];
            });

        productService.getCategories().subscribe((categories: string[]) => {
            this.categoryItems = categories.map((c: string) => {
                return {
                    value: c,
                    label: titleCasePipe.transform(c),
                };
            });
        });

        this.uuid = this.dialogConfig.data?.id;
        console.log(this.dialogConfig.data?.img);
        
        this.imageSrc = this.dialogConfig.data?.img;
        if (this.uuid)
            productService
                .getProductModelByID(this.uuid)
                .subscribe((p: ProductModel) => {
                    this.name = p.name;
                    this.description = p.description;
                    this.selectedBrand = p.brand?.id;
                    this.selectedCategory = p.productType;
                });
    }

    save(): void {
        if (this.isSaveValid()) {
            const product = new ProductModel();
            product.id = this.uuid;
            product.name = this.name;
            product.description = this.description;
            product.brand = {
                id: this.selectedBrand,
            };
            product.productType = this.selectedCategory;

            const observable = product.id
                ? this.productService.updateProductModel(product)
                : this.productService.saveProductModel(product);

            observable.subscribe((result: ProductModel) => {
                if (this.file) {
                    this.storageService
                        .uploadFile('models', result.id, this.file)
                        .subscribe({
                            complete: () => this.dialogRef.close(true),
                        });
                } else {
                    this.dialogRef.close(true);
                }
            });
        }
    }

    isSaveValid(): boolean {
        return (
            this.name != null &&
            this.selectedBrand != null &&
            this.selectedCategory != null
        );
    }
}
