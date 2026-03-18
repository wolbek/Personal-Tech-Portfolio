import { Component } from '@angular/core';
import { ScrollAnimateDirective } from '../../directives/scroll-animate.directive';
import { PROJECTS } from '../../data/resume-data';

@Component({
  selector: 'app-projects-section',
  imports: [ScrollAnimateDirective],
  templateUrl: './projects-section.component.html',
  styleUrl: './projects-section.component.scss',
})
export class ProjectsSectionComponent {
  readonly projects = PROJECTS;
}
