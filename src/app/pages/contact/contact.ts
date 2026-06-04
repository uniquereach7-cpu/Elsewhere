import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

type Stage =
  | 'Idea / Concept'
  | 'Script Development'
  | 'Financing'
  | 'Production'
  | 'Rough Cut'
  | 'Fine Cut'
  | 'Festival Strategy'
  | 'Distribution / Sales';

type Format =
  | 'Feature Fiction'
  | 'Documentary Feature'
  | 'Short Film'
  | 'Series'
  | 'Hybrid / Experimental'
  | 'Other';

interface StepMeta {
  number: number;
  label: string;
  title: string;
  italic: string;
  caption: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class ContactComponent {
  // --- Step engine ---
  currentStep = signal(1);
  isSubmitted = signal(false);

  steps: StepMeta[] = [
    { number: 1, label: 'Contact',  title: "Let's start", italic: 'with you.',         caption: 'Basic contact — so we know who is writing.' },
    { number: 2, label: 'Project',  title: 'About the',   italic: 'project.',          caption: 'The shape of what you are making.' },
    { number: 3, label: 'Team',     title: 'The',         italic: 'people behind it.', caption: 'Director, producer, logline, registration.' },
    { number: 4, label: 'Support',  title: 'How can we',  italic: 'help?',             caption: 'Optional. Skip anything that does not apply yet.' },
  ];

  stageOptions: Stage[] = [
    'Idea / Concept',
    'Script Development',
    'Financing',
    'Production',
    'Rough Cut',
    'Fine Cut',
    'Festival Strategy',
    'Distribution / Sales',
  ];

  formatOptions: Format[] = [
    'Feature Fiction',
    'Documentary Feature',
    'Short Film',
    'Series',
    'Hybrid / Experimental',
    'Other',
  ];

  supportOptions: string[] = [
    'Festival Strategy',
    'Distribution Pathways',
    'Positioning & Packaging',
    'Pitch Deck / Campaign Materials',
    'International Co-production',
    'Producer Consultation',
    'Sales / Market Access',
    'Creative Producing',
    'Unsure / Need Guidance',
  ];

  goalOptions: string[] = [
    'Film Festivals',
    'International sales',
    'OTT release',
    'Impact campaign',
    'Theatrical release',
    'Educational Distribution',
  ];

  // --- Step 1: Basic Contact ---
  fullName = signal('');
  email = signal('');
  phone = signal('');
  cityCountry = signal('');
  website = signal('');

  // --- Step 2: Project Overview (basics) ---
  projectTitle = signal('');
  format = signal<Format | ''>('');
  stage = signal<Stage | ''>('');

  // --- Step 3: Project Overview (team + logline + SWA) ---
  directorName = signal('');
  producerName = signal('');
  productionCompany = signal('');
  logline = signal('');
  swaRegistered = signal<'YES' | 'NO' | ''>('');
  swaNumber = signal('');

  // --- Step 4: Optional ---
  synopsis = signal('');
  keyCrew = signal('');
  previousWork = signal('');
  supportSeeking = signal<string[]>([]);
  challenges = signal('');
  goals = signal<string[]>([]);

  // --- Validation ---
  step1Valid = computed(() =>
    !!this.fullName().trim() &&
    !!this.email().trim() &&
    !!this.phone().trim() &&
    !!this.cityCountry().trim() &&
    !!this.website().trim()
  );

  step2Valid = computed(() =>
    !!this.projectTitle().trim() &&
    !!this.format() &&
    !!this.stage()
  );

  step3Valid = computed(() => {
    const swa = this.swaRegistered();
    const swaOk = swa === 'NO' || (swa === 'YES' && !!this.swaNumber().trim());
    return (
      !!this.directorName().trim() &&
      !!this.producerName().trim() &&
      !!this.productionCompany().trim() &&
      !!this.logline().trim() &&
      swaOk
    );
  });

  step4Valid = computed(() => true);

  currentStepValid = computed(() => {
    switch (this.currentStep()) {
      case 1: return this.step1Valid();
      case 2: return this.step2Valid();
      case 3: return this.step3Valid();
      case 4: return this.step4Valid();
      default: return false;
    }
  });

  loglineWordCount = computed(() => this.countWords(this.logline()));
  synopsisWordCount = computed(() => this.countWords(this.synopsis()));

  private countWords(text: string): number {
    const t = text.trim();
    return t ? t.split(/\s+/).length : 0;
  }

  private isStepValid(n: number): boolean {
    switch (n) {
      case 1: return this.step1Valid();
      case 2: return this.step2Valid();
      case 3: return this.step3Valid();
      case 4: return this.step4Valid();
      default: return false;
    }
  }

  goNext() {
    if (!this.currentStepValid()) return;
    if (this.currentStep() < this.steps.length) {
      this.currentStep.update(s => s + 1);
      this.scrollToTop();
    } else {
      this.submit();
    }
  }

  goBack() {
    if (this.currentStep() > 1) {
      this.currentStep.update(s => s - 1);
      this.scrollToTop();
    }
  }

  goToStep(n: number) {
    if (n === this.currentStep()) return;
    if (n < this.currentStep()) {
      this.currentStep.set(n);
      this.scrollToTop();
      return;
    }
    for (let i = 1; i < n; i++) {
      if (!this.isStepValid(i)) return;
    }
    this.currentStep.set(n);
    this.scrollToTop();
  }

  private scrollToTop() {
    if (typeof window !== 'undefined') {
      const el = document.querySelector('.form-shell');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  selectSwa(v: 'YES' | 'NO') {
    this.swaRegistered.set(v);
    if (v === 'NO') this.swaNumber.set('');
  }

  toggleSupport(option: string) {
    const list = this.supportSeeking();
    this.supportSeeking.set(
      list.includes(option) ? list.filter(o => o !== option) : [...list, option]
    );
  }
  isSupportSelected = (option: string) => this.supportSeeking().includes(option);

  toggleGoal(option: string) {
    const list = this.goals();
    this.goals.set(
      list.includes(option) ? list.filter(o => o !== option) : [...list, option]
    );
  }
  isGoalSelected = (option: string) => this.goals().includes(option);

  submit() {
    if (!this.step1Valid() || !this.step2Valid() || !this.step3Valid()) return;
    this.isSubmitted.set(true);
  }

  startOver() {
    this.currentStep.set(1);
    this.isSubmitted.set(false);
    this.fullName.set('');
    this.email.set('');
    this.phone.set('');
    this.cityCountry.set('');
    this.website.set('');
    this.projectTitle.set('');
    this.format.set('');
    this.stage.set('');
    this.directorName.set('');
    this.producerName.set('');
    this.productionCompany.set('');
    this.logline.set('');
    this.swaRegistered.set('');
    this.swaNumber.set('');
    this.synopsis.set('');
    this.keyCrew.set('');
    this.previousWork.set('');
    this.supportSeeking.set([]);
    this.challenges.set('');
    this.goals.set([]);
  }
}
