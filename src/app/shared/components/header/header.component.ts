import { Component, inject } from '@angular/core';
import { PdfExportService } from '../../../features/cv/services/pdf-export.service';
import { CvLanguage } from '../../../features/cv/models/cv-data.types';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private pdfExportService = inject(PdfExportService);

  /**
   * Download CV in specified language
   */
  async downloadCv(language: CvLanguage): Promise<void> {
    try {
      // Navigate to CV page first if not already there
      const currentPath = window.location.pathname;
      if (!currentPath.includes('/cv')) {
        window.location.href = '/cv';
        // Wait for navigation and page load
        await new Promise((resolve) => setTimeout(resolve, 500));
      }

      // Export to PDF
      await this.pdfExportService.exportCv(language);
    } catch (error) {
      console.error('Error downloading CV from header:', error);
    }
  }
}
