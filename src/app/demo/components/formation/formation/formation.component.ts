import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Formation } from 'src/app/layout/models/formation';
import { FormationService } from 'src/app/layout/service/formation.service';

interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.scss']
})
export class FormationComponent implements OnInit {
  first: number = 0;
  rows: number = 10;
  formations: Formation[] = [];
  selectedFormation: Formation | null = null;

  constructor(private formationService: FormationService, private router: Router ) {}

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
    });
  }

  // Sélectionner une formation
  selectFormation(formation: Formation): void {
    this.selectedFormation = formation;
  }

  navigateToFormation(id: string): void {
    this.router.navigate(['formation/formation', id]); // Changez l'URL selon votre configuration de routage
  }

  // Ajouter ou mettre à jour une formation
  saveFormation(): void {
    console.log('saveFormation called');
    console.log('Selected Formation:', this.selectedFormation);
  
    if (this.selectedFormation) {
      if (this.selectedFormation.id) {
        console.log('Updating formation...');
        this.formationService.updateFormation(this.selectedFormation.id, this.selectedFormation)
          .subscribe({
            next: () => {
              this.loadFormations();
              this.selectedFormation = null;
              alert('La formation a été mise à jour avec succès !');
            },
            error: (err) => {
              console.error('Erreur lors de la mise à jour de la formation:', err);
              alert('Échec de la mise à jour de la formation.');
            }
          });
      } else {
        console.log('Creating new formation...');
        this.formationService.createFormation(this.selectedFormation)
          .subscribe({
            next: () => {
              this.loadFormations();
              this.selectedFormation = null;
              alert('Nouvelle formation créée avec succès !');
            },
            error: (err) => {
              console.error('Erreur lors de la création de la formation:', err);
              alert('Échec de la création de la formation.');
            }
          });
      }
    }
  }
  

  // Supprimer une formation
  deleteFormation(id: string): void {
    this.formationService.deleteFormation(id).subscribe(() => {
      this.loadFormations();
    });
  }

  // Réinitialiser la sélection
  resetSelection(): void {
    this.selectedFormation = null;
  }
}
