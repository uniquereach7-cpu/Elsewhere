import { Component, signal } from '@angular/core';

interface JourneyChapter {
  id: number;
  chapterNum: string;
  title: string;
  location: string;
  date: string;
  summary: string;
  fullStory: string;
  expanded: boolean;
}

@Component({
  selector: 'app-journey',
  standalone: true,
  imports: [],
  templateUrl: './journey.html',
  styleUrl: './journey.css'
})
export class JourneyComponent {
  chapters = signal<JourneyChapter[]>([
    {
      id: 1,
      chapterNum: 'Chapter I',
      title: 'The Whispering Fjords',
      location: 'Northern Norway',
      date: 'Autumn 2024',
      summary: 'A solo trek tracing the coastline on foot, recording the sonic texture of wind across deep icy waters.',
      fullStory: 'Traversing the Arctic coastline, I spent seven days without meeting another soul. In the silence of the fjords, the auditory landscape became incredibly vivid. Every step on the black shingle, every splash of glacier water, and the low hum of the wind echoing in the rock fissures was documented. I discovered an abandoned fishing cabin near Reine, where I recorded a severe storm using a binaural head microphone, capturing the exact spatial feeling of rain and wooden beams groaning under pressure.',
      expanded: false
    },
    {
      id: 2,
      chapterNum: 'Chapter II',
      title: 'Echoes of the High Altiplano',
      location: 'Andean Highlands, Bolivia',
      date: 'Winter 2025',
      summary: 'Ascending to 4,000 meters to document high-altitude silence and the ancient wind instrument songs of indigenous salt-gatherers.',
      fullStory: 'The Altiplano is a vast, dry, silent expanse where distance loses meaning. At the Salar de Uyuni, the absolute silence at night is deafening. I sat with Eduardo, an elder salt miner, who played the "Siku" pan flute. The thin air gives the flute a breathy, celestial timber that echoes softly over the crystal plains. Our recordings capture the fusion of pan flute notes and the sharp cracking of drying salt crystals underfoot at sunset.',
      expanded: false
    },
    {
      id: 3,
      chapterNum: 'Chapter III',
      title: 'The Shaded Pathways of Yakushima',
      location: 'Yakushima Island, Japan',
      date: 'Spring 2026',
      summary: 'Drifting through the primeval cedar forests to capture the soundscapes of heavy rainfall and moss-covered silence.',
      fullStory: 'Yakushima is said to rain 35 days a month. In this lush green dome, I walked amongst giant cryptomeria trees that are thousands of years old. The acoustic environment is completely insulated by dense carpets of green moss. I set up hydrophones (water microphones) in the mountain streams, recording the hollow, rumbling under-water flow of rivers cascading down basalt stones. The resulting ambient recordings form a hypnotic rhythm of water hitting leaves, rocks, and mud.',
      expanded: false
    }
  ]);

  toggleChapter(id: number) {
    this.chapters.update(currentList =>
      currentList.map(ch => ch.id === id ? { ...ch, expanded: !ch.expanded } : ch)
    );
  }
}
