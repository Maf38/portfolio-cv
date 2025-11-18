import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { CvDisplayComponent } from './components/cv-display/cv-display.component';
import { CvDataService } from './services/cv-data.service';
import { PdfExportService } from './services/pdf-export.service';
import { CvData, CvLanguage } from './models/cv-data.types';

@Component({
  selector: 'app-cv',
  standalone: true,
  imports: [CommonModule, CvDisplayComponent],
  templateUrl: './cv.component.html',
  styleUrl: './cv.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CvComponent implements OnInit {
  cvData$!: Observable<CvData>;
  currentLanguage: CvLanguage = 'fr';

  constructor(
    private cvDataService: CvDataService,
    private pdfExportService: PdfExportService
  ) {}

  ngOnInit(): void {
    this.cvData$ = this.cvDataService.getCvData();
  }

  /**
   * Export CV as PDF in specified language
   */
  async downloadCv(language: CvLanguage): Promise<void> {
    try {
      // Set language for display
      this.currentLanguage = language;

      // Wait for view to update
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Export to PDF
      await this.pdfExportService.exportCv(language);
    } catch (error) {
      console.error('Error downloading CV:', error);
      alert('Error downloading CV. Please try again.');
    }
  }
}
