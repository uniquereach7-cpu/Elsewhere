import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class FooterComponent {
  emailInput = signal('');
  isSubscribed = signal(false);

  subscribeNewsletter(event: Event) {
    event.preventDefault();
    if (this.emailInput().trim()) {
      this.isSubscribed.set(true);
      this.emailInput.set('');
      setTimeout(() => {
        this.isSubscribed.set(false);
      }, 5000);
    }
  }
}
