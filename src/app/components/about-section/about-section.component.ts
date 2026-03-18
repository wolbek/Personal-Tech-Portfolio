import { Component, inject, signal, afterNextRender, DestroyRef, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ScrollAnimateDirective } from '../../directives/scroll-animate.directive';
import { PERSONAL_INFO } from '../../data/resume-data';
import { Stat } from '../../models/portfolio.models';

@Component({
  selector: 'app-about-section',
  imports: [ScrollAnimateDirective],
  templateUrl: './about-section.component.html',
  styleUrl: './about-section.component.scss',
})
export class AboutSectionComponent {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);
  readonly info = PERSONAL_INFO;
  readonly animatedStats = signal<Map<string, string>>(new Map());
  private observer: IntersectionObserver | null = null;
  private hasAnimated = false;

  constructor() {
    afterNextRender(() => {
      if (!isPlatformBrowser(this.platformId)) return;
      this.setupStatObserver();
    });
  }

  getAnimatedValue(stat: Stat): string {
    return this.animatedStats().get(stat.label) ?? '0';
  }

  private setupStatObserver(): void {
    const el = document.getElementById('about-stats');
    if (!el) return;

    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !this.hasAnimated) {
          this.hasAnimated = true;
          this.animateCounters();
          this.observer?.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    this.observer.observe(el);
    this.destroyRef.onDestroy(() => this.observer?.disconnect());
  }

  private animateCounters(): void {
    for (const stat of this.info.stats) {
      this.animateNumber(stat);
    }
  }

  private animateNumber(stat: Stat): void {
    const duration = 1500;
    const fps = 60;
    const totalFrames = duration / (1000 / fps);
    let frame = 0;

    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const eased = 1 - Math.pow(1 - progress, 3);

      const current = stat.numericValue * eased;
      const formatted = stat.numericValue % 1 !== 0
        ? current.toFixed(2)
        : Math.floor(current).toString();

      this.animatedStats.update(m => {
        const copy = new Map(m);
        copy.set(stat.label, formatted + stat.suffix);
        return copy;
      });

      if (frame >= totalFrames) {
        clearInterval(timer);
        this.animatedStats.update(m => {
          const copy = new Map(m);
          copy.set(stat.label, stat.value);
          return copy;
        });
      }
    }, 1000 / fps);

    this.destroyRef.onDestroy(() => clearInterval(timer));
  }
}
