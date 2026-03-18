import { Injectable, signal, NgZone, inject, PLATFORM_ID, DestroyRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class ScrollService {
  private readonly zone = inject(NgZone);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);

  readonly scrollY = signal(0);
  readonly isScrolled = signal(false);
  readonly activeSection = signal('');

  private sectionObserver: IntersectionObserver | null = null;

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        const onScroll = () => {
          const y = window.scrollY;
          this.scrollY.set(y);
          this.isScrolled.set(y > 50);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        this.destroyRef.onDestroy(() => {
          window.removeEventListener('scroll', onScroll);
          this.sectionObserver?.disconnect();
        });
      });
    }
  }

  observeSections(sectionIds: string[]): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.sectionObserver?.disconnect();
    this.sectionObserver = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.zone.run(() => this.activeSection.set(entry.target.id));
          }
        }
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
    );

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) this.sectionObserver.observe(el);
    }
  }

  scrollTo(sectionId: string): void {
    if (!isPlatformBrowser(this.platformId)) return;
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  }
}
