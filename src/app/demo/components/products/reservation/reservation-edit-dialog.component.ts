import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Reservation } from 'src/app/layout/models/reservation';
import { ReservationService } from 'src/app/demo/service/reservation.service';

@Component({
  selector: 'app-reservation-edit-dialog',
  templateUrl: './reservation-edit-dialog.component.html',
  styleUrls: ['./reservation-edit-dialog.component.css']
})
export class ReservationEditDialogComponent {
  @Input() reservation!: Reservation;
  @Output() close = new EventEmitter<void>();

  constructor(private reservationService: ReservationService) {}

  saveReservation(): void {
    this.reservationService.createOrUpdateReservation(this.reservation).subscribe(() => {
      this.close.emit();
    });
  }

  onClose(): void {
    this.close.emit();
  }
}
