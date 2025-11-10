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
    expect(compiled.querySelector('#projects')).toBeTruthy();
    expect(compiled.querySelector('#cv')).toBeTruthy();
    expect(compiled.querySelector('#contact')).toBeTruthy();
  });

  it('should have spotlight overlay div', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const spotlightDiv = compiled.querySelector('.pointer-events-none.fixed.inset-0');
    expect(spotlightDiv).toBeTruthy();
  });
});
