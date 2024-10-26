import { Component, OnInit } from '@angular/core';
import { ReservationService } from 'src/app/demo/service/reservation.service';
import { Reservation } from 'src/app/layout/models/reservation';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {
  reservations: Reservation[] = [];
  groupedReservations: { [key: string]: { totalPrice: number; reservations: Reservation[] } } = {};
  selectedReservation: Reservation | null = null;
  viewMode: 'details' | 'edit' | null = null;
  loading = true;
  Object = Object;
  totalPrice: number = 0;

  constructor(private reservationService: ReservationService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadReservations();
  }

  calculateTotalPrice() {
    this.totalPrice = this.reservations.reduce((sum, reservation) => {
      return sum + reservation.price.amount;
    }, 0);
  }

  private loadReservations(): void {
    this.loading = true;
    this.reservationService.getAllReservations().subscribe(
      (data) => {
        this.reservations = data.map((reservation: any) => ({
          ...reservation,
          loanedOn: this.convertToDate(reservation.loanedOn),
          loanedFrom: this.convertToDate(reservation.loanedFrom),
          loanedUntil: this.convertToDate(reservation.loanedUntil),
        }));
        this.groupReservations();
        this.loading = false;
        this.calculateTotalPrice();
      },
      (error) => {
        console.error('Error loading reservations:', error);
        this.loading = false;
      }
    );
  }

  private groupReservations(): void {
    this.groupedReservations = {};
  
    this.reservations.forEach(reservation => {
      const loanedOnDate = new Date(reservation.loanedOn).toLocaleDateString('en-CA'); // Format 'yyyy-MM-dd'
      const userId = reservation.userId;
      const groupKey = `${userId}_${loanedOnDate}`; // Créer une clé unique pour le regroupement
  
      if (!this.groupedReservations[groupKey]) {
        this.groupedReservations[groupKey] = { totalPrice: 0, reservations: [] };
      }
  
      // Ajouter la réservation au groupe correspondant (userId + loanedOn)
      this.groupedReservations[groupKey].reservations.push(reservation);
      this.groupedReservations[groupKey].totalPrice += reservation.price.amount;
    });
  }
  
  private convertToDate(dateString: string): string {
    const parts = dateString.split(/[/ :]/); // Diviser par / et par espace
    const day = parts[0];
    const month = parts[1];
    const year = parts[2];
    const hours = parts[3];
    const minutes = parts[4];
    const seconds = parts[5];

    // Créer une nouvelle date au format ISO
    return new Date(Date.UTC(+year, +month - 1, +day, +hours, +minutes, +seconds)).toISOString();
  }

  showDetails(reservation: Reservation): void {
    this.selectedReservation = reservation;
    this.viewMode = 'details';
    this.cd.detectChanges();
  }

  editReservation(reservation: Reservation): void {
    this.selectedReservation = {
      ...reservation,
      loanedFrom: reservation.loanedFrom.split('T')[0],  // Convertir au format yyyy-MM-dd
      loanedUntil: reservation.loanedUntil.split('T')[0], // Convertir au format yyyy-MM-dd
    };
    this.viewMode = 'edit';
    this.cd.detectChanges();
  }

  saveReservation(): void {
    if (this.selectedReservation) {
      // Transformez les dates de retour au format ISO
      this.selectedReservation.loanedFrom = new Date(this.selectedReservation.loanedFrom).toISOString();
      this.selectedReservation.loanedUntil = new Date(this.selectedReservation.loanedUntil).toISOString();
      
      this.reservationService.createOrUpdateReservation(this.selectedReservation).subscribe(() => {
        this.closeDialog();
        this.loadReservations();
      });
    }
  }
  
  closeDialog(): void {
    this.selectedReservation = null;
    this.viewMode = null;
  }

  deleteReservation(id: string): void {
    this.reservationService.deleteReservation(id).subscribe(() => {
      this.loadReservations();
    });
  }
}
