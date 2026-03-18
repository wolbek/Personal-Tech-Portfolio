import { Component } from '@angular/core';
import { ScrollAnimateDirective } from '../../directives/scroll-animate.directive';
import { ACHIEVEMENTS } from '../../data/resume-data';

@Component({
  selector: 'app-achievements-section',
  imports: [ScrollAnimateDirective],
  templateUrl: './achievements-section.component.html',
  styleUrl: './achievements-section.component.scss',
})
export class AchievementsSectionComponent {
  readonly achievements = ACHIEVEMENTS;
}
