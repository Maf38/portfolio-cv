import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ContactModalService {
  private readonly _isOpen = signal(false);
  private readonly _copiedItem = signal<'email' | 'phone' | null>(null);
  private copyTimeout?: ReturnType<typeof setTimeout>;

  readonly isOpen = this._isOpen.asReadonly();
  readonly copiedItem = this._copiedItem.asReadonly();

  toggle(): void {
    this._isOpen.update((v) => !v);
    if (!this._isOpen()) {
      this.resetCopied();
    }
  }

  open(): void {
    this._isOpen.set(true);
  }

  close(): void {
    this._isOpen.set(false);
    this.resetCopied();
  }

  async copyToClipboard(text: string, item: 'email' | 'phone'): Promise<void> {
    try {
      await navigator.clipboard.writeText(text);
      this._copiedItem.set(item);

      if (this.copyTimeout) {
        clearTimeout(this.copyTimeout);
      }
      this.copyTimeout = setTimeout(() => {
        this._copiedItem.set(null);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }

  private resetCopied(): void {
    this._copiedItem.set(null);
    if (this.copyTimeout) {
      clearTimeout(this.copyTimeout);
    }
  }
}
