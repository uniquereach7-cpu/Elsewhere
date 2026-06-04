import { Component, signal, AfterViewInit, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements AfterViewInit {
  // --- Hero Section State (Signals) ---
  mouseX = signal(0);
  mouseY = signal(0);
  isMenuOpen = signal(false);

  // --- Journey Section Elements ---
  // Grabs the elements marked with #problemSection and #solutionSection in your HTML
// UPDATE THIS LINE: Add statusSection to the comma-separated list
  @ViewChildren('problemSection, solutionSection, statusSection, outputsSection, trustSection, insightsTeaserSection') 
  revealElements!: QueryList<ElementRef>;

  // --- Lifecycle Hooks ---
  ngAfterViewInit() {
    // We run this here because ViewChildren are only guaranteed to be available after the view initializes
    this.setupIntersectionObserver();
  }

  // --- Hero Section Methods ---
  onMouseMove(event: MouseEvent) {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    // Calculate mouse position relative to the center of the screen
    this.mouseX.set((windowWidth / 2) - event.clientX);
    this.mouseY.set((windowHeight / 2) - event.clientY);
  }

  toggleMenu() {
    this.isMenuOpen.update(val => !val);
  }
  closeMenu() {
    this.isMenuOpen.set(false);
  }
  closeMenuOnBackdrop(event: MouseEvent) {
    // Only close when clicking the backdrop itself (not the inner content)
    if ((event.target as HTMLElement).classList.contains('fullscreen-menu-overlay')) {
      this.closeMenu();
    }
  }

  // --- Scroll Reveal Logic ---
  private setupIntersectionObserver() {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15 // Triggers the animation when 15% of the section enters the viewport
    };

    const observer = new IntersectionObserver((entries, observerInstance) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add the CSS class that fires the fade/slide up transition
          entry.target.classList.add('is-visible');
          // Stop observing this specific element once it has been revealed
          observerInstance.unobserve(entry.target);
        }
      });
    }, options);

    // Safely attach the observer to each section if they exist in the DOM
    if (this.revealElements) {
      this.revealElements.forEach(element => {
        observer.observe(element.nativeElement);
      });
    }
  }
}