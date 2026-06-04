import { AfterViewInit, Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { RouterLink } from '@angular/router';

interface SubBlock {
  label: string;
  body: string;
}

interface Stage {
  num: string;
  accent: 'burgundy' | 'indigo';
  title: string;
  tagline: string;
  image: string;
  blocks: SubBlock[];
}

interface Pathway {
  num: string;
  accent: 'burgundy' | 'indigo';
  title: string;
  arc: string;
  desc: string;
}

@Component({
  selector: 'app-journey',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './journey.html',
  styleUrl: './journey.css'
})
export class JourneyComponent implements AfterViewInit {

  stages: Stage[] = [
    {
      num: '01',
      accent: 'burgundy',
      title: 'Early Stage / Production Support',
      tagline: 'Solidify the foundation before the camera rolls.',
      image: 'https://images.unsplash.com/photo-1571232151946-f7f00c61ade7?q=80&w=1400&auto=format&fit=crop',
      blocks: [
        {
          label: "What You're Facing",
          body: 'A brilliant script with no clear pathway. Financing conversations stalling. Decisions made in isolation that will define the next three years of the project.'
        },
        {
          label: 'How We Help',
          body: 'We pressure-test the script, packaging, and financial architecture before a single frame is shot — aligning intent with market reality from the first draft.'
        },
        {
          label: 'What You Get',
          body: 'Script consultation reports, co-production matching, and a packaging strategy aligned with target festivals and buyers.'
        }
      ]
    },
    {
      num: '02',
      accent: 'indigo',
      title: 'Festival Strategy',
      tagline: 'Know exactly which festivals want your film, and why.',
      image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=1400&auto=format&fit=crop',
      blocks: [
        {
          label: "What You're Facing",
          body: 'Submitting to two hundred festivals hoping one says yes. Burning fees with no pattern. Missing the premiere windows that actually matter.'
        },
        {
          label: 'How We Help',
          body: 'A ranked, reasoned festival map built around your film\'s DNA — premiere strategy, tier sequencing, programmer access, and timing.'
        },
        {
          label: 'What You Get',
          body: 'A targeted submission roadmap, programmer introductions where relevant, and premiere positioning that earns press and buyer attention.'
        }
      ]
    },
    {
      num: '03',
      accent: 'burgundy',
      title: 'Titles & Campaigns',
      tagline: 'Positioning that speaks to buyers, programmers, and audiences.',
      image: 'https://images.unsplash.com/photo-1574267432553-4b4628081c31?q=80&w=1400&auto=format&fit=crop',
      blocks: [
        {
          label: "What You're Facing",
          body: 'A title that doesn\'t land. A logline that doesn\'t sell. A film nobody can describe in a single sentence.'
        },
        {
          label: 'How We Help',
          body: 'Editorial rework of the film\'s external identity — name, logline, synopsis, key art direction, and press positioning.'
        },
        {
          label: 'What You Get',
          body: 'A market-ready campaign kit, titling alternatives with rationale, press notes, EPK structure, and audience hooks.'
        }
      ]
    },
    {
      num: '04',
      accent: 'indigo',
      title: 'Distribution Bridge',
      tagline: 'Navigate the sale without losing the soul of the film.',
      image: 'https://images.unsplash.com/photo-1535016120720-40c646be5580?q=80&w=1400&auto=format&fit=crop',
      blocks: [
        {
          label: "What You're Facing",
          body: 'The festival run is ending. No deal in hand. Limited intel on what buyers actually want, and a shrinking window to act on.'
        },
        {
          label: 'How We Help',
          body: 'We translate the festival run into deal-making — sales agent shortlists, direct buyer outreach, theatrical and streaming pathways.'
        },
        {
          label: 'What You Get',
          body: 'A distribution plan with named targets, negotiation strategy, and direct introductions to sales agents and acquisition executives.'
        }
      ]
    }
  ];

  pathways: Pathway[] = [
    {
      num: '01',
      accent: 'burgundy',
      title: 'The Festival-First Path',
      arc: 'Stages 02 → 03 → 04',
      desc: 'A finished film with a strong rough cut. We build the premiere strategy, sharpen the campaign, and bridge into distribution while the heat lasts.'
    },
    {
      num: '02',
      accent: 'indigo',
      title: 'The Production-First Path',
      arc: 'Stages 01 → 02 → 03',
      desc: 'A script and a director with a vision. We architect the package, plan the premiere targets early, and lock the positioning before the edit closes.'
    },
    {
      num: '03',
      accent: 'burgundy',
      title: 'The Full-Arc Path',
      arc: 'Stages 01 → 04',
      desc: 'A full-journey partnership from script to deal. The complete operating system, applied end-to-end across the lifecycle of the film.'
    }
  ];

  @ViewChildren('revealEl') revealEls!: QueryList<ElementRef>;

  ngAfterViewInit() {
    const observer = new IntersectionObserver((entries, inst) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          inst.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });

    this.revealEls?.forEach(el => observer.observe(el.nativeElement));
  }
}
