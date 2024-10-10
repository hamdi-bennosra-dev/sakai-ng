import { Component } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ProductService } from 'src/app/demo/service/product.service';
import { ReservationDTO } from 'src/app/layout/models/product';
import { addDays, differenceInDays, format, parse } from 'date-fns';
import { ProductEditDialog } from '../utils/product-edit-dialog';

@Component({
    selector: 'app-loan-dialog',
    templateUrl: './loan-dialog.component.html',
    styleUrl: './loan-dialog.component.scss',
})
export class LoanDialogComponent implements ProductEditDialog {
    id: string = '';
    pricedId: string = '';
    reservations: { loanedFrom: Date; loanedUntil: Date }[] = [];
    today = new Date();
    rangeDates: Date[] = [];
    disabledDates: Date[] = [];
    private readonly formatString = 'dd/MM/yyyy HH:mm:ss'; // Format of loanedFrom and loanedUntil

    constructor(
        private productService: ProductService,
        private dialogRef: DynamicDialogRef,
        private dialogConfig: DynamicDialogConfig
    ) {
        if (this.dialogConfig.data) {
            const { id, reservations, priceId } = this.dialogConfig.data;
            this.id = id;
            this.pricedId = priceId;
            this.reservations =
                reservations?.map((reservation: ReservationDTO) => {
                    const loanedFrom = parse(
                        reservation.loanedFrom,
                        this.formatString,
                        new Date()
                    );
                    const loanedUntil = parse(
                        reservation.loanedUntil,
                        this.formatString,
                        new Date()
                    );

                    // Get all the dates between loanedFrom and loanedUntil
                    const datesBetween = this.getDatesBetween(
                        loanedFrom,
                        loanedUntil
                    );

                    // Add the dates to disabledDates without duplicates
                    datesBetween.forEach((date) => {
                        if (
                            !this.disabledDates.some(
                                (disabledDate) =>
                                    disabledDate.getTime() === date.getTime()
                            )
                        ) {
                            this.disabledDates.push(date);
                        }
                    });

                    return {
                        loanedFrom,
                        loanedUntil,
                    };
                }) ?? [];

            console.table(this.reservations);
        } else {
            this.dialogRef.close();
        }
    }

    getDatesBetween(startDate: Date, endDate: Date): Date[] {
        const dates: Date[] = [];
        const diffDays = differenceInDays(endDate, startDate); // Calculate the number of days between

        for (let i = 0; i <= diffDays; i++) {
            dates.push(addDays(startDate, i)); // Add each day between start and end
        }

        return dates;
    }

    isSaveValid(): boolean {
        return this.rangeDates?.filter((d: Date) => d != null)?.length >= 2;
    }

    save(): void {
        if (this.isSaveValid()) {
            const reservation = {
                loanedFrom: format(this.rangeDates[0], this.formatString),
                loanedUntil: format(
                    this.rangeDates[this.rangeDates.length - 1],
                    this.formatString
                ),
                price: {
                    id: this.pricedId,
                },
                product: {
                    id: this.id,
                },
            };
            this.productService.makeReservation(reservation).subscribe({
                next: () => this.dialogRef.close(true),
            });
        }
    }
}
