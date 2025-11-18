import { Injectable } from '@angular/core';
import html2pdf from 'html2pdf.js';
import { CvLanguage, CvExportOptions } from '../models/cv-data.types';

@Injectable({
  providedIn: 'root',
})
export class PdfExportService {
  /**
   * Export CV as PDF
   * @param elementId - HTML element ID to export
   * @param options - Export options (language, filename)
   */
  async exportToPdf(
    elementId: string,
    options: CvExportOptions
  ): Promise<void> {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error(`Element with ID '${elementId}' not found`);
    }

    const filename = options.filename || this.getDefaultFilename(options.language);

    const pdfOptions = {
      margin: 10,
      filename,
      image: { type: 'jpeg' as const, quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' as const },
    };

    try {
      await html2pdf().set(pdfOptions).from(element).save();
    } catch (error) {
      console.error('Error exporting PDF:', error);
      throw new Error('Failed to export PDF');
    }
  }

  /**
   * Get default filename based on language
   */
  private getDefaultFilename(language: CvLanguage): string {
    const timestamp = new Date().toISOString().split('T')[0];
    const langSuffix = language.toUpperCase();
    return `CV_Mathieu_FALATIEU_${langSuffix}_${timestamp}.pdf`;
  }

  /**
   * Export CV with language-specific settings
   */
  async exportCv(language: CvLanguage): Promise<void> {
    await this.exportToPdf('cv-content', { language });
  }
}
