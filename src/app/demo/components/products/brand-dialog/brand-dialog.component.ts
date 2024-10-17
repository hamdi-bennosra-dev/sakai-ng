import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Brand } from 'src/app/layout/models/brand';
import { FileUpload } from '../utils/file-upload';
import { StorageService } from 'src/app/demo/service/storage.service';

@Component({
  selector: 'app-brand-dialog',
  templateUrl: './brand-dialog.component.html',
  styleUrls: ['./brand-dialog.component.scss']
})
export class BrandDialogComponent {
  @Input() visible: boolean = false;
  @Input() brand: Brand = { id: '', name: '', description: '', addedBy: '', img: '' }; // Valeurs par défaut
  @Output() brandSaved = new EventEmitter<any>();
  file: File;
  @Input() imageSrc: string | ArrayBuffer | null = null;
  
  save() {
    this.brandSaved.emit({ brand: this.brand, file: this.file });// Sauvegarde de la marque (la logique sera gérée dans le composant parent)
  }

  hideDialog() {
    this.visible = false;
  }

  protected onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length) {
      this.file = input.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        this.imageSrc = reader.result;
      };

      reader.readAsDataURL(this.file); // Read the file and set it as imageSrc
    }
  }
}