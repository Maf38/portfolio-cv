import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { provideRouter } from '@angular/router';
import { routes } from '../../../app.routes';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [provideRouter(routes)],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with menu closed', () => {
    expect(component['isMenuOpen']()).toBe(false);
  });

  it('should toggle menu when toggleMenu is called', () => {
    expect(component['isMenuOpen']()).toBe(false);
    component.toggleMenu();
    expect(component['isMenuOpen']()).toBe(true);
    component.toggleMenu();
    expect(component['isMenuOpen']()).toBe(false);
  });

  it('should close menu when closeMenu is called', () => {
    component['isMenuOpen'].set(true);
    expect(component['isMenuOpen']()).toBe(true);
    component.closeMenu();
    expect(component['isMenuOpen']()).toBe(false);
  });

  it('should have correct navigation items', () => {
    expect(component['navItems'].length).toBe(5);
    expect(component['navItems'][0]).toEqual({ label: 'About', path: '/about' });
    expect(component['navItems'][1]).toEqual({
      label: 'Experience',
      path: '/experience',
    });
    expect(component['navItems'][2]).toEqual({
      label: 'Projects',
      path: '/projects',
    });
    expect(component['navItems'][3]).toEqual({ label: 'CV', path: '/cv' });
    expect(component['navItems'][4]).toEqual({
      label: 'Contact',
      path: '/contact',
    });
  });

  it('should render logo with correct text', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const logoText = compiled.querySelector('.logo-text');
    expect(logoText?.textContent).toBe('Mafal Gaimard');
  });

  it('should render mobile menu button', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const menuBtn = compiled.querySelector('.mobile-menu-btn');
    expect(menuBtn).toBeTruthy();
  });

  it('should render desktop navigation on large screens', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const desktopNav = compiled.querySelector('.desktop-nav');
    expect(desktopNav).toBeTruthy();
  });
});
