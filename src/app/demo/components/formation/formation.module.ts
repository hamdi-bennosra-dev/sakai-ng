import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormationRoutingModule } from './formation-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormationComponent } from './formation/formation.component';
import { CardModule } from 'primeng/card';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { FormationItemComponent } from './formation-item/formation-item.component';


@NgModule({
  declarations: [FormationComponent,FormationItemComponent],
  imports: [
    CommonModule,
    FormationRoutingModule,
    HttpClientModule,
    CardModule,
    PaginatorModule,
    ButtonModule
  ]
})
export class FormationModule { }
