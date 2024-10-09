import { TitleCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProductService } from 'src/app/demo/service/product.service';
import { StorageService } from 'src/app/demo/service/storage.service';
import { MyDropdownItem } from 'src/app/layout/models/dropdown-item';
import { ProductModel } from 'src/app/layout/models/productModel';

@Component({
    selector: 'app-product-model-dialog',
    templateUrl: './product-model-dialog.component.html',
    styleUrl: './product-model-dialog.component.scss',
})
export class ProductModelDialogComponent {
    brandItems: MyDropdownItem[] = [];
    categoryItems: MyDropdownItem[] = [];
    selectedBrand: string = '';
    selectedCategory: string = '';
    description: string = '';
    name: string = '';
    imageSrc: string | ArrayBuffer | null = null;
    uuid: string | null;
    file: File;

    constructor(
        private productService: ProductService,
        private storageService: StorageService,
        titleCasePipe: TitleCasePipe,
        private dialogRef: DynamicDialogRef,
        private dialogConfig: DynamicDialogConfig
    ) {
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

    onFileSelected(event: Event): void {
        const input = event.target as HTMLInputElement;

        if (input.files && input.files.length) {
            this.file = input.files[0];
            const reader = new FileReader();

            reader.onload = (e) => {
                this.imageSrc = reader.result;
            };

            reader.readAsDataURL(this.file); // Read the file and set it as imageSrc
        }
    }

    save() {
        if (this.name && this.selectedBrand && this.selectedCategory) {
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
                if (this.file)
                    this.storageService.uploadFile(
                        'models',
                        result.id,
                        this.file
                    );
                this.dialogRef.close(true);
            });
        }
    }
}
