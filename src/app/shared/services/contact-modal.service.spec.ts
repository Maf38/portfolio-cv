import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ContactModalService } from './contact-modal.service';

describe('ContactModalService', () => {
  let service: ContactModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('isOpen', () => {
    it('should initially be false', () => {
      expect(service.isOpen()).toBe(false);
    });
  });

  describe('toggle', () => {
    it('should toggle isOpen from false to true', () => {
      expect(service.isOpen()).toBe(false);
      service.toggle();
      expect(service.isOpen()).toBe(true);
    });

    it('should toggle isOpen from true to false', () => {
      service.open();
      expect(service.isOpen()).toBe(true);
      service.toggle();
      expect(service.isOpen()).toBe(false);
    });

    it('should reset copiedItem when closing via toggle', fakeAsync(() => {
      const mockClipboard = {
        writeText: jasmine.createSpy('writeText').and.returnValue(Promise.resolve()),
      };
      Object.defineProperty(navigator, 'clipboard', {
        value: mockClipboard,
        writable: true,
        configurable: true,
      });

      service.open();
      service.copyToClipboard('test@example.com', 'email');
      tick();
      expect(service.copiedItem()).toBe('email');

      service.toggle(); // close
      expect(service.copiedItem()).toBeNull();
    }));
  });

  describe('open', () => {
    it('should set isOpen to true', () => {
      expect(service.isOpen()).toBe(false);
      service.open();
      expect(service.isOpen()).toBe(true);
    });
  });

  describe('close', () => {
    it('should set isOpen to false', () => {
      service.open();
      expect(service.isOpen()).toBe(true);
      service.close();
      expect(service.isOpen()).toBe(false);
    });

    it('should reset copiedItem when closing', fakeAsync(() => {
      const mockClipboard = {
        writeText: jasmine.createSpy('writeText').and.returnValue(Promise.resolve()),
      };
      Object.defineProperty(navigator, 'clipboard', {
        value: mockClipboard,
        writable: true,
        configurable: true,
      });

      service.copyToClipboard('test@example.com', 'email');
      tick();
      expect(service.copiedItem()).toBe('email');

      service.close();
      expect(service.copiedItem()).toBeNull();
    }));
  });

  describe('copyToClipboard', () => {
    it('should copy text to clipboard and set copiedItem', fakeAsync(() => {
      const mockClipboard = {
        writeText: jasmine.createSpy('writeText').and.returnValue(Promise.resolve()),
      };
      Object.defineProperty(navigator, 'clipboard', {
        value: mockClipboard,
        writable: true,
        configurable: true,
      });

      service.copyToClipboard('test@example.com', 'email');
      tick();

      expect(mockClipboard.writeText).toHaveBeenCalledWith('test@example.com');
      expect(service.copiedItem()).toBe('email');
    }));

    it('should copy phone number', fakeAsync(() => {
      const mockClipboard = {
        writeText: jasmine.createSpy('writeText').and.returnValue(Promise.resolve()),
      };
      Object.defineProperty(navigator, 'clipboard', {
        value: mockClipboard,
        writable: true,
        configurable: true,
      });

      service.copyToClipboard('+33612345678', 'phone');
      tick();

      expect(mockClipboard.writeText).toHaveBeenCalledWith('+33612345678');
      expect(service.copiedItem()).toBe('phone');
    }));

    it('should reset copiedItem after 2 seconds', fakeAsync(() => {
      const mockClipboard = {
        writeText: jasmine.createSpy('writeText').and.returnValue(Promise.resolve()),
      };
      Object.defineProperty(navigator, 'clipboard', {
        value: mockClipboard,
        writable: true,
        configurable: true,
      });

      service.copyToClipboard('test@example.com', 'email');
      tick();
      expect(service.copiedItem()).toBe('email');

      tick(2000);
      expect(service.copiedItem()).toBeNull();
    }));

    it('should clear previous timeout when copying again', fakeAsync(() => {
      const mockClipboard = {
        writeText: jasmine.createSpy('writeText').and.returnValue(Promise.resolve()),
      };
      Object.defineProperty(navigator, 'clipboard', {
        value: mockClipboard,
        writable: true,
        configurable: true,
      });

      service.copyToClipboard('test@example.com', 'email');
      tick();
      expect(service.copiedItem()).toBe('email');

      // Copy phone immediately after
      service.copyToClipboard('+33612345678', 'phone');
      tick();
      expect(service.copiedItem()).toBe('phone');

      // Wait 2 seconds - should reset to null
      tick(2000);
      expect(service.copiedItem()).toBeNull();
    }));

    it('should handle clipboard error gracefully', fakeAsync(() => {
      const mockClipboard = {
        writeText: jasmine
          .createSpy('writeText')
          .and.returnValue(Promise.reject(new Error('Clipboard error'))),
      };
      Object.defineProperty(navigator, 'clipboard', {
        value: mockClipboard,
        writable: true,
        configurable: true,
      });
      spyOn(console, 'error');

      service.copyToClipboard('test@example.com', 'email');
      tick();

      expect(console.error).toHaveBeenCalledWith('Failed to copy:', jasmine.any(Error));
      expect(service.copiedItem()).toBeNull();
    }));
  });
});
