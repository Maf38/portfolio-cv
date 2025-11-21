import { Component, inject } from '@angular/core';
import { PdfExportService } from '../cv/services/pdf-export.service';
import cvFullData from '../../../assets/data/cv-full-data.json';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss',
})
export class ExperienceComponent {
  private pdfExportService = inject(PdfExportService);

  /**
   * Download CV in English when clicking "View Full Résumé"
   */
  async downloadFullResume(): Promise<void> {
    try {
      // Get English CV data
      const cvData = cvFullData.en;

      // Export CV in English using pdfMake
      await this.pdfExportService.exportToPdf(cvData, { language: 'en' });
    } catch (error) {
      console.error('Error downloading full resume:', error);
    }
  }
}
