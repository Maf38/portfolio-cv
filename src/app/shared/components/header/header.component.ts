import { Component, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { CvLanguage } from '../../../features/cv/models/cv-data.types';
import { ContactModalService } from '../../services/contact-modal.service';
import { VERSION_INFO } from '../../../../environments/version';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Output() cvDownloadRequested = new EventEmitter<CvLanguage>();

  readonly version = VERSION_INFO.version;
  readonly buildDate = new Date(VERSION_INFO.buildDate);

  private readonly contactModalService = inject(ContactModalService);

  toggleContactCard(event: Event): void {
    event.preventDefault();
    this.contactModalService.toggle();
  }

  /**
   * Download CV in specified language
   */
  downloadCv(language: CvLanguage): void {
    this.cvDownloadRequested.emit(language);
  }
}
