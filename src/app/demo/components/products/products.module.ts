import { NgModule } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { TableDemoRoutingModule } from '../uikit/table/tabledemo-routing.module';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { ProgressBarModule } from 'primeng/progressbar';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { SliderModule } from 'primeng/slider';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { TableDemoComponent } from '../uikit/table/tabledemo.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { ProductModelDialogComponent } from './product-model-dialog/product-model-dialog.component';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ProductsViewComponent } from './products-view/products-view.component';
import { DataViewModule } from 'primeng/dataview';
import { PickListModule } from 'primeng/picklist';
import { OrderListModule } from 'primeng/orderlist';

@NgModule({
    imports: [
        CommonModule,
        TableDemoRoutingModule,
        FormsModule,
        TableModule,
        RatingModule,
        ButtonModule,
        SliderModule,
        InputTextModule,
        ToggleButtonModule,
        RippleModule,
        MultiSelectModule,
        DropdownModule,
        ProgressBarModule,
        ToastModule,
        ProductsRoutingModule,
        DynamicDialogModule,
        TooltipModule,
        InputTextareaModule,
        DataViewModule,
        DataViewModule,
		PickListModule,
		OrderListModule,
    ],
    providers: [
        MessageService,
        ConfirmationService,
        DialogService,
        TitleCasePipe,
    ],
    declarations: [
        TableDemoComponent,
        ProductModelDialogComponent,
        ProductsViewComponent
    ],
})
export class ProductsModule {}
