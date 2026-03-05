import { TestBed } from '@angular/core/testing';
import { SettingsService } from './settings.service';
import { DOCUMENT } from '@angular/common';

describe('SettingsService', () => {

  let service: SettingsService;
  let mockDocument: any;
  let mockLinkElement: any;

  beforeEach(() => {

    mockLinkElement = {
      href: ''
    };

    mockDocument = {
      getElementById: jest.fn(() => mockLinkElement)
    };

    localStorage.clear();

    TestBed.configureTestingModule({
      providers: [
        SettingsService,
        { provide: DOCUMENT, useValue: mockDocument }
      ]
    });

  });

  function createService() {
    service = TestBed.inject(SettingsService);
    return service;
  }

  it('should be created', () => {

    createService();

    expect(service).toBeTruthy();

  });

  it('should save settings in localStorage', () => {

    createService();

    const spy = jest.spyOn(Storage.prototype, 'setItem');

    service.saveSettings();

    expect(spy).toHaveBeenCalledWith(
      'settings',
      JSON.stringify(service.settings)
    );

  });

  it('should apply theme and update DOM correctly', () => {

    createService();

    service.applyTheme('dark');

    expect(mockDocument.getElementById)
      .toHaveBeenCalledWith('theme');

    expect(mockLinkElement.href)
      .toBe('assets/css/colors/dark.css');

    expect(service.settings.theme)
      .toBe('dark');

    expect(service.settings.themeUrl)
      .toBe('assets/css/colors/dark.css');

  });

  it('should use default settings when localStorage is empty', () => {

    jest.spyOn(Storage.prototype, 'getItem')
      .mockReturnValue(null);

    createService();

    expect(service.settings.theme)
      .toBe('default');

    expect(service.settings.themeUrl)
      .toBe('assets/css/colors/default.css');

  });

  it('should load settings from localStorage and apply theme', () => {

    const storedSettings = {
      theme: 'dark',
      themeUrl: 'assets/css/colors/dark.css'
    };

    jest.spyOn(Storage.prototype, 'getItem')
      .mockReturnValue(JSON.stringify(storedSettings));

    createService();

    expect(service.settings.theme)
      .toBe('dark');

    expect(mockLinkElement.href)
      .toBe('assets/css/colors/dark.css');

  });

  it('should not crash if stored JSON is invalid', () => {

    jest.spyOn(Storage.prototype, 'getItem')
      .mockReturnValue('invalid-json');

    expect(() => createService()).not.toThrow();

  });

  it('should not crash if theme link element does not exist', () => {

    mockDocument.getElementById = jest.fn(() => null);

    createService();

    expect(() => {
      service.applyTheme('dark');
    }).not.toThrow();

  });

});