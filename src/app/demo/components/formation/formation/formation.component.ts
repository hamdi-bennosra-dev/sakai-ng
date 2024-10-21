import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { DataView } from 'primeng/dataview';
import { StorageService } from 'src/app/demo/service/storage.service';
import { Formation } from 'src/app/layout/models/formation';
import { FormationService } from 'src/app/layout/service/formation.service';
import { FormationDialogComponent } from '../formation-dialog/formation-dialog.component';
import { DialogService } from 'primeng/dynamicdialog';

interface PageEvent {
    first: number;
    rows: number;
    page: number;
    pageCount: number;
}

@Component({
    selector: 'app-formation',
    templateUrl: './formation.component.html',
    styleUrls: ['./formation.component.scss'],
})
export class FormationComponent implements OnInit {
    first: number = 0;
    rows: number = 4;
    formations: Formation[] = [];
    selectedFormation: Formation | null = null;
    sortOptions: SelectItem[] = [];
    sortOrder: number = 0;
    sortField: string = '';

    constructor(
        private formationService: FormationService,
        private router: Router,
        private storageService: StorageService,
        private dialogService: DialogService
    ) {}

    ngOnInit(): void {
        this.loadFormations();
    }

    onPageChange(event: PageEvent) {
        this.first = event.first;
        this.rows = event.rows;
    }

    // Charger toutes les formations
    loadFormations(): void {
        this.formationService.getAllFormations().subscribe((data) => {
            this.formations = data;
            this.formations.forEach((b: Formation) => {
                this.storageService
                    .downloadFile('formations_img', b.id)
                    .subscribe({
                        next: (blob: Blob) => {
                            const url = window.URL.createObjectURL(blob);
                            b.img = url; // Set the image URL to display
                        },
                        error: () => (b.img = null),
                    });
            });
        });
    }

    // Sélectionner une formation
    selectFormation(formation: Formation): void {
        this.selectedFormation = formation;
    }

    navigateToFormation(id: string): void {
        this.router.navigate(['formation/formation', id]); // Changez l'URL selon votre configuration de routage
    }

    // Réinitialiser la sélection
    resetSelection(): void {
        this.selectedFormation = null;
    }

    onSortChange(event: any) {
        const value = event.value;

        if (value.indexOf('!') === 0) {
            this.sortOrder = -1;
            this.sortField = value.substring(1, value.length);
        } else {
            this.sortOrder = 1;
            this.sortField = value;
        }
    }

    onFilter(dv: DataView, event: Event) {
        dv.filter((event.target as HTMLInputElement).value);
    }

    addFormation(formation?: Formation) {
        this.dialogService
            .open(FormationDialogComponent, {
                header: formation
                    ? `Edit Formation - ${formation?.title}`
                    : 'Create a new Formation',
                modal: true,
                width: '50vw',
                data: {
                    id: formation?.id,
                    img: formation?.img,
                },
            })
            .onClose.subscribe((success: boolean) => {
                if (success) this.loadFormations();
            });
    }
}
