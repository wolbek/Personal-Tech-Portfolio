import { Component, signal } from '@angular/core';
import { ScrollAnimateDirective } from '../../directives/scroll-animate.directive';
import { EXPERIENCES } from '../../data/resume-data';

@Component({
  selector: 'app-experience-section',
  imports: [ScrollAnimateDirective],
  templateUrl: './experience-section.component.html',
  styleUrl: './experience-section.component.scss',
})
export class ExperienceSectionComponent {
  readonly experiences = EXPERIENCES;
  readonly expandedProjects = signal<Set<string>>(new Set());

  toggleProject(projectName: string): void {
    this.expandedProjects.update(set => {
      const copy = new Set(set);
      if (copy.has(projectName)) {
        copy.delete(projectName);
      } else {
        copy.add(projectName);
      }
      return copy;
    });
  }

  isExpanded(projectName: string): boolean {
    return this.expandedProjects().has(projectName);
  }
}
