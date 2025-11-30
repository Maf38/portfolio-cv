import { Component, inject, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactModalService } from '../../services/contact-modal.service';

@Component({
  selector: 'app-contact-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-modal.component.html',
  styleUrl: './contact-modal.component.scss',
})
export class ContactModalComponent {
  protected readonly modalService = inject(ContactModalService);

  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    if (this.modalService.isOpen()) {
      this.modalService.close();
    }
  }

  closeModal(): void {
    this.modalService.close();
  }

  copyEmail(): void {
    this.modalService.copyToClipboard('Mafal Gai <gaimafal@gmail.com>', 'email');
  }
}
