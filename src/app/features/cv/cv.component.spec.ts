import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { CvComponent } from './cv.component';
import { PdfExportService } from './services/pdf-export.service';
import { CvDataService } from './services/cv-data.service';
import { of } from 'rxjs';
import { CvData } from './models/cv-data.types';

describe('CvComponent', () => {
  let component: CvComponent;
  let fixture: ComponentFixture<CvComponent>;
  let pdfExportService: jasmine.SpyObj<PdfExportService>;
  let cvDataService: jasmine.SpyObj<CvDataService>;

  const mockCvData: CvData = {
    profile: {
      firstName: 'Test',
      lastName: 'User',
      fullName: 'Test User',
      title: 'Developer',
      subtitle: '',
      birthDate: '',
      email: 'test@test.com',
      phone: '+33 6 12 34 56 78',
      location: {
        city: 'Paris',
        postalCode: '75000',
        country: 'France',
        address: '',
      },
      summary: '',
      tagline: '',
      availability: '',
      social: { github: '', linkedin: '', email: '' },
      languages: [],
      driving: { license: '', vehicle: false },
    },
    experience: [],
    education: [],
    skills: {
      backend: [],
      frontend: [],
      devops: [],
      cloud: [],
      testing: [],
      tools: [],
      methodologies: [],
    },
    projects: [],
    certifications: [],
    hobbies: [],
    softSkills: [],
    meta: {
      version: '1.0.0',
      lastUpdated: '',
      source: '',
      totalExperience: { industry: 0, development: 0, total: 0 },
    },
  };

  beforeEach(async () => {
    pdfExportService = jasmine.createSpyObj('PdfExportService', ['exportCv']);
    cvDataService = jasmine.createSpyObj('CvDataService', ['getCvData']);
    cvDataService.getCvData.and.returnValue(of(mockCvData));

    await TestBed.configureTestingModule({
      imports: [CvComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: PdfExportService, useValue: pdfExportService },
        { provide: CvDataService, useValue: cvDataService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render cv page title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const title = compiled.querySelector('.cv-page-title');
    expect(title?.textContent).toBe('Curriculum Vitae');
  });

  it('should render download buttons', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const downloadButtons = compiled.querySelectorAll('.btn-download');
    expect(downloadButtons.length).toBe(2);
    expect(downloadButtons[0].textContent).toContain('Télécharger CV');
    expect(downloadButtons[1].textContent).toContain('Download CV');
  });

  it('should call downloadCv with "fr" when French button is clicked', () => {
    spyOn(component, 'downloadCv');
    const compiled = fixture.nativeElement as HTMLElement;
    const frButton = compiled.querySelector('.btn-download-fr') as HTMLButtonElement;

    frButton.click();

    expect(component.downloadCv).toHaveBeenCalledWith('fr');
  });

  it('should call downloadCv with "en" when English button is clicked', () => {
    spyOn(component, 'downloadCv');
    const compiled = fixture.nativeElement as HTMLElement;
    const enButton = compiled.querySelector('.btn-download-en') as HTMLButtonElement;

    enButton.click();

    expect(component.downloadCv).toHaveBeenCalledWith('en');
  });

  describe('ngOnInit', () => {
    it('should load CV data on init', () => {
      expect(cvDataService.getCvData).toHaveBeenCalled();
      expect(component.cvData$).toBeDefined();
    });
  });

  describe('downloadCv', () => {
    it('should set current language to French when downloading FR CV', fakeAsync(() => {
      pdfExportService.exportCv.and.returnValue(Promise.resolve());

      component.downloadCv('fr');
      tick(150);

      expect(component.currentLanguage).toBe('fr');
      expect(pdfExportService.exportCv).toHaveBeenCalledWith('fr');
    }));

    it('should set current language to English when downloading EN CV', fakeAsync(() => {
      pdfExportService.exportCv.and.returnValue(Promise.resolve());

      component.downloadCv('en');
      tick(150);

      expect(component.currentLanguage).toBe('en');
      expect(pdfExportService.exportCv).toHaveBeenCalledWith('en');
    }));

    it('should handle download error gracefully', async () => {
      pdfExportService.exportCv.and.returnValue(Promise.reject(new Error('Download failed')));
      spyOn(console, 'error');
      spyOn(window, 'alert');

      await component.downloadCv('fr');

      expect(console.error).toHaveBeenCalledWith('Error downloading CV:', jasmine.any(Error));
      expect(window.alert).toHaveBeenCalledWith('Error downloading CV. Please try again.');
    });

    it('should wait 100ms before calling exportCv', fakeAsync(() => {
      pdfExportService.exportCv.and.returnValue(Promise.resolve());

      component.downloadCv('en');

      // Before timeout, exportCv should not be called
      tick(50);
      expect(pdfExportService.exportCv).not.toHaveBeenCalled();

      // After timeout, exportCv should be called
      tick(60);
      expect(pdfExportService.exportCv).toHaveBeenCalled();
    }));
  });

  describe('currentLanguage', () => {
    it('should default to French', () => {
      expect(component.currentLanguage).toBe('fr');
    });
  });
});
