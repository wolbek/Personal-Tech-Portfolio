import { Component, inject } from '@angular/core';
import { ScrollService } from '../../services/scroll.service';
import { PERSONAL_INFO } from '../../data/resume-data';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  private readonly scrollService = inject(ScrollService);
  readonly info = PERSONAL_INFO;
  readonly currentYear = new Date().getFullYear();

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
