import { Component } from '@angular/core';
import { ScrollAnimateDirective } from '../../directives/scroll-animate.directive';
import { SKILL_CATEGORIES } from '../../data/resume-data';

@Component({
  selector: 'app-skills-section',
  imports: [ScrollAnimateDirective],
  templateUrl: './skills-section.component.html',
  styleUrl: './skills-section.component.scss',
})
export class SkillsSectionComponent {
  readonly categories = SKILL_CATEGORIES;
}
