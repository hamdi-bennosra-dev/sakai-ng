import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Reservation } from 'src/app/layout/models/reservation';

@Component({
  selector: 'app-reservation-cons-dialog',
  templateUrl: './reservation-cons-dialog.component.html',
  styleUrls: ['./reservation-cons-dialog.component.css']
})
export class ReservationConsDialogComponent {
  @Input() reservation!: Reservation;
  @Output() close = new EventEmitter<void>();

  onClose(): void {
    this.close.emit();
  }
}
