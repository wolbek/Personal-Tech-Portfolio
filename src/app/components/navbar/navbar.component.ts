import { Component, inject, signal, HostListener } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { ScrollService } from '../../services/scroll.service';
import { ThemePickerComponent } from '../theme-picker/theme-picker.component';
import { NAV_ITEMS } from '../../data/resume-data';

@Component({
  selector: 'app-navbar',
  imports: [ThemePickerComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  readonly themeService = inject(ThemeService);
  readonly scrollService = inject(ScrollService);
  readonly navItems = NAV_ITEMS;
  readonly mobileMenuOpen = signal(false);

  toggleMobileMenu(): void {
    this.mobileMenuOpen.update(v => !v);
  }

  navigateTo(sectionId: string): void {
    this.scrollService.scrollTo(sectionId);
    this.mobileMenuOpen.set(false);
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.mobileMenuOpen.set(false);
  }
}
