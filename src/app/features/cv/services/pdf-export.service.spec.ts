import { TestBed } from '@angular/core/testing';
import { PdfExportService } from './pdf-export.service';
import { CvPrintableData } from '../components/cv-printable/cv-printable.component';
import pdfMake from 'pdfmake/build/pdfmake';

describe('PdfExportService', () => {
  let service: PdfExportService;

  const mockCvData: CvPrintableData = {
    personal: {
      name: 'Mafal Gai',
      title: 'Software Developer',
      birthDate: '01/01/1990',
      address: 'Paris, France',
      phone: '+33 6 12 34 56 78',
      email: 'test@example.com',
      driverLicense: 'Permis B',
    },
    about: ['Experienced software developer with a focus on web technologies.'],
    experience: [
      {
        period: '2020 - Present',
        company: 'Tech Corp',
        title: 'Senior Developer',
        description: 'Building web applications',
        skills: ['Angular', 'TypeScript', 'Node.js'],
      },
    ],
    education: [
      {
        year: '2018',
        title: 'Master in Computer Science',
        institution: 'University of Paris',
        description: 'Specialized in software engineering',
      },
    ],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PdfExportService],
    });

    service = TestBed.inject(PdfExportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('exportToPdf', () => {
    it('should call pdfMake.createPdf with correct filename for French', async () => {
      const mockDownload = jasmine.createSpy('download');
      spyOn(pdfMake, 'createPdf').and.returnValue({ download: mockDownload } as never);

      // Mock fetch for photo
      spyOn(window, 'fetch').and.returnValue(
        Promise.resolve({
          ok: true,
          blob: () => Promise.resolve(new Blob(['test'], { type: 'image/png' })),
        } as Response)
      );

      // Mock FileReader
      const mockFileReader = {
        readAsDataURL: jasmine.createSpy('readAsDataURL'),
        onloadend: null as (() => void) | null,
        result: 'data:image/png;base64,test',
      };
      spyOn(window, 'FileReader').and.returnValue(mockFileReader as never);

      const exportPromise = service.exportToPdf(mockCvData, { language: 'fr' });

      // Trigger FileReader callback
      setTimeout(() => {
        if (mockFileReader.onloadend) {
          mockFileReader.onloadend();
        }
      }, 0);

      await exportPromise;

      expect(pdfMake.createPdf).toHaveBeenCalled();
      const filenameArg = mockDownload.calls.mostRecent().args[0];
      expect(filenameArg).toContain('CV_Mafal_Gai_FR_');
      expect(filenameArg).toContain('.pdf');
    });

    it('should use custom filename when provided', async () => {
      const mockDownload = jasmine.createSpy('download');
      spyOn(pdfMake, 'createPdf').and.returnValue({ download: mockDownload } as never);

      spyOn(window, 'fetch').and.returnValue(
        Promise.resolve({
          ok: false,
          status: 404,
        } as Response)
      );

      await service.exportToPdf(mockCvData, {
        language: 'en',
        filename: 'custom-cv.pdf',
      });

      expect(mockDownload).toHaveBeenCalledWith('custom-cv.pdf');
    });

    it('should handle photo loading error gracefully', async () => {
      const mockDownload = jasmine.createSpy('download');
      spyOn(pdfMake, 'createPdf').and.returnValue({ download: mockDownload } as never);

      spyOn(window, 'fetch').and.returnValue(Promise.reject(new Error('Network error')));
      spyOn(console, 'warn');

      await service.exportToPdf(mockCvData, { language: 'en' });

      expect(console.warn).toHaveBeenCalled();
      expect(pdfMake.createPdf).toHaveBeenCalled();
    });

    it('should handle PDF creation error', async () => {
      spyOn(pdfMake, 'createPdf').and.throwError('PDF creation failed');
      spyOn(console, 'error');
      spyOn(window, 'fetch').and.returnValue(
        Promise.resolve({
          ok: false,
          status: 404,
        } as Response)
      );

      await expectAsync(
        service.exportToPdf(mockCvData, { language: 'fr' })
      ).toBeRejectedWithError('Failed to export PDF');

      expect(console.error).toHaveBeenCalled();
    });
  });

  describe('exportCv (deprecated)', () => {
    it('should throw error indicating method is deprecated', async () => {
      await expectAsync(service.exportCv('fr')).toBeRejectedWithError(
        'exportCv is deprecated. Use exportToPdf with cvData instead.'
      );
    });
  });

  describe('getSectionTitles (private method via exportToPdf)', () => {
    it('should generate correct French section titles', async () => {
      const mockDownload = jasmine.createSpy('download');
      spyOn(pdfMake, 'createPdf').and.callFake((docDefinition: unknown) => {
        // Check that French titles are used
        const content = JSON.stringify(docDefinition);
        expect(content).toContain('À PROPOS DE MOI');
        expect(content).toContain('EXPÉRIENCE PROFESSIONNELLE');
        expect(content).toContain('FORMATION');
        return { download: mockDownload } as never;
      });

      spyOn(window, 'fetch').and.returnValue(
        Promise.resolve({
          ok: false,
          status: 404,
        } as Response)
      );

      await service.exportToPdf(mockCvData, { language: 'fr' });
    });

    it('should generate correct English section titles', async () => {
      const mockDownload = jasmine.createSpy('download');
      spyOn(pdfMake, 'createPdf').and.callFake((docDefinition: unknown) => {
        const content = JSON.stringify(docDefinition);
        expect(content).toContain('ABOUT ME');
        expect(content).toContain('PROFESSIONAL EXPERIENCE');
        expect(content).toContain('EDUCATION');
        return { download: mockDownload } as never;
      });

      spyOn(window, 'fetch').and.returnValue(
        Promise.resolve({
          ok: false,
          status: 404,
        } as Response)
      );

      await service.exportToPdf(mockCvData, { language: 'en' });
    });
  });

  describe('experience with no skills', () => {
    it('should handle experience entries without skills', async () => {
      const cvDataWithoutSkills: CvPrintableData = {
        ...mockCvData,
        experience: [
          {
            period: '2020 - Present',
            company: 'Tech Corp',
            title: 'Senior Developer',
            description: 'Building web applications',
            skills: [],
          },
        ],
      };

      const mockDownload = jasmine.createSpy('download');
      spyOn(pdfMake, 'createPdf').and.returnValue({ download: mockDownload } as never);

      spyOn(window, 'fetch').and.returnValue(
        Promise.resolve({
          ok: false,
          status: 404,
        } as Response)
      );

      await service.exportToPdf(cvDataWithoutSkills, { language: 'en' });

      expect(pdfMake.createPdf).toHaveBeenCalled();
    });
  });

  describe('education with and without description', () => {
    it('should handle education entries with empty description', async () => {
      const cvDataWithEmptyDesc: CvPrintableData = {
        ...mockCvData,
        education: [
          {
            year: '2018',
            title: 'Master in Computer Science',
            institution: 'University of Paris',
            description: '',
          },
        ],
      };

      const mockDownload = jasmine.createSpy('download');
      spyOn(pdfMake, 'createPdf').and.returnValue({ download: mockDownload } as never);

      spyOn(window, 'fetch').and.returnValue(
        Promise.resolve({
          ok: false,
          status: 404,
        } as Response)
      );

      await service.exportToPdf(cvDataWithEmptyDesc, { language: 'en' });

      expect(pdfMake.createPdf).toHaveBeenCalled();
    });

    it('should handle education entries with description', async () => {
      const cvDataWithDesc: CvPrintableData = {
        ...mockCvData,
        education: [
          {
            year: '2018',
            title: 'Master in Computer Science',
            institution: 'University of Paris',
            description: 'Specialized in software engineering',
          },
        ],
      };

      const mockDownload = jasmine.createSpy('download');
      spyOn(pdfMake, 'createPdf').and.returnValue({ download: mockDownload } as never);

      spyOn(window, 'fetch').and.returnValue(
        Promise.resolve({
          ok: false,
          status: 404,
        } as Response)
      );

      await service.exportToPdf(cvDataWithDesc, { language: 'en' });

      expect(pdfMake.createPdf).toHaveBeenCalled();
    });
  });
});
