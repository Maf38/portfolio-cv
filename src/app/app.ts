import { Component, signal, HostListener, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { HeaderComponent } from './shared/components/header/header.component';
import { PdfExportService } from './features/cv/services/pdf-export.service';
import {
  CvPrintableComponent,
  CvPrintableData,
} from './features/cv/components/cv-printable/cv-printable.component';
import cvData from '../assets/data/cv-data.json';
import cvFullData from '../assets/data/cv-full-data.json';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, CommonModule, CvPrintableComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private readonly pdfExportService = inject(PdfExportService);

  // CV Data from JSON (single source of truth)
  protected readonly cvData = cvData;

  // Full CV data for PDF export (FR and EN)
  protected readonly cvFullData = cvFullData;

  // Current CV data for printable component (updated based on selected language)
  protected cvPrintableData = signal<CvPrintableData>(cvFullData.en);

  // Spotlight effect background (halo lumineux qui suit la souris)
  protected readonly spotlightBackground = signal('transparent');

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    // Ne pas activer le spotlight sur mobile pour économiser la batterie
    if (!this.isBrowser || window.innerWidth < 1024) {
      return;
    }

    // Utiliser requestAnimationFrame pour optimiser les performances
    requestAnimationFrame(() => {
      const x = event.clientX;
      const y = event.clientY;

      // Gradient radial de 600px qui suit la souris
      // Couleur: bleu rgba(29, 78, 216, 0.15) comme brittanychiang.com
      this.spotlightBackground.set(`radial-gradient(
        600px circle at ${x}px ${y}px,
        rgba(29, 78, 216, 0.15),
        transparent 80%
      )`);
    });
  }

  /**
   * Download CV in specified language
   */
  async downloadCv(language: 'en' | 'fr'): Promise<void> {
    try {
      // Get CV data for selected language
      const cvData = language === 'fr' ? this.cvFullData.fr : this.cvFullData.en;

      // Export to PDF using pdfMake (no need for DOM element anymore)
      await this.pdfExportService.exportToPdf(cvData, { language });
    } catch (error) {
      console.error('Error downloading CV:', error);
    }
  }
}
