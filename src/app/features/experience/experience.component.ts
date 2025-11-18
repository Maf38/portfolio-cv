import { Component, inject } from '@angular/core';
import { PdfExportService } from '../cv/services/pdf-export.service';

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
      // Navigate to CV page if not already there
      const currentPath = window.location.pathname;
      if (!currentPath.includes('/cv')) {
        window.location.href = '/cv';
        // Wait for navigation and page load
        await new Promise((resolve) => setTimeout(resolve, 500));
      }

      // Export CV in English
      await this.pdfExportService.exportCv('en');
    } catch (error) {
      console.error('Error downloading full resume:', error);
    }
  }
}
