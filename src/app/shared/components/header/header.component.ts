import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  showContactCard = false;
  copiedItem: 'email' | 'phone' | null = null;
  private copyTimeout?: ReturnType<typeof setTimeout>;

  toggleContactCard(event: Event): void {
    event.preventDefault();
    this.showContactCard = !this.showContactCard;
  }

  closeContactCard(): void {
    this.showContactCard = false;
    this.copiedItem = null;
    if (this.copyTimeout) {
      clearTimeout(this.copyTimeout);
    }
  }

  async copyToClipboard(text: string, item: 'email' | 'phone'): Promise<void> {
    try {
      await navigator.clipboard.writeText(text);
      this.copiedItem = item;

      // Reset after 2 seconds
      if (this.copyTimeout) {
        clearTimeout(this.copyTimeout);
      }
      this.copyTimeout = setTimeout(() => {
        this.copiedItem = null;
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }
}
