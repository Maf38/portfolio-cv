import { Injectable } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { TDocumentDefinitions, Content } from 'pdfmake/interfaces';
import {
  hexagons,
  topography,
  circuitBoard,
  bankNote,
  fancyRectangles,
  squares,
} from 'hero-patterns';
import { CvLanguage, CvExportOptions } from '../models/cv-data.types';
import { CvPrintableData } from '../components/cv-printable/cv-printable.component';

// Register fonts for pdfMake
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(pdfMake as any).vfs = (pdfFonts as any).pdfMake?.vfs || pdfFonts;

@Injectable({
  providedIn: 'root',
})
export class PdfExportService {
  /**
   * Export CV as PDF using pdfMake
   * @param cvData - CV data for the selected language
   * @param options - Export options (language, filename)
   */
  async exportToPdf(cvData: CvPrintableData, options: CvExportOptions): Promise<void> {
    const filename = options.filename || this.getDefaultFilename(options.language);

    try {
      // Get background pattern SVG
      const backgroundSvg = this.getRandomBackgroundPattern();

      // Convert photo to base64
      const photoBase64 = await this.getPhotoAsBase64();

      // Create document definition
      const docDefinition = this.createDocumentDefinition(
        cvData,
        options.language,
        backgroundSvg,
        photoBase64,
      );

      // Generate and download PDF
      pdfMake.createPdf(docDefinition).download(filename);
    } catch (error) {
      // Log error for debugging but throw a clean error message
      // eslint-disable-next-line no-console
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
    return `CV_Mafal_Gai_${langSuffix}_${timestamp}.pdf`;
  }

  /**
   * Get background pattern from hero-patterns
   * Randomly selects one pattern for variety
   */
  private getRandomBackgroundPattern(): string {
    const patterns: Array<() => string> = [
      (): string => hexagons('#3b82f6', 0.05), // Blue hexagons - very subtle
      (): string => topography('#6b7280', 0.05), // Gray topography
      (): string => circuitBoard('#22c55e', 0.04), // Green circuit board
      (): string => bankNote('#a855f7', 0.05), // Purple bank note
      (): string => fancyRectangles('#14b8a6', 0.05), // Teal fancy rectangles
      (): string => squares('#3b82f6', 0.04), // Blue squares
    ];

    const randomPattern = patterns[Math.floor(Math.random() * patterns.length)];
    return randomPattern();
  }

  /**
   * Convert photo to base64
   */
  private async getPhotoAsBase64(): Promise<string> {
    try {
      const response = await fetch('/assets/images/cv/photo-cv.png');

      // Check if response is OK
      if (!response.ok) {
        console.warn(`Photo not found (${response.status}), PDF will be generated without photo`);
        return '';
      }

      const blob = await response.blob();
      return new Promise<string>((resolve, reject): void => {
        const reader = new FileReader();
        reader.onloadend = (): void => {
          resolve(reader.result as string);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      // Photo loading is optional, log warning for debugging
      // eslint-disable-next-line no-console
      console.warn('Could not load photo, PDF will be generated without photo:', error);
      return '';
    }
  }

  /**
   * Get section titles based on language
   */
  private getSectionTitles(language: CvLanguage): {
    about: string;
    experience: string;
    education: string;
  } {
    return language === 'fr'
      ? {
          about: 'À PROPOS DE MOI',
          experience: 'EXPÉRIENCE PROFESSIONNELLE',
          education: 'FORMATION',
        }
      : {
          about: 'ABOUT ME',
          experience: 'PROFESSIONAL EXPERIENCE',
          education: 'EDUCATION',
        };
  }

  /**
   * Create pdfMake document definition
   */
  private createDocumentDefinition(
    cvData: CvPrintableData,
    language: CvLanguage,
    backgroundSvg: string,
    photoBase64: string,
  ): TDocumentDefinitions {
    const titles = this.getSectionTitles(language);

    const content: Content[] = [
      // Header with photo and personal info
      {
        columns: [
          // Photo
          photoBase64
            ? {
                image: photoBase64,
                width: 100,
                height: 100,
                margin: [0, 0, 0, 0] as [number, number, number, number],
              }
            : { text: '', width: 140 },
          // Personal info
          {
            margin: [40, 0, 0, 0] as [number, number, number, number], // Left margin for spacing from photo
            stack: [
              {
                text: cvData.personal.name,
                style: 'name',
                margin: [0, 0, 0, 5] as [number, number, number, number],
              },
              {
                text: cvData.personal.title,
                style: 'title',
                margin: [0, 0, 0, 10] as [number, number, number, number],
              },
              {
                text: cvData.personal.birthDate,
                style: 'contact',
              },
              {
                text: cvData.personal.address,
                style: 'contact',
              },
              {
                text: cvData.personal.phone,
                style: 'contact',
              },
              {
                text: cvData.personal.email,
                style: 'contact',
                color: '#3b82f6',
              },
              {
                text: cvData.personal.driverLicense,
                style: 'contact',
              },
            ],
          },
        ],
        margin: [0, 0, 0, 20] as [number, number, number, number],
      },

      // About section
      {
        text: titles.about,
        style: 'sectionTitle',
        margin: [0, 10, 0, 10] as [number, number, number, number],
      },
      ...cvData.about.map(
        (paragraph) =>
          ({
            text: paragraph,
            style: 'paragraph',
            margin: [0, 0, 0, 5] as [number, number, number, number],
          }) as Content,
      ),

      // Experience section
      {
        text: titles.experience,
        style: 'sectionTitle',
        margin: [0, 15, 0, 10] as [number, number, number, number],
      },
      ...cvData.experience.flatMap((exp) => [
        {
          columns: [
            { text: exp.period, style: 'period', width: '30%' },
            { text: exp.company, style: 'company', width: '70%' },
          ],
          margin: [0, 5, 0, 3] as [number, number, number, number],
        } as Content,
        {
          text: exp.title,
          style: 'jobTitle',
          margin: [0, 0, 0, 3] as [number, number, number, number],
        } as Content,
        {
          text: exp.description,
          style: 'description',
          margin: [0, 0, 0, 5] as [number, number, number, number],
        } as Content,
        (exp.skills && exp.skills.length > 0
          ? {
              text: exp.skills.join(' • '),
              style: 'skills',
              margin: [0, 0, 0, 10] as [number, number, number, number],
            }
          : { text: '', margin: [0, 0, 0, 10] as [number, number, number, number] }) as Content,
      ]),

      // Education section
      {
        text: titles.education,
        style: 'sectionTitle',
        margin: [0, 15, 0, 10] as [number, number, number, number],
        pageBreak: 'before',
      },
      ...cvData.education.flatMap((edu) => [
        {
          columns: [
            { text: edu.year, style: 'year', width: '20%' },
            {
              stack: [
                { text: edu.title, style: 'eduTitle' },
                {
                  text: edu.institution,
                  style: 'institution',
                  margin: [0, 2, 0, 0] as [number, number, number, number],
                },
                edu.description
                  ? {
                      text: edu.description,
                      style: 'description',
                      margin: [0, 3, 0, 0] as [number, number, number, number],
                    }
                  : { text: '' },
              ],
              width: '80%',
            },
          ],
          margin: [0, 5, 0, 10] as [number, number, number, number],
        } as Content,
      ]),
    ];

    // Extract SVG from data URL for background
    const extractedSvg = this.extractSvgFromDataUrl(backgroundSvg);

    return {
      content,
      styles: {
        name: {
          fontSize: 24,
          bold: true,
          color: '#1f2937',
        },
        title: {
          fontSize: 16,
          color: '#4b5563',
        },
        contact: {
          fontSize: 10,
          color: '#6b7280',
          margin: [0, 2, 0, 0],
        },
        sectionTitle: {
          fontSize: 14,
          bold: true,
          color: '#1f2937',
          background: '#f3f4f6',
        },
        paragraph: {
          fontSize: 10,
          color: '#374151',
          alignment: 'justify',
        },
        period: {
          fontSize: 9,
          color: '#6b7280',
          bold: true,
        },
        company: {
          fontSize: 11,
          color: '#1f2937',
          bold: true,
        },
        jobTitle: {
          fontSize: 12,
          color: '#3b82f6',
          bold: true,
        },
        description: {
          fontSize: 10,
          color: '#374151',
          alignment: 'justify',
        },
        skills: {
          fontSize: 8,
          color: '#6b7280',
          italics: true,
        },
        year: {
          fontSize: 10,
          color: '#6b7280',
          bold: true,
        },
        eduTitle: {
          fontSize: 11,
          color: '#1f2937',
          bold: true,
        },
        institution: {
          fontSize: 10,
          color: '#4b5563',
        },
      },
      pageSize: 'A4',
      pageMargins: [40, 40, 40, 40],
      background: backgroundSvg
        ? {
            svg: extractedSvg,
            absolutePosition: { x: 0, y: 0 },
            width: 595.28, // A4 width in points
            height: 841.89, // A4 height in points
          }
        : undefined,
    };
  }

  /**
   * Extract SVG content from data URL
   */
  private extractSvgFromDataUrl(dataUrl: string): string {
    const match = dataUrl.match(/data:image\/svg\+xml,(.+)/);
    if (match) {
      return decodeURIComponent(match[1]);
    }
    return '';
  }

  /**
   * Export CV with language-specific settings
   * @deprecated Use exportToPdf with cvData instead
   */
  async exportCv(_language: CvLanguage): Promise<void> {
    throw new Error('exportCv is deprecated. Use exportToPdf with cvData instead.');
  }
}
