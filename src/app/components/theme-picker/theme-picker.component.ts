import {
  Component,
  inject,
  signal,
  HostListener,
  ElementRef,
} from '@angular/core';
import {
  ThemeService,
  ANIME_THEMES,
  SEASONAL_THEMES,
  type SpecialTheme,
  type ThemeOption,
} from '../../services/theme.service';

@Component({
  selector: 'app-theme-picker',
  templateUrl: './theme-picker.component.html',
  styleUrl: './theme-picker.component.scss',
})
export class ThemePickerComponent {
  readonly themeService = inject(ThemeService);
  private readonly elRef = inject(ElementRef);

  readonly animeThemes = ANIME_THEMES;
  readonly seasonalThemes = SEASONAL_THEMES;

  readonly animeOpen = signal(false);
  readonly seasonalOpen = signal(false);

  toggleAnime(): void {
    this.seasonalOpen.set(false);
    this.animeOpen.update(v => !v);
  }

  toggleSeasonal(): void {
    this.animeOpen.set(false);
    this.seasonalOpen.update(v => !v);
  }

  selectTheme(theme: SpecialTheme): void {
    this.themeService.setSpecialTheme(theme);
  }

  isActive(theme: SpecialTheme): boolean {
    return this.themeService.specialTheme() === theme;
  }

  @HostListener('document:click', ['$event'])
  onDocClick(event: MouseEvent): void {
    if (!this.elRef.nativeElement.contains(event.target)) {
      this.animeOpen.set(false);
      this.seasonalOpen.set(false);
    }
  }

  @HostListener('document:keydown.escape')
  onEsc(): void {
    this.animeOpen.set(false);
    this.seasonalOpen.set(false);
  }
}
