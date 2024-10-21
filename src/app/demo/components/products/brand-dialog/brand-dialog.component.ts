import { Component } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { BrandService } from 'src/app/demo/service/brand.service';
import { StorageService } from 'src/app/demo/service/storage.service';
import { Brand } from 'src/app/layout/models/brand';
import { FileUpload } from '../utils/file-upload';

@Component({
    selector: 'app-brand-dialog',
    templateUrl: './brand-dialog.component.html',
    styleUrls: ['./brand-dialog.component.scss'],
})
export class BrandDialogComponent extends FileUpload {
    name: string = '';
    description: string = '';
    uuid: string | null;

    constructor(
        private brandService: BrandService,
        private dialogRef: DynamicDialogRef,
        private dialogConfig: DynamicDialogConfig,
        private storageService: StorageService
    ) {
        super();
        this.uuid = this.dialogConfig.data?.id;
        this.imageSrc = this.dialogConfig.data?.img;

        if (this.uuid) {
            this.brandService
                .getBrandById(this.uuid)
                .subscribe((brand: Brand) => {
                    this.name = brand.name || '';
                    this.description = brand.description || '';
                });
        }
    }

    save(): void {
        const brand: Brand = {
            id: this.uuid,
            name: this.name,
            description: this.description,
            // Ajoutez d'autres champs nécessaires ici
        };

        const observable = this.uuid
            ? this.brandService.updateBrand(this.uuid, brand)
            : this.brandService.createBrand(brand);

        observable.subscribe((b) => {
            if (this.file) {
                this.storageService
                    .uploadFile('brands', b.id, this.file)
                    .subscribe(() => {
                        this.dialogRef.close(true);
                    });
            } else {
                this.dialogRef.close(true);
            }
        });
    }

    isSaveValid(): boolean {
        return this.name !== '' && this.description !== '';
    }
}
