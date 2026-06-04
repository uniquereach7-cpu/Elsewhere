import { Component, signal, inject } from '@angular/core';
import { RouterLink, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class HeaderComponent {
  isMenuOpen = signal(false);
  isHomeRoute = signal(false);
  private router = inject(Router);

  constructor() {
    // Hide this header on the home page (it has its own nav)
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      const url = event.urlAfterRedirects;
      this.isHomeRoute.set(url === '/home' || url === '/' || url === '');
      // Close the menu on every navigation
      this.isMenuOpen.set(false);
    });
  }

  toggleMenu() {
    this.isMenuOpen.update(val => !val);
  }

  closeMenu() {
    this.isMenuOpen.set(false);
  }

  closeMenuOnBackdrop(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('fullscreen-menu-overlay')) {
      this.closeMenu();
    }
  }
}
