import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should initialize with transparent spotlight background', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app['spotlightBackground']()).toBe('transparent');
  });

  it('should not update spotlight on mobile (width < 1024px)', () => {
    // Mock window.innerWidth
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 768,
    });

    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;

    const event = new MouseEvent('mousemove', { clientX: 100, clientY: 100 });
    app.onMouseMove(event);

    // Should remain transparent on mobile
    expect(app['spotlightBackground']()).toBe('transparent');
  });

  it('should update spotlight background on desktop (width >= 1024px)', (done) => {
    // Mock window.innerWidth for desktop
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1280,
    });

    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;

    const event = new MouseEvent('mousemove', { clientX: 500, clientY: 300 });
    app.onMouseMove(event);

    // Wait for requestAnimationFrame to execute
    requestAnimationFrame(() => {
      const background = app['spotlightBackground']();
      expect(background).toContain('radial-gradient');
      expect(background).toContain('500px');
      expect(background).toContain('300px');
      done();
    });
  });

  it('should render header component', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-header')).toBeTruthy();
  });

  it('should render all main sections', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('#about')).toBeTruthy();
    expect(compiled.querySelector('#experience')).toBeTruthy();
    expect(compiled.querySelector('#education')).toBeTruthy();
    expect(compiled.querySelector('#setup')).toBeTruthy();
  });

  it('should have spotlight overlay div', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const spotlightDiv = compiled.querySelector('.pointer-events-none.fixed.inset-0');
    expect(spotlightDiv).toBeTruthy();
  });

  it('should display correct number of experiences', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const experiences = compiled.querySelectorAll('#experience .experience-item');
    expect(experiences.length).toBeGreaterThan(0); // Should have experiences
  });

  it('should display correct number of education entries', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const educationItems = compiled.querySelectorAll('#education .experience-item');
    expect(educationItems.length).toBeGreaterThan(0); // Should have education entries
  });

  it('should display .NET Developer position for current role', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const position = compiled.querySelector('.experience-position');
    expect(position?.textContent).toBe('.NET Developer');
  });

  it('should display technology pills in experience section', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const techPills = compiled.querySelectorAll('.tech-item');
    expect(techPills.length).toBeGreaterThan(0); // Should have technology pills
  });

  it('should display company logos', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const logos = compiled.querySelectorAll('.company-logo');
    expect(logos.length).toBeGreaterThan(0); // Should have company logos
  });

  it('should render "View Full Resume" link', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const resumeLink = compiled.querySelector('a[href="/assets/cv/resume.pdf"]');
    expect(resumeLink).toBeTruthy();
  });
});
