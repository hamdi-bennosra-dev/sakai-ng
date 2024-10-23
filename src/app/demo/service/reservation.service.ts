import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reservation } from 'src/app/layout/models/reservation';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
    private apiUrl = environment.apiUrl + 'product/'; // URL de votre API backend

  constructor(private http: HttpClient) {}

  getAllReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.apiUrl + 'reservations');
  }

  getReservationById(id: string): Observable<Reservation> {
    return this.http.get<Reservation>(`${this.apiUrl + 'reservations'}/${id}`);
  }

  createOrUpdateReservation(reservation: Reservation): Observable<Reservation> {
    return this.http.post<Reservation>(this.apiUrl + 'reservations', reservation);
  }

  deleteReservation(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl + 'reservations'}/${id}`);
  }
}
