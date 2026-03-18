import { Component } from '@angular/core';
import { ScrollAnimateDirective } from '../../directives/scroll-animate.directive';
import { CERTIFICATIONS } from '../../data/resume-data';

@Component({
  selector: 'app-certifications-section',
  imports: [ScrollAnimateDirective],
  templateUrl: './certifications-section.component.html',
  styleUrl: './certifications-section.component.scss',
})
export class CertificationsSectionComponent {
  readonly certifications = CERTIFICATIONS;
}
