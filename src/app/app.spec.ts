import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes)],
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
});
