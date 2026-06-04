import { Component, AfterViewInit, ElementRef, ViewChildren, QueryList } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class AboutComponent implements AfterViewInit {
  
  // This grabs all the sections from your HTML that have #tags
  @ViewChildren('heroSection, whySection, foundersSection, approachSection, connectionsSection, advisorySection, ctaSection') 
  revealElements!: QueryList<ElementRef>;

  ngAfterViewInit() {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15 // Triggers the fade-in when 15% of the section is on screen
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Adds the CSS class that changes opacity from 0 to 1
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target); 
        }
      });
    }, observerOptions);

    // Attach the observer to every section
    if (this.revealElements) {
      this.revealElements.forEach(element => {
        observer.observe(element.nativeElement);
      });
    }
  }
}