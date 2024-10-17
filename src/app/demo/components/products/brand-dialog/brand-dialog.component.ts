import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Brand } from 'src/app/layout/models/brand';

@Component({
  selector: 'app-brand-dialog',
  templateUrl: './brand-dialog.component.html',
  styleUrls: ['./brand-dialog.component.scss']
})
export class BrandDialogComponent {
  @Input() visible: boolean = false;
  @Input() brand: Brand = { id: '', name: '', description: '', addedBy: ''  }; // Valeurs par défaut
  @Output() brandSaved = new EventEmitter<Brand>();
  save() {
    this.brandSaved.emit(this.brand);// Sauvegarde de la marque (la logique sera gérée dans le composant parent)
  }

  hideDialog() {
    this.visible = false;
  }
}