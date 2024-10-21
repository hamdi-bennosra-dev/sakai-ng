import { Component } from '@angular/core';
import { FileUpload } from '../../products/utils/file-upload';
import { StorageService } from 'src/app/demo/service/storage.service';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
    selector: 'app-formation-pdf-dialog',
    templateUrl: './formation-pdf-dialog.component.html',
    styleUrl: './formation-pdf-dialog.component.scss',
})
export class FormationPdfDialogComponent extends FileUpload {
    uuid: string = '';

    constructor(
        private storageService: StorageService,
        private dialogRef: DynamicDialogRef,
        private dialogConfig: DynamicDialogConfig
    ) {
        super();
        this.uuid = this.dialogConfig.data?.id;
    }

    save() {
        if (this.uuid && this.file)
            this.storageService
                .uploadFile('formations', this.uuid, this.file)
                .subscribe({
                    next: (response: string) => {
                        if (response) this.dialogRef.close(true);
                    },
                });
    }
}
