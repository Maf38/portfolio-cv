import { Component, Input, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  hexagons,
  topography,
  circuitBoard,
  bankNote,
  fancyRectangles,
  squares,
} from 'hero-patterns';

interface PersonalInfo {
  name: string;
  title: string;
  birthDate: string;
  address: string;
  phone: string;
  email: string;
  driverLicense: string;
}

interface Experience {
  period: string;
  company: string;
  title: string;
  description: string;
  skills: string[];
}

interface Education {
  year: string;
  title: string;
  institution: string;
  description: string;
}

export interface CvPrintableData {
  personal: PersonalInfo;
  about: string[];
  experience: Experience[];
  education: Education[];
}

@Component({
  selector: 'app-cv-printable',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cv-printable.component.html',
  styleUrl: './cv-printable.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CvPrintableComponent {
  @Input({ required: true }) cvData!: CvPrintableData;
  @Input() photoUrl?: string;

  // Background pattern signal - generated with hero-patterns
  protected backgroundPattern = signal<string>(this.generateRandomPattern());

  // Default photo URL (relative path for GitHub Pages compatibility)
  protected readonly defaultPhotoUrl = 'assets/images/cv/photo-cv.png';

  /**
   * Generate a random professional background pattern using hero-patterns
   */
  private generateRandomPattern(): string {
    const patterns: Array<() => string> = [
      (): string => hexagons('#3b82f6', 0.05), // Blue hexagons - very subtle
      (): string => topography('#6b7280', 0.05), // Gray topography
      (): string => circuitBoard('#22c55e', 0.04), // Green circuit board
      (): string => bankNote('#a855f7', 0.05), // Purple bank note
      (): string => fancyRectangles('#14b8a6', 0.05), // Teal fancy rectangles
      (): string => squares('#3b82f6', 0.04), // Blue squares
    ];

    const randomPattern = patterns[Math.floor(Math.random() * patterns.length)];
    return randomPattern();
  }

  /**
   * Get the photo URL to display (provided or default)
   */
  get displayPhotoUrl(): string {
    return this.photoUrl || this.defaultPhotoUrl;
  }
}
