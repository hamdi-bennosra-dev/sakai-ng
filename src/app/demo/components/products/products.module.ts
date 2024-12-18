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
import { ProductDialogComponent } from './product-dialog/product-dialog.component';
import { LoanDialogComponent } from './loan-dialog/loan-dialog.component';
import { CalendarModule } from 'primeng/calendar';
import { ToastService } from 'src/app/layout/service/toast.service';
import { DialogModule } from 'primeng/dialog';
import { CardModule } from 'primeng/card';
import { BrandComponent } from './brand/brand.component';
import { BrandDialogComponent } from './brand-dialog/brand-dialog.component';
import { ReservationComponent } from './reservation/reservation.component';

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
        CalendarModule,
        InputTextModule,
        DialogModule,
        CardModule
    ],
    providers: [
        MessageService,
        ConfirmationService,
        DialogService,
        TitleCasePipe,
        ToastService
    ],
    declarations: [
        TableDemoComponent,
        ProductModelDialogComponent,
        ProductsViewComponent,
        ProductDialogComponent,
        LoanDialogComponent,
        BrandComponent,
        BrandDialogComponent,
        ReservationComponent
    ],
})
export class ProductsModule {}
