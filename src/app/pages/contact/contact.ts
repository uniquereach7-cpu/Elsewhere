import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class ContactComponent {
  name = signal('');
  email = signal('');
  subject = signal('general');
  message = signal('');
  isSubmitted = signal(false);

  submitForm(event: Event) {
    event.preventDefault();
    if (this.name().trim() && this.email().trim() && this.message().trim()) {
      // Simulate form submission
      this.isSubmitted.set(true);
      
      // Clear inputs
      this.name.set('');
      this.email.set('');
      this.message.set('');
      
      // Reset submission message after 8 seconds
      setTimeout(() => {
        this.isSubmitted.set(false);
      }, 8000);
    }
  }
}
