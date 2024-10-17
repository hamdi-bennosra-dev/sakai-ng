import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductsViewComponent } from './products-view/products-view.component';

const routes: Routes = [
    {
        path: 'list',
        component: ProductListComponent,
    },
    { path: 'model/:id', component: ProductsViewComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ProductsRoutingModule {}
