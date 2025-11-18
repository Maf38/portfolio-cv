import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PdfExportService } from '../../../features/cv/services/pdf-export.service';
import { CvLanguage } from '../../../features/cv/models/cv-data.types';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private pdfExportService = inject(PdfExportService);

  showContactCard = false;
  copiedItem: 'email' | 'phone' | null = null;
  private copyTimeout?: ReturnType<typeof setTimeout>;

  toggleContactCard(event: Event): void {
    event.preventDefault();
    this.showContactCard = !this.showContactCard;
  }

  closeContactCard(): void {
    this.showContactCard = false;
    this.copiedItem = null;
    if (this.copyTimeout) {
      clearTimeout(this.copyTimeout);
    }
  }

  async copyToClipboard(text: string, item: 'email' | 'phone'): Promise<void> {
    try {
      await navigator.clipboard.writeText(text);
      this.copiedItem = item;

      // Reset after 2 seconds
      if (this.copyTimeout) {
        clearTimeout(this.copyTimeout);
      }
      this.copyTimeout = setTimeout(() => {
        this.copiedItem = null;
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }

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
