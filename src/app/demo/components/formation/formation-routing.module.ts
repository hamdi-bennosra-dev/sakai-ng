import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormationComponent } from './formation/formation.component';
import { FormationItemComponent } from './formation-item/formation-item.component';

const routes: Routes = [
  { path: 'formation', component: FormationComponent },
  { path: 'formation/:id', component: FormationItemComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormationRoutingModule { }
