import {
  Directive,
  ElementRef,
  inject,
  input,
  afterNextRender,
  DestroyRef,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appScrollAnimate]',
})
export class ScrollAnimateDirective {
  private readonly el = inject(ElementRef);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);

  readonly animation = input<string>('fade-up', { alias: 'appScrollAnimate' });
  readonly delay = input<number>(0);
  readonly threshold = input<number>(0.15);

  private observer: IntersectionObserver | null = null;

  constructor() {
    afterNextRender(() => {
      if (!isPlatformBrowser(this.platformId)) return;
      this.setupAnimation();
    });
  }

  private setupAnimation(): void {
    const element = this.el.nativeElement as HTMLElement;
    element.classList.add('scroll-hidden', this.animation());

    if (this.delay() > 0) {
      element.style.transitionDelay = `${this.delay()}s`;
    }

    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add('scroll-visible');
          this.observer?.unobserve(element);
        }
      },
      { threshold: this.threshold() }
    );

    this.observer.observe(element);
    this.destroyRef.onDestroy(() => this.observer?.disconnect());
  }
}
