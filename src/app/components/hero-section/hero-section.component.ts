import { Component, inject, signal, afterNextRender, DestroyRef } from '@angular/core';
import { ScrollService } from '../../services/scroll.service';
import { ThemeService } from '../../services/theme.service';
import { ThreeBgComponent } from '../three-bg/three-bg.component';
import { PERSONAL_INFO } from '../../data/resume-data';

@Component({
  selector: 'app-hero-section',
  imports: [ThreeBgComponent],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss',
})
export class HeroSectionComponent {
  private readonly scrollService = inject(ScrollService);
  readonly themeService = inject(ThemeService);
  private readonly destroyRef = inject(DestroyRef);
  readonly info = PERSONAL_INFO;
  readonly displayedText = signal('');
  private readonly fullText = this.info.tagline;
  private typewriterTimer: ReturnType<typeof setInterval> | null = null;

  constructor() {
    afterNextRender(() => this.startTypewriter());
  }

  private startTypewriter(): void {
    let i = 0;
    this.typewriterTimer = setInterval(() => {
      if (i <= this.fullText.length) {
        this.displayedText.set(this.fullText.slice(0, i));
        i++;
      } else {
        if (this.typewriterTimer) clearInterval(this.typewriterTimer);
      }
    }, 45);

    this.destroyRef.onDestroy(() => {
      if (this.typewriterTimer) clearInterval(this.typewriterTimer);
    });
  }

  scrollToProjects(): void {
    this.scrollService.scrollTo('projects');
  }

  scrollToContact(): void {
    this.scrollService.scrollTo('contact');
  }
}
