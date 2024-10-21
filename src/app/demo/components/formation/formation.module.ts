import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormationRoutingModule } from './formation-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormationComponent } from './formation/formation.component';
import { CardModule } from 'primeng/card';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { FormationItemComponent } from './formation-item/formation-item.component';

import { PdfViewerModule } from 'ng2-pdf-viewer';
import { DataViewModule } from 'primeng/dataview';
import { FormationDialogComponent } from './formation-dialog/formation-dialog.component';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { FormationPdfDialogComponent } from './formation-pdf-dialog/formation-pdf-dialog.component';
import { FileUploadModule } from 'primeng/fileupload';

@NgModule({
    declarations: [
        FormationComponent,
        FormationItemComponent,
        FormationDialogComponent,
        FormationPdfDialogComponent,
    ],
    imports: [
        CommonModule,
        FormationRoutingModule,
        HttpClientModule,
        CardModule,
        PaginatorModule,
        ButtonModule,
        PdfViewerModule,
        DataViewModule,
        DynamicDialogModule,
        ReactiveFormsModule,
        FormsModule,
        InputTextareaModule,
        InputTextModule,
        FileUploadModule
    ],
    providers: [DialogService],
})
export class FormationModule {}
