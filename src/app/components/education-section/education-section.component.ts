import { Component } from '@angular/core';
import { ScrollAnimateDirective } from '../../directives/scroll-animate.directive';
import { EDUCATION_DATA } from '../../data/resume-data';

@Component({
  selector: 'app-education-section',
  imports: [ScrollAnimateDirective],
  templateUrl: './education-section.component.html',
  styleUrl: './education-section.component.scss',
})
export class EducationSectionComponent {
  readonly educationList = EDUCATION_DATA;
}
