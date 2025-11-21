import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { CvComponent } from './cv.component';

describe('CvComponent', () => {
  let component: CvComponent;
  let fixture: ComponentFixture<CvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CvComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
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
});
