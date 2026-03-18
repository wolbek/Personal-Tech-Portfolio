import { Injectable, signal, effect, computed, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type BaseTheme = 'dark' | 'light';
export type AnimeTheme = 'hxh' | 'mha' | 'naruto';
export type SeasonalTheme = 'winter' | 'mountains' | 'cherry-blossom' | 'autumn' | 'spring';
export type SpecialTheme = AnimeTheme | SeasonalTheme;

export interface ThemeOption {
  id: SpecialTheme;
  label: string;
  preview: string;
}

export const ANIME_THEMES: ThemeOption[] = [
  { id: 'hxh', label: 'Hunter x Hunter', preview: 'themes/hxh-hero.jpg' },
  { id: 'mha', label: 'My Hero Academia', preview: 'themes/mha-hero.jpg' },
  { id: 'naruto', label: 'Naruto', preview: 'themes/naruto-hero.jpg' },
];

export const SEASONAL_THEMES: ThemeOption[] = [
  // { id: 'mountains', label: 'Mountains', preview: 'themes/mountains-hero.jpg' },
  { id: 'spring', label: 'Spring', preview: 'themes/spring-hero.jpg' },
  { id: 'cherry-blossom', label: 'Cherry Blossom', preview: 'themes/cherry-blossom-hero.jpg' },
  { id: 'autumn', label: 'Autumn', preview: 'themes/autumn-hero.jpg' },
  { id: 'winter', label: 'winter', preview: 'themes/winter-hero.jpg' },
];

const STORAGE_BASE = 'portfolio-theme';
const STORAGE_SPECIAL = 'portfolio-special-theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly platformId = inject(PLATFORM_ID);

  readonly baseTheme = signal<BaseTheme>(this.getInitialBase());
  readonly specialTheme = signal<SpecialTheme | null>(this.getInitialSpecial());

  readonly compositeTheme = computed(() => {
    const base = this.baseTheme();
    const special = this.specialTheme();
    return special ? `${base} ${special}` : base;
  });

  readonly hasSpecialTheme = computed(() => this.specialTheme() !== null);

  constructor() {
    effect(() => {
      const composite = this.compositeTheme();
      if (isPlatformBrowser(this.platformId)) {
        document.documentElement.setAttribute('data-theme', composite);
        localStorage.setItem(STORAGE_BASE, this.baseTheme());
        const sp = this.specialTheme();
        if (sp) {
          localStorage.setItem(STORAGE_SPECIAL, sp);
        } else {
          localStorage.removeItem(STORAGE_SPECIAL);
        }
      }
    });
  }

  toggleBaseTheme(): void {
    this.baseTheme.update((t) => (t === 'dark' ? 'light' : 'dark'));
  }

  setSpecialTheme(theme: SpecialTheme): void {
    if (this.specialTheme() === theme) {
      this.specialTheme.set(null);
    } else {
      this.specialTheme.set(theme);
    }
  }

  clearSpecialTheme(): void {
    this.specialTheme.set(null);
  }

  private getInitialBase(): BaseTheme {
    if (isPlatformBrowser(this.platformId)) {
      const stored = localStorage.getItem(STORAGE_BASE) as BaseTheme | null;
      if (stored === 'dark' || stored === 'light') return stored;
      if (window.matchMedia?.('(prefers-color-scheme: light)').matches) return 'light';
    }
    return 'dark';
  }

  private getInitialSpecial(): SpecialTheme | null {
    if (isPlatformBrowser(this.platformId)) {
      const stored = localStorage.getItem(STORAGE_SPECIAL) as SpecialTheme | null;
      const valid: SpecialTheme[] = [
        'hxh',
        'mha',
        'naruto',
        'winter',
        'mountains',
        'cherry-blossom',
        'autumn',
        'spring',
      ];
      if (stored && valid.includes(stored)) return stored;
    }
    return null;
  }
}
