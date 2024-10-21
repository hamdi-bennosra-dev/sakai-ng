import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/demo/service/storage.service';
import { Formation } from 'src/app/layout/models/formation'; // Assurez-vous que le chemin est correct
import { FormationService } from 'src/app/layout/service/formation.service';

@Component({
  selector: 'app-formation-item',
  templateUrl: './formation-item.component.html',
  styleUrls: ['./formation-item.component.scss']
})
export class FormationItemComponent implements OnInit {
  formationId: string | null = null; // ID de la formation à afficher
  formation: Formation | null = null; // Détails de la formation
  pdfSrc: any; 

  constructor(
    private route: ActivatedRoute, // Pour récupérer l'ID depuis l'URL
    private formationService: FormationService, // Service pour les formations
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID de la formation à partir des paramètres de l'URL
    this.formationId = this.route.snapshot.paramMap.get('id');

    // Si l'ID est présent, charger la formation
    if (this.formationId) {
      this.loadFormation(this.formationId);
      
      this.storageService.downloadFile('formations', this.formationId).subscribe({
        next: (blob: Blob) => {
            const url = window.URL.createObjectURL(blob);
            this.pdfSrc = url; // Set the image URL to display
        },
        error: () => (this.pdfSrc= null),
    });
    }
  }

  // Charger une formation par ID
  loadFormation(id: string): void {
    this.formationService.getFormationById(id).subscribe(
      (data: Formation) => {
        this.formation = data; // Assigner les données récupérées
      },
      (error) => {
        console.error('Erreur lors de la récupération de la formation:', error);
      }
    );
  }

  
  // Méthode pour modifier une formation (si nécessaire)
  editFormation(id: string): void {
    // Logique pour modifier la formation, par exemple rediriger vers un formulaire de modification
  }

  // Méthode pour supprimer une formation
  deleteFormation(id: string): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette formation ?')) {
      this.formationService.deleteFormation(id).subscribe(() => {
        alert('Formation supprimée avec succès.');
        // Logique pour rediriger ou mettre à jour l'affichage après suppression
      }, error => {
        console.error('Erreur lors de la suppression de la formation:', error);
        alert('Échec de la suppression de la formation.');
      });
    }
  }
}
