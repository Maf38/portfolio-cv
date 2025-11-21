import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CvData, CvLanguage } from '../../models/cv-data.types';

@Component({
  selector: 'app-cv-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cv-display.component.html',
  styleUrl: './cv-display.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CvDisplayComponent {
  @Input({ required: true }) cvData!: CvData;
  @Input() language: CvLanguage = 'fr';

  /**
   * Group skills by category for display
   */
  getSkillCategories(): Array<keyof typeof this.cvData.skills> {
    return Object.keys(this.cvData.skills) as Array<keyof typeof this.cvData.skills>;
  }

  /**
   * Get skills for a specific category
   */
  getSkillsForCategory(category: string): Array<{
    name: string;
    level: string;
    years: number;
  }> {
    const skillCategory = this.cvData.skills as unknown as Record<string, unknown[]>;
    return skillCategory[category] as Array<{
      name: string;
      level: string;
      years: number;
    }>;
  }

  /**
   * Format skill category name for display
   */
  formatCategoryName(category: string): string {
    const categoryNames: Record<string, { fr: string; en: string }> = {
      backend: { fr: 'Backend', en: 'Backend' },
      frontend: { fr: 'Frontend', en: 'Frontend' },
      devops: { fr: 'DevOps', en: 'DevOps' },
      cloud: { fr: 'Cloud', en: 'Cloud' },
      testing: { fr: 'Tests', en: 'Testing' },
      tools: { fr: 'Outils', en: 'Tools' },
      methodologies: { fr: 'Méthodologies', en: 'Methodologies' },
    };

    return categoryNames[category]?.[this.language] || category;
  }

  /**
   * Get label translations
   */
  getLabel(key: string): string {
    const labels: Record<string, { fr: string; en: string }> = {
      profile: { fr: 'Profil', en: 'Profile' },
      experience: { fr: 'Expérience', en: 'Experience' },
      education: { fr: 'Formation', en: 'Education' },
      skills: { fr: 'Compétences', en: 'Skills' },
      projects: { fr: 'Projets', en: 'Projects' },
      contact: { fr: 'Contact', en: 'Contact' },
      present: { fr: 'Présent', en: 'Present' },
      languages: { fr: 'Langues', en: 'Languages' },
      softSkills: { fr: 'Soft Skills', en: 'Soft Skills' },
    };

    return labels[key]?.[this.language] || key;
  }

  /**
   * Format date range for display
   */
  formatDateRange(startDate: string, endDate: string | null): string {
    const start = this.formatDate(startDate);
    const end = endDate ? this.formatDate(endDate) : this.getLabel('present');
    return `${start} — ${end}`;
  }

  /**
   * Format date (YYYY-MM) to locale string
   */
  private formatDate(dateStr: string): string {
    const [year, month] = dateStr.split('-');
    const monthNames = {
      fr: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'],
      en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    };

    const monthIndex = parseInt(month, 10) - 1;
    return `${monthNames[this.language][monthIndex]} ${year}`;
  }
}
