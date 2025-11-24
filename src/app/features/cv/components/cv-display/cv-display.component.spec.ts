import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CvDisplayComponent } from './cv-display.component';
import { CvData } from '../../models/cv-data.types';

describe('CvDisplayComponent', () => {
  let component: CvDisplayComponent;
  let fixture: ComponentFixture<CvDisplayComponent>;

  const mockCvData: CvData = {
    profile: {
      firstName: 'John',
      lastName: 'Doe',
      fullName: 'John Doe',
      title: 'Software Developer',
      subtitle: '5 years of experience',
      birthDate: '1990-01-01',
      email: 'john.doe@example.com',
      phone: '+33 6 12 34 56 78',
      location: {
        city: 'Paris',
        postalCode: '75000',
        country: 'France',
        address: '1 rue de la Paix',
      },
      summary: 'Experienced developer with expertise in web technologies.',
      tagline: 'Full-Stack Developer',
      availability: 'Available',
      social: {
        github: 'https://github.com/johndoe',
        linkedin: 'https://linkedin.com/in/johndoe',
        email: 'john.doe@example.com',
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
    experience: [
      {
        id: 'exp-1',
        company: 'Tech Corp',
        companyUrl: 'https://techcorp.com',
        via: null,
        position: 'Senior Developer',
        location: 'Paris, France',
        startDate: '2020-01',
        endDate: null,
        current: true,
        duration: '4 years',
        type: 'CDI',
        description: 'Leading development of web applications.',
        achievements: ['Implemented CI/CD', 'Improved performance by 50%'],
        technologies: ['Angular', 'TypeScript', 'Node.js'],
      },
    ],
    education: [
      {
        id: 'edu-1',
        degree: 'Master in Computer Science',
        level: 'Bac+5',
        school: 'University of Paris',
        location: 'Paris, France',
        startDate: '2015-09',
        endDate: '2018-06',
        duration: '3 years',
        description: 'Specialized in software engineering.',
        courses: ['Advanced Algorithms', 'Web Development'],
        grade: 'Distinction',
      },
    ],
    skills: {
      backend: [
        {
          name: 'Node.js',
          level: 'Expert',
          years: 5,
          category: 'backend',
          rating: 5,
        },
      ],
      frontend: [
        {
          name: 'Angular',
          level: 'Expert',
          years: 5,
          category: 'frontend',
          rating: 5,
        },
      ],
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
      source: 'Test data',
      totalExperience: {
        industry: 0,
        development: 5,
        total: 5,
      },
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CvDisplayComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CvDisplayComponent);
    component = fixture.componentInstance;
    component.cvData = mockCvData;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display profile information', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.cv-name')?.textContent).toContain('John Doe');
    expect(compiled.querySelector('.cv-title')?.textContent).toContain('Software Developer');
  });

  it('should display experience items', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const experienceItems = compiled.querySelectorAll('.experience-item');
    expect(experienceItems.length).toBe(1);
    expect(compiled.querySelector('.experience-position')?.textContent).toContain(
      'Senior Developer',
    );
  });

  it('should display education items', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const educationItems = compiled.querySelectorAll('.education-item');
    expect(educationItems.length).toBe(1);
    expect(compiled.querySelector('.education-degree')?.textContent).toContain(
      'Master in Computer Science',
    );
  });

  it('should format date range correctly', () => {
    const result = component.formatDateRange('2020-01', null);
    expect(result).toContain('2020');
    expect(result).toContain('—');
  });

  it('should get skill categories', () => {
    const categories = component.getSkillCategories();
    expect(categories).toContain('backend');
    expect(categories).toContain('frontend');
  });

  it('should format category names based on language', () => {
    component.language = 'fr';
    expect(component.formatCategoryName('backend')).toBe('Backend');

    component.language = 'en';
    expect(component.formatCategoryName('tools')).toBe('Tools');
  });

  it('should get labels based on language', () => {
    component.language = 'fr';
    expect(component.getLabel('experience')).toBe('Expérience');
    expect(component.getLabel('education')).toBe('Formation');

    component.language = 'en';
    expect(component.getLabel('experience')).toBe('Experience');
    expect(component.getLabel('education')).toBe('Education');
  });

  it('should display contact information', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const contactItems = compiled.querySelectorAll('.contact-item');
    expect(contactItems.length).toBeGreaterThan(0);
  });

  it('should display technologies as tags', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const techTags = compiled.querySelectorAll('.tech-tag');
    expect(techTags.length).toBe(3);
  });

  it('should display achievements when available', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const achievements = compiled.querySelector('.achievements-list');
    expect(achievements).toBeTruthy();
    expect(achievements?.querySelectorAll('li').length).toBe(2);
  });

  it('should display languages', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const languageItems = compiled.querySelectorAll('.language-item');
    expect(languageItems.length).toBe(2);
  });

  it('should display meta information in footer', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const footer = compiled.querySelector('.cv-footer-text');
    expect(footer?.textContent).toContain('2025-01-01');
    expect(footer?.textContent).toContain('1.0.0');
  });
});
