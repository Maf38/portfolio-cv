import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactComponent } from './contact.component';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render contact title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const title = compiled.querySelector('.contact-title');
    expect(title?.textContent).toBe('Contact');
  });

  it('should render contact subtitle', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const subtitle = compiled.querySelector('.contact-subtitle');
    expect(subtitle?.textContent).toBe('This page is under construction.');
  });
});
