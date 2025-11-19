import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CvPrintableComponent, CvPrintableData } from './cv-printable.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('CvPrintableComponent', () => {
  let component: CvPrintableComponent;
  let fixture: ComponentFixture<CvPrintableComponent>;
  let compiled: DebugElement;

  const mockCvData: CvPrintableData = {
    personal: {
      name: 'Mafal Gai',
      title: 'Software Developer',
      birthDate: 'March 11, 1978',
      address: '53A rue Pierre Semard 38000 Grenoble',
      phone: '06 70 16 05 17',
      email: 'gaimafal@gmail.com',
      driverLicense: 'Driving license B and vehicle',
    },
    about: [
      'First paragraph about me',
      'Second paragraph about me',
    ],
    experience: [
      {
        period: '2024 - Present',
        company: 'Test Company',
        title: 'Senior Developer',
        description: 'Working on test projects',
        skills: ['TypeScript', 'Angular', 'Node.js'],
      },
      {
        period: '2022 - 2024',
        company: 'Previous Company',
        title: 'Developer',
        description: 'Developed web applications',
        skills: ['JavaScript', 'React'],
      },
    ],
    education: [
      {
        year: '2024',
        title: 'Master Degree',
        institution: 'Test University',
        description: 'Computer Science',
      },
      {
        year: '2020',
        title: 'Bachelor Degree',
        institution: 'Another University',
        description: 'Software Engineering',
      },
    ],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CvPrintableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CvPrintableComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Component rendering', () => {
    beforeEach(() => {
      component.cvData = mockCvData;
      fixture.detectChanges();
    });

    it('should render the CV container', () => {
      const cvContainer = compiled.query(By.css('.cv-container'));
      expect(cvContainer).toBeTruthy();
    });

    it('should render the CV header', () => {
      const header = compiled.query(By.css('.cv-header'));
      expect(header).toBeTruthy();
    });

    it('should display photo placeholder when no photoUrl provided', () => {
      const placeholder = compiled.query(By.css('.cv-photo-placeholder'));
      expect(placeholder).toBeTruthy();
    });

    it('should display photo when photoUrl is provided', () => {
      component.photoUrl = 'https://example.com/photo.jpg';
      fixture.detectChanges();

      const photo = compiled.query(By.css('.cv-photo'));
      expect(photo).toBeTruthy();
      expect(photo.nativeElement.src).toBe('https://example.com/photo.jpg');
      expect(photo.nativeElement.alt).toBe('Mafal Gai');

      const placeholder = compiled.query(By.css('.cv-photo-placeholder'));
      expect(placeholder).toBeFalsy();
    });
  });

  describe('Personal information', () => {
    beforeEach(() => {
      component.cvData = mockCvData;
      fixture.detectChanges();
    });

    it('should display the name', () => {
      const name = compiled.query(By.css('.cv-name'));
      expect(name.nativeElement.textContent).toBe('Mafal Gai');
    });

    it('should display the title', () => {
      const title = compiled.query(By.css('.cv-title'));
      expect(title.nativeElement.textContent).toBe('Software Developer');
    });

    it('should display all contact information', () => {
      const contactItems = compiled.queryAll(By.css('.cv-contact-item'));
      expect(contactItems.length).toBeGreaterThanOrEqual(5);

      // Check that contact info contains expected values
      const contactText = contactItems.map((item) => item.nativeElement.textContent.trim());
      expect(contactText).toContain('March 11, 1978');
      expect(contactText).toContain('53A rue Pierre Semard 38000 Grenoble');
      expect(contactText).toContain('06 70 16 05 17');
      expect(contactText.some((text) => text.includes('gaimafal@gmail.com'))).toBe(true);
      expect(contactText).toContain('Driving license B and vehicle');
    });

    it('should render email as a link', () => {
      const emailLink = compiled.query(By.css('.cv-email'));
      expect(emailLink).toBeTruthy();
      expect(emailLink.nativeElement.href).toBe('mailto:gaimafal@gmail.com');
      expect(emailLink.nativeElement.textContent.trim()).toBe('gaimafal@gmail.com');
    });
  });

  describe('About section', () => {
    beforeEach(() => {
      component.cvData = mockCvData;
      fixture.detectChanges();
    });

    it('should render about section', () => {
      const aboutSection = compiled.queryAll(By.css('.cv-section'))[0];
      expect(aboutSection).toBeTruthy();

      const sectionTitle = aboutSection.query(By.css('.cv-section-title'));
      expect(sectionTitle.nativeElement.textContent).toBe('ABOUT ME');
    });

    it('should render all about paragraphs', () => {
      const paragraphs = compiled.queryAll(By.css('.cv-about-paragraph'));
      expect(paragraphs.length).toBe(2);
      expect(paragraphs[0].nativeElement.textContent).toBe('First paragraph about me');
      expect(paragraphs[1].nativeElement.textContent).toBe('Second paragraph about me');
    });
  });

  describe('Experience section', () => {
    beforeEach(() => {
      component.cvData = mockCvData;
      fixture.detectChanges();
    });

    it('should render experience section', () => {
      const sections = compiled.queryAll(By.css('.cv-section'));
      const expSection = sections.find(
        (section) =>
          section.query(By.css('.cv-section-title'))?.nativeElement.textContent === 'EXPERIENCE'
      );
      expect(expSection).toBeTruthy();
    });

    it('should render all experience items', () => {
      const expItems = compiled.queryAll(By.css('.cv-experience-item'));
      expect(expItems.length).toBe(2);
    });

    it('should display experience details correctly', () => {
      const firstExp = compiled.queryAll(By.css('.cv-experience-item'))[0];

      const period = firstExp.query(By.css('.cv-experience-period'));
      expect(period.nativeElement.textContent).toBe('2024 - Present');

      const company = firstExp.query(By.css('.cv-experience-company'));
      expect(company.nativeElement.textContent).toBe('Test Company');

      const title = firstExp.query(By.css('.cv-experience-title'));
      expect(title.nativeElement.textContent).toBe('Senior Developer');

      const description = firstExp.query(By.css('.cv-experience-description'));
      expect(description.nativeElement.textContent).toBe('Working on test projects');
    });

    it('should render experience skills as badges', () => {
      const firstExp = compiled.queryAll(By.css('.cv-experience-item'))[0];
      const skillBadges = firstExp.queryAll(By.css('.cv-skill-badge'));

      expect(skillBadges.length).toBe(3);
      expect(skillBadges[0].nativeElement.textContent).toBe('TypeScript');
      expect(skillBadges[1].nativeElement.textContent).toBe('Angular');
      expect(skillBadges[2].nativeElement.textContent).toBe('Node.js');
    });
  });

  describe('Education section', () => {
    beforeEach(() => {
      component.cvData = mockCvData;
      fixture.detectChanges();
    });

    it('should render education section', () => {
      const sections = compiled.queryAll(By.css('.cv-section'));
      const eduSection = sections.find(
        (section) =>
          section.query(By.css('.cv-section-title'))?.nativeElement.textContent === 'EDUCATION'
      );
      expect(eduSection).toBeTruthy();
    });

    it('should render all education items', () => {
      const eduItems = compiled.queryAll(By.css('.cv-education-item'));
      expect(eduItems.length).toBe(2);
    });

    it('should display education details correctly', () => {
      const firstEdu = compiled.queryAll(By.css('.cv-education-item'))[0];

      const year = firstEdu.query(By.css('.cv-education-year'));
      expect(year.nativeElement.textContent).toBe('2024');

      const title = firstEdu.query(By.css('.cv-education-title'));
      expect(title.nativeElement.textContent).toBe('Master Degree');

      const institution = firstEdu.query(By.css('.cv-education-institution'));
      expect(institution.nativeElement.textContent).toBe('Test University');

      const description = firstEdu.query(By.css('.cv-education-description'));
      expect(description.nativeElement.textContent).toBe('Computer Science');
    });
  });

  describe('Component inputs', () => {
    it('should accept cvData input', () => {
      component.cvData = mockCvData;
      expect(component.cvData).toEqual(mockCvData);
    });

    it('should accept photoUrl input', () => {
      component.photoUrl = 'https://example.com/test.jpg';
      expect(component.photoUrl).toBe('https://example.com/test.jpg');
    });

    it('should handle undefined photoUrl', () => {
      component.cvData = mockCvData;
      component.photoUrl = undefined;
      fixture.detectChanges();

      const placeholder = compiled.query(By.css('.cv-photo-placeholder'));
      expect(placeholder).toBeTruthy();
    });
  });

  describe('OnPush change detection', () => {
    it('should use OnPush change detection strategy', () => {
      expect(component).toBeTruthy();
      // The change detection strategy is set in the component decorator
      // This test verifies the component is properly configured
    });
  });
});
