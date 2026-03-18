import { Component, inject, afterNextRender } from '@angular/core';
import { ThemeService } from './services/theme.service';
import { ScrollService } from './services/scroll.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeroSectionComponent } from './components/hero-section/hero-section.component';
import { AboutSectionComponent } from './components/about-section/about-section.component';
import { ExperienceSectionComponent } from './components/experience-section/experience-section.component';
import { SkillsSectionComponent } from './components/skills-section/skills-section.component';
import { ProjectsSectionComponent } from './components/projects-section/projects-section.component';
import { AchievementsSectionComponent } from './components/achievements-section/achievements-section.component';
import { CertificationsSectionComponent } from './components/certifications-section/certifications-section.component';
import { EducationSectionComponent } from './components/education-section/education-section.component';
import { ContactSectionComponent } from './components/contact-section/contact-section.component';
import { FooterComponent } from './components/footer/footer.component';
import { NAV_ITEMS } from './data/resume-data';

@Component({
  selector: 'app-root',
  imports: [
    NavbarComponent,
    HeroSectionComponent,
    AboutSectionComponent,
    ExperienceSectionComponent,
    SkillsSectionComponent,
    ProjectsSectionComponent,
    AchievementsSectionComponent,
    CertificationsSectionComponent,
    EducationSectionComponent,
    ContactSectionComponent,
    FooterComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly themeService = inject(ThemeService);
  private readonly scrollService = inject(ScrollService);

  constructor() {
    afterNextRender(() => {
      this.scrollService.observeSections(
        NAV_ITEMS.map(item => item.sectionId)
      );
    });
  }
}
