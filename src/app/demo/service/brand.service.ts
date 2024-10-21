import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Brand } from 'src/app/layout/models/brand';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
    private apiUrl = environment.apiUrl + 'product';

  constructor(private http: HttpClient) {}

  getAllBrands(): Observable<Brand[]> {
    return this.http.get<Brand[]>(this.apiUrl+ '/brands');
  }

  getBrandById(id: string): Observable<Brand> {
    return this.http.get<Brand>(`${this.apiUrl+ '/brands'}/${id}`);
  }


  createBrand(brand: Brand): Observable<Brand> {
    return this.http.post<Brand>(this.apiUrl+ '/brands', brand);
  }

  updateBrand(id: string, brand: Brand): Observable<Brand> {
    return this.http.put<Brand>(`${this.apiUrl+ '/brands'}/${id}`, brand);
  }

  deleteBrand(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl+ '/brands'}/${id}`);
  }
}
