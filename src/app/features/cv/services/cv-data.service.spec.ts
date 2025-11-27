import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { CvDataService } from './cv-data.service';
import { CvData } from '../models/cv-data.types';

describe('CvDataService', () => {
  let service: CvDataService;
  let httpMock: HttpTestingController;

  const mockCvData: CvData = {
    profile: {
      firstName: 'Mafal',
      lastName: 'Gai',
      fullName: 'Mafal Gai',
      title: 'Software Developer',
      subtitle: '5 years of experience',
      birthDate: '1990-01-01',
      email: 'test@example.com',
      phone: '+33 6 12 34 56 78',
      location: {
        city: 'Paris',
        postalCode: '75000',
        country: 'France',
        address: '1 rue de la Paix',
      },
      summary: 'Test summary',
      tagline: 'Test tagline',
      availability: 'Available',
      social: {
        github: 'https://github.com/test',
        linkedin: 'https://linkedin.com/in/test',
        email: 'test@example.com',
      },
      languages: [
        { name: 'French', level: 'Native', code: 'fr-FR' },
        { name: 'English', level: 'Professional', code: 'en-US' },
      ],
      driving: {
        license: 'Permis B',
        vehicle: true,
      },
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
      lastUpdated: '2025-01-01',
      source: 'Test',
      totalExperience: {
        industry: 0,
        development: 5,
        total: 5,
      },
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CvDataService, provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(CvDataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getCvData', () => {
    it('should fetch CV data from the correct path', () => {
      service.getCvData().subscribe((data) => {
        expect(data).toEqual(mockCvData);
      });

      const req = httpMock.expectOne('assets/data/cv-data.json');
      expect(req.request.method).toBe('GET');
      req.flush(mockCvData);
    });

    it('should cache the HTTP request (shareReplay)', () => {
      // First call
      service.getCvData().subscribe();
      const req = httpMock.expectOne('assets/data/cv-data.json');
      req.flush(mockCvData);

      // Second call should not make another HTTP request
      service.getCvData().subscribe((data) => {
        expect(data).toEqual(mockCvData);
      });

      // Verify no additional requests were made
      httpMock.expectNone('assets/data/cv-data.json');
    });
  });

  describe('getCvDataByLanguage', () => {
    it('should return CV data for French language', () => {
      service.getCvDataByLanguage('fr').subscribe((data) => {
        expect(data).toEqual(mockCvData);
      });

      const req = httpMock.expectOne('assets/data/cv-data.json');
      req.flush(mockCvData);
    });

    it('should return CV data for English language', () => {
      service.getCvDataByLanguage('en').subscribe((data) => {
        expect(data).toEqual(mockCvData);
      });

      const req = httpMock.expectOne('assets/data/cv-data.json');
      req.flush(mockCvData);
    });
  });

  describe('formatDate', () => {
    it('should format date correctly in French', () => {
      expect(service.formatDate('2024-01', 'fr')).toBe('Jan 2024');
      expect(service.formatDate('2024-06', 'fr')).toBe('Jun 2024');
      expect(service.formatDate('2024-12', 'fr')).toBe('Déc 2024');
    });

    it('should format date correctly in English', () => {
      expect(service.formatDate('2024-01', 'en')).toBe('Jan 2024');
      expect(service.formatDate('2024-06', 'en')).toBe('Jun 2024');
      expect(service.formatDate('2024-12', 'en')).toBe('Dec 2024');
    });

    it('should return "Présent" for null date in French', () => {
      expect(service.formatDate(null, 'fr')).toBe('Présent');
    });

    it('should return "Present" for null date in English', () => {
      expect(service.formatDate(null, 'en')).toBe('Present');
    });

    it('should default to French when no language is specified', () => {
      expect(service.formatDate(null)).toBe('Présent');
      expect(service.formatDate('2024-03')).toBe('Mar 2024');
    });
  });

  describe('formatPeriod', () => {
    it('should format period with end date in French', () => {
      const result = service.formatPeriod('2020-01', '2024-06', 'fr');
      expect(result).toBe('Jan 2020 — Jun 2024');
    });

    it('should format period with end date in English', () => {
      const result = service.formatPeriod('2020-01', '2024-06', 'en');
      expect(result).toBe('Jan 2020 — Jun 2024');
    });

    it('should format period without end date (current) in French', () => {
      const result = service.formatPeriod('2020-01', null, 'fr');
      expect(result).toBe('Jan 2020 — Présent');
    });

    it('should format period without end date (current) in English', () => {
      const result = service.formatPeriod('2020-01', null, 'en');
      expect(result).toBe('Jan 2020 — Present');
    });

    it('should default to French when no language is specified', () => {
      const result = service.formatPeriod('2020-01', null);
      expect(result).toBe('Jan 2020 — Présent');
    });
  });
});
