import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { BrandService } from 'src/app/demo/service/brand.service';
import { StorageService } from 'src/app/demo/service/storage.service';
import { Brand } from 'src/app/layout/models/brand';
import { AuthService } from 'src/app/layout/service/auth.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss']
})
export class BrandComponent implements OnInit {
  brands: Brand[] = [];
  selectedBrand: Brand = { id: '', name: '', description: '', addedBy: '', img: '' };
  dialogVisible: boolean = false;
  isLoading$: Observable<boolean>;

  constructor(private brandService: BrandService, private storageService: StorageService) { // Corrected here
    //     this.isLoading$ = this.authService.isLoading$; // Use authService, not authservice
    //     if (this.authService.currentUser$) // Fixed usage
    //         this.authService.logout(); // Fixed usage
  }

  ngOnInit(): void {
    this.loadBrands();
  }

  loadBrands(): void {
    this.brandService.getAllBrands().subscribe(
      (data) => {
        this.brands = data;
        this.brands.forEach((b: Brand) => {
          this.storageService
            .downloadFile('brands', b.id)
            .subscribe({
              next: (blob: Blob) => {
                const url = window.URL.createObjectURL(blob);
                b.img = url; // Set the image URL to display
              },
              error: () => (b.img = null),
            });
        })

      });
  }

  openNewBrandDialog() {
    this.selectedBrand = { id: '', name: '', description: '', addedBy: '', img: '' }; // Nouvelle marque
    this.dialogVisible = true;
  }

  editBrand(brand: Brand) {
    console.log('(Brand)', brand)
    this.selectedBrand = {...brand};
    this.dialogVisible = true;
  }

  deleteBrand(id: string): void {
    this.brandService.deleteBrand(id).subscribe(() => this.loadBrands());
  }

  saveBrand(output: any) {
    const { brand, file } = output;
    let saveBrandObs: Observable<Brand> = null;
    if (brand.id) {
      // Mise à jour de la marque existante
      saveBrandObs = this.brandService.updateBrand(brand.id, brand);
    } else {
      // Création d'une nouvelle marque
      saveBrandObs = this.brandService.createBrand(brand);
    }

    saveBrandObs.subscribe((brand: Brand) => {
      if (file) {
        this.storageService.uploadFile(
          'brands',
          brand.id,
          file
        ).subscribe(() => {
          this.loadBrands();
          this.dialogVisible = false; // Fermer le dialogue après la sauvegarde
        })
      } else {
        this.loadBrands();
        this.dialogVisible = false; // Fermer le dialogue après la sauvegarde
      }
    });
  }
}
