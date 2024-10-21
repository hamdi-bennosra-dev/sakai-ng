// import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
// import { Brand } from 'src/app/layout/models/brand';
// import { FileUpload } from '../utils/file-upload';
// import { StorageService } from 'src/app/demo/service/storage.service';

// @Component({
//   selector: 'app-brand-dialog',
//   templateUrl: './brand-dialog.component.html',
//   styleUrls: ['./brand-dialog.component.scss']
// })
// export class BrandDialogComponent {
//   @Input() visible: boolean = false;
//   @Input() brand: Brand = { id: '', name: '', description: '', addedBy: '', img: '' }; // Valeurs par défaut
//   @Output() brandSaved = new EventEmitter<any>();
//   file: File;
//   @Input() imageSrc: string | ArrayBuffer | null = null;
  

//   ngOnInit() {
//     if (this.brand && this.brand.img) {
//       this.imageSrc = this.brand.img; // Assigner l'URL de l'image existante
//     }
//   }
  

//   save() {
//     this.brandSaved.emit({ brand: this.brand, file: this.file });// Sauvegarde de la marque (la logique sera gérée dans le composant parent)
//   }

//   hideDialog() {
//     this.visible = false;
//   }

//   protected onFileSelected(event: Event): void {
//     const input = event.target as HTMLInputElement;

//     if (input.files && input.files.length) {
//       this.file = input.files[0];
//       const reader = new FileReader();

//       reader.onload = (e) => {
//         this.imageSrc = reader.result;
//       };

//       reader.readAsDataURL(this.file); // Read the file and set it as imageSrc
//     }
//   }
// }




import { Component } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { BrandService } from 'src/app/demo/service/brand.service';
import { StorageService } from 'src/app/demo/service/storage.service';
import { Brand } from 'src/app/layout/models/brand';

@Component({
    selector: 'app-brand-dialog',
    templateUrl: './brand-dialog.component.html',
    styleUrls: ['./brand-dialog.component.scss'],
})
export class BrandDialogComponent {
    name: string = '';
    description: string = '';
    imageSrc: string | undefined;
    uuid: string | null;

    constructor(
        private brandService: BrandService,
        private dialogRef: DynamicDialogRef,
        private dialogConfig: DynamicDialogConfig,
        private storageService: StorageService
    ) {
        this.uuid = this.dialogConfig.data?.id;
        this.imageSrc = this.dialogConfig.data?.img;

        if (this.uuid) {
            this.brandService.getBrandById(this.uuid).subscribe((brand: Brand) => {
                this.name = brand.name || '';
                this.description = brand.description || '';
                this.imageSrc = brand.img;
            });
        }
    }

    onFileSelected(event: Event) {
        const target = event.target as HTMLInputElement;
        if (target.files && target.files.length > 0) {
            const file = target.files[0];
            this.imageSrc = URL.createObjectURL(file);
            // Vous pouvez également stocker le fichier pour le téléchargement plus tard
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

        observable.subscribe(() => {
            this.dialogRef.close(true);
        });
    }

    isSaveValid(): boolean {
        return this.name !== '' && this.description !== '';
    }
}

