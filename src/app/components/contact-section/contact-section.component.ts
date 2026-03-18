import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ScrollAnimateDirective } from '../../directives/scroll-animate.directive';
import { PERSONAL_INFO } from '../../data/resume-data';

@Component({
  selector: 'app-contact-section',
  imports: [ReactiveFormsModule, ScrollAnimateDirective],
  templateUrl: './contact-section.component.html',
  styleUrl: './contact-section.component.scss',
})
export class ContactSectionComponent {
  private readonly fb = new FormBuilder();
  private readonly http = inject(HttpClient);
  readonly info = PERSONAL_INFO;
  readonly submitted = signal(false);
  readonly sending = signal(false);
  readonly errorMessage = signal('');

  readonly contactForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.sending.set(true);
      this.errorMessage.set('');

      const formData = this.contactForm.getRawValue();

      this.http
        .post<{ success: string }>(
          `https://formsubmit.co/ajax/${this.info.email}`,
          {
            name: formData.name,
            email: formData.email,
            message: formData.message,
            _subject: `Portfolio Contact: ${formData.name}`,
          },
          {
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          }
        )
        .subscribe({
          next: () => {
            this.sending.set(false);
            this.submitted.set(true);
            this.contactForm.reset();
            setTimeout(() => this.submitted.set(false), 5000);
          },
          error: () => {
            this.sending.set(false);
            this.errorMessage.set(
              'Could not send message. Please email me directly instead.'
            );
            setTimeout(() => this.errorMessage.set(''), 5000);
          },
        });
    } else {
      this.contactForm.markAllAsTouched();
    }
  }

  hasError(field: string): boolean {
    const control = this.contactForm.get(field);
    return !!control && control.invalid && control.touched;
  }

  getError(field: string): string {
    const control = this.contactForm.get(field);
    if (!control || !control.errors) return '';
    if (control.errors['required']) return 'This field is required';
    if (control.errors['email']) return 'Please enter a valid email';
    if (control.errors['minlength']) {
      const min = control.errors['minlength'].requiredLength;
      return `Minimum ${min} characters required`;
    }
    return '';
  }
}
