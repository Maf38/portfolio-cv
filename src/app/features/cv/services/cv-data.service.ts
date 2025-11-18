import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { CvData, CvLanguage } from '../models/cv-data.types';

@Injectable({
  providedIn: 'root',
})
export class CvDataService {
  private readonly CV_DATA_PATH = 'assets/data/cv-data.json';
  private cvData$: Observable<CvData> | null = null;

  constructor(private http: HttpClient) {}

  /**
   * Load CV data from JSON file
   * Uses shareReplay to cache the HTTP request
   */
  getCvData(): Observable<CvData> {
    if (!this.cvData$) {
      this.cvData$ = this.http.get<CvData>(this.CV_DATA_PATH).pipe(
        shareReplay(1) // Cache the result
      );
    }
    return this.cvData$;
  }

  /**
   * Get translated CV data based on language
   * For MVP, we return the same data (French by default)
   * TODO: Implement proper i18n when we have translations
   */
  getCvDataByLanguage(language: CvLanguage): Observable<CvData> {
    return this.getCvData().pipe(
      map((data) => {
        // For MVP, return data as-is
        // Future: Apply translations based on language
        return data;
      })
    );
  }

  /**
   * Format date for display
   */
  formatDate(date: string | null, language: CvLanguage = 'fr'): string {
    if (!date) {
      return language === 'fr' ? 'Présent' : 'Present';
    }

    const [year, month] = date.split('-');
    const monthNames = {
      fr: [
        'Jan',
        'Fév',
        'Mar',
        'Avr',
        'Mai',
        'Jun',
        'Jul',
        'Aoû',
        'Sep',
        'Oct',
        'Nov',
        'Déc',
      ],
      en: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
    };

    const monthIndex = parseInt(month, 10) - 1;
    return `${monthNames[language][monthIndex]} ${year}`;
  }

  /**
   * Format period for display
   */
  formatPeriod(
    startDate: string,
    endDate: string | null,
    language: CvLanguage = 'fr'
  ): string {
    const start = this.formatDate(startDate, language);
    const end = this.formatDate(endDate, language);
    return `${start} — ${end}`;
  }
}
