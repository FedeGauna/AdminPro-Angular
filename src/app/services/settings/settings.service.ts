import { Injectable, Inject, DOCUMENT } from '@angular/core';
import { AVAILABLE_THEMES, ThemeName } from './themes.config';

interface Settings {
  themeUrl: string;
  theme: ThemeName;
}

const DEFAULT_SETTINGS: Readonly<Settings> = Object.freeze({
  themeUrl: 'assets/css/colors/default.css',
  theme: 'default'
});

/**
 * Service for managing application settings.
 * Handles theme selection and persists settings to localStorage.
 */
@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  settings: Settings = { ...DEFAULT_SETTINGS };

  /**
   * Initializes the SettingsService.
   * @param _document The document object for DOM manipulation.
   */
  constructor(@Inject(DOCUMENT) private _document: Document) {
    this.loadSettings();
  }

  /**
   * Persists current settings to localStorage.
   */
  saveSettings(): void {
    localStorage.setItem('settings', JSON.stringify(this.settings));
  }

  /**
   * Loads settings from localStorage and applies the saved theme.
   */
  loadSettings(): void {
    const stored = localStorage.getItem('settings');

    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const validated = this.validateSettings(parsed);

        if (validated) {
          this.settings = validated;
          this.applyTheme(this.settings.theme);
        } else {
          this.settings = { ...DEFAULT_SETTINGS };
        }
      } catch {
        this.settings = { ...DEFAULT_SETTINGS };
      }
    }
  }

  /**
   * Applies the specified theme by updating the document's stylesheet link.
   * @param theme The name of the theme to apply.
   */
  applyTheme(theme: string): void {
    const sanitized = this.sanitizeTheme(theme);
    const url = `assets/css/colors/${sanitized}.css`;
    const themeLink = this._document.getElementById('theme') as HTMLLinkElement | null;

    if (themeLink) {
      themeLink.href = url;
    }

    this.settings.theme = sanitized;
    this.settings.themeUrl = url;
    this.saveSettings();
  }

  private sanitizeTheme(theme: string): ThemeName {
    const normalized = theme.toLowerCase().trim();

    if (AVAILABLE_THEMES.includes(normalized as ThemeName)) {
      return normalized as ThemeName;
    }

    return 'default';
  }

  private validateSettings(data: unknown): Settings | null {
    if (data === null || typeof data !== 'object') {
      return null;
    }

    const obj = data as Record<string, unknown>;

    if (!this.hasValidStructure(obj)) return null;
    if (!this.hasValidThemeUrl(obj)) return null;
    if (!this.hasValidTheme(obj)) return null;
    if (this.isPrototypePollutionAttempt(obj)) return null;

    return {
      themeUrl: obj.themeUrl as string,
      theme: obj.theme as ThemeName
    };
  }

  private hasValidStructure(data: Record<string, unknown>): boolean {
    return (
      typeof data.themeUrl === 'string' &&
      typeof data.theme === 'string'
    );
  }

  private hasValidThemeUrl(data: Record<string, unknown>): boolean {
    return (data.themeUrl as string).startsWith('assets/css/colors/');
  }

  private hasValidTheme(data: Record<string, unknown>): boolean {
    return AVAILABLE_THEMES.includes(data.theme as string as ThemeName);
  }

  private isPrototypePollutionAttempt(data: Record<string, unknown>): boolean {
    return (
      Object.prototype.hasOwnProperty.call(data, '__proto__') ||
      Object.prototype.hasOwnProperty.call(data, 'constructor') ||
      Object.prototype.hasOwnProperty.call(data, 'prototype')
    );
  }
}


