import { Component, signal, HostListener, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { HeaderComponent } from './shared/components/header/header.component';
import cvData from '../assets/data/cv-data.json';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  // CV Data from JSON (single source of truth)
  protected readonly cvData = cvData;

  // Spotlight effect background (halo lumineux qui suit la souris)
  protected readonly spotlightBackground = signal('transparent');

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    // Ne pas activer le spotlight sur mobile pour économiser la batterie
    if (!this.isBrowser || window.innerWidth < 1024) {
      return;
    }

    // Utiliser requestAnimationFrame pour optimiser les performances
    requestAnimationFrame(() => {
      const x = event.clientX;
      const y = event.clientY;

      // Gradient radial de 600px qui suit la souris
      // Couleur: bleu rgba(29, 78, 216, 0.15) comme brittanychiang.com
      this.spotlightBackground.set(`radial-gradient(
        600px circle at ${x}px ${y}px,
        rgba(29, 78, 216, 0.15),
        transparent 80%
      )`);
    });
  }
}
