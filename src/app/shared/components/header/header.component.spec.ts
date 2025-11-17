import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render name "Mafal Gai"', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const name = compiled.querySelector('.header-name a');
    expect(name?.textContent).toBe('Mafal Gai');
  });

  it('should render title "Senior Software Engineer"', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const title = compiled.querySelector('.header-title');
    expect(title?.textContent).toBe('Senior Software Engineer');
  });

  it('should render description', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const description = compiled.querySelector('.header-description');
    expect(description?.textContent).toContain('I build automated and robust digital experiences');
  });

  it('should render navigation links', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const navLinks = compiled.querySelectorAll('.nav-link');
    expect(navLinks.length).toBe(5);

    const navTexts = Array.from(navLinks).map(
      (link) => link.querySelector('.nav-text')?.textContent,
    );
    expect(navTexts).toEqual(['About', 'Experience', 'Projects', 'Education', 'Setup']);
  });

  it('should have correct href for navigation links', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const navLinks = compiled.querySelectorAll('.nav-link');

    expect(navLinks[0].getAttribute('href')).toBe('#about');
    expect(navLinks[1].getAttribute('href')).toBe('#experience');
    expect(navLinks[2].getAttribute('href')).toBe('#projects');
    expect(navLinks[3].getAttribute('href')).toBe('#education');
    expect(navLinks[4].getAttribute('href')).toBe('#setup');
  });

  it('should render all 5 social icons', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const socialIcons = compiled.querySelectorAll('.header-social li');
    expect(socialIcons.length).toBe(5);
  });

  it('should have GitHub link', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const githubLink = compiled.querySelector('a[href="https://github.com/Maf38"]');
    expect(githubLink).toBeTruthy();
    expect(githubLink?.getAttribute('aria-label')).toContain('GitHub');
  });

  it('should have LinkedIn link', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const linkedinLink = compiled.querySelector('a[href="https://www.linkedin.com/in/mafal-gai-7a456817a/"]');
    expect(linkedinLink).toBeTruthy();
    expect(linkedinLink?.getAttribute('aria-label')).toContain('LinkedIn');
  });

  it('should have email icon in social links', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const socialIcons = compiled.querySelectorAll('.header-social li');
    expect(socialIcons.length).toBe(5); // GitHub, LinkedIn, Email, JIRA, SonarQube
  });

  it('should have JIRA link', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const jiraLink = compiled.querySelector('a[href="https://maflabs.atlassian.net"]');
    expect(jiraLink).toBeTruthy();
    expect(jiraLink?.getAttribute('aria-label')).toContain('JIRA');
  });

  it('should have SonarQube link', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const sonarLink = compiled.querySelector('a[href="https://sonarqube.maflabs.fr"]');
    expect(sonarLink).toBeTruthy();
    expect(sonarLink?.getAttribute('aria-label')).toContain('SonarQube');
  });

  it('should have navigation indicators', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const indicators = compiled.querySelectorAll('.nav-indicator');
    expect(indicators.length).toBe(5);
  });

  it('should open external links in new tab', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const externalLinks = compiled.querySelectorAll('a[target="_blank"]');

    externalLinks.forEach((link) => {
      expect(link.getAttribute('rel')).toBe('noopener noreferrer');
    });
  });
});
