import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { BrandService } from 'src/app/demo/service/brand.service';
import { Brand } from 'src/app/layout/models/brand';
import { AuthService } from 'src/app/layout/service/auth.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss']
})
export class BrandComponent implements OnInit {
  brands: Brand[] = [];
  selectedBrand: Brand = { id: '', name: '', description: '', addedBy: '' };
  dialogVisible: boolean = false;
  isLoading$: Observable<boolean>;

  constructor(private brandService: BrandService, private authService: AuthService) { // Corrected here
//     this.isLoading$ = this.authService.isLoading$; // Use authService, not authservice
//     if (this.authService.currentUser$) // Fixed usage
//         this.authService.logout(); // Fixed usage
}

  ngOnInit(): void {
    this.loadBrands();
  }

  loadBrands(): void {
    this.brandService.getAllBrands().subscribe((data) => (this.brands = data));
  }

  openNewBrandDialog() {
    this.selectedBrand = { id: '', name: '', description: '', addedBy:''  }; // Nouvelle marque
    this.dialogVisible = true;
  }

  editBrand(brand: Brand) {
    this.selectedBrand = { ...brand }; // Cloner l'objet pour éviter les modifications directes
    this.dialogVisible = true;
  }

  deleteBrand(id: string): void {
    this.brandService.deleteBrand(id).subscribe(() => this.loadBrands());
  }

  saveBrand(brand: Brand) {
    if (brand.id) {
      // Mise à jour de la marque existante
      this.brandService.updateBrand(brand.id, brand).subscribe(() => {
        this.loadBrands();
        this.dialogVisible = false; // Fermer le dialogue après la sauvegarde
      });
    } else {
      // Création d'une nouvelle marque
      this.brandService.createBrand(brand).subscribe(() => {
        this.loadBrands();
        this.dialogVisible = false; // Fermer le dialogue après la sauvegarde
      });
    }
  }
}
