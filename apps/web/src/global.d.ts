/* eslint-disable no-var */

interface GtagEvent {
  (command: 'config', targetId: string, config?: Record<string, unknown>): void;
  (command: 'event', action: string, params?: Record<string, unknown>): void;
  (command: 'js', date: Date): void;
  (command: 'set', params: Record<string, unknown>): void;
}

declare global {
  interface Window {
    gtag: GtagEvent;
    dataLayer: Array<Record<string, unknown>>;
  }

  // Allow gtag to be used without window prefix
  var dataLayer: Array<Record<string, unknown>>;
}

export {};
