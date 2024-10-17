import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Formation } from '../models/formation';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FormationService {
  private apiUrl = environment.apiUrl + 'formations'; // Base URL de l'API

  constructor(private http: HttpClient) {}

  // Récupérer toutes les formations
  getAllFormations(): Observable<Formation[]> {
    return this.http.get<Formation[]>(`${this.apiUrl}`);
  }

  // Récupérer une formation par ID
  getFormationById(id: string): Observable<Formation> {
    return this.http.get<Formation>(`${this.apiUrl}/${id}`);
  }

  // Créer une nouvelle formation
  createFormation(formation: Formation): Observable<Formation> {
    return this.http.post<Formation>(`${this.apiUrl}`, formation);
  }

  // Mettre à jour une formation
  updateFormation(id: string, formation: Formation): Observable<Formation> {
    return this.http.put<Formation>(`${this.apiUrl}/${id}`, formation);
  }

  // Supprimer une formation
  deleteFormation(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
