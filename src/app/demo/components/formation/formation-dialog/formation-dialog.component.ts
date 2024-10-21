import { Component } from '@angular/core';
import { FileUpload } from '../../products/utils/file-upload';
import { FormationService } from 'src/app/layout/service/formation.service';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { StorageService } from 'src/app/demo/service/storage.service';
import { Formation } from 'src/app/layout/models/formation';

@Component({
    selector: 'app-formation-dialog',
    templateUrl: './formation-dialog.component.html',
    styleUrl: './formation-dialog.component.scss',
})
export class FormationDialogComponent extends FileUpload {
    name: string = '';
    description: string = '';
    uuid: string | null;
    options: string[] = ['DEV', 'EDIT', 'OTHERS'];
    selectedCategory: string = 'DEV';

    constructor(
        private formationService: FormationService,
        private dialogRef: DynamicDialogRef,
        private dialogConfig: DynamicDialogConfig,
        private storageService: StorageService
    ) {
        super();
        this.uuid = this.dialogConfig.data?.id;
        this.imageSrc = this.dialogConfig.data?.img;

        if (this.uuid) {
            this.formationService
                .getFormationById(this.uuid)
                .subscribe((f: Formation) => {
                    this.name = f.title || '';
                    this.description = f.description || '';
                    this.selectedCategory = f.type || 'DEV'
                });
        }
    }

    save(): void {
        const formation: Formation = {
            id: this.uuid,
            title: this.name,
            description: this.description,
            type: this.selectedCategory,
        };

        const observable = this.uuid
            ? this.formationService.updateFormation(this.uuid, formation)
            : this.formationService.createFormation(formation);

        observable.subscribe((b) => {
            if (this.file) {
                this.storageService
                    .uploadFile('formations_img', b.id, this.file)
                    .subscribe(() => {
                        this.dialogRef.close(true);
                    });
            } else {
                this.dialogRef.close(true);
            }
        });
    }

    isSaveValid(): boolean {
        return (
            this.name !== '' &&
            this.description !== '' &&
            this.selectedCategory != ''
        );
    }
}
