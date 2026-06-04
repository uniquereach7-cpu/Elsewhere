import { Component, signal, effect, OnDestroy } from '@angular/core';

interface Article {
  id: number;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
}

@Component({
  selector: 'app-insights-podcast',
  standalone: true,
  imports: [],
  templateUrl: './insights-podcast.html',
  styleUrl: './insights-podcast.css'
})
export class InsightsPodcastComponent implements OnDestroy {
  isPlaying = signal(false);
  currentTime = signal(42);
  duration = signal(184);
  volume = signal(80);
  podcastTitle = signal('Episode 04 - The Acoustics of Snow');
  podcastSeries = signal('Elsewhere Soundscapes');

  private timerId: any = null;

  constructor() {
    // Effect to handle the mock timer when playing state changes
    effect(() => {
      if (this.isPlaying()) {
        this.startTimer();
      } else {
        this.stopTimer();
      }
    });
  }

  ngOnDestroy() {
    this.stopTimer();
  }

  togglePlay() {
    this.isPlaying.update(val => !val);
  }

  startTimer() {
    if (this.timerId) return;
    this.timerId = setInterval(() => {
      this.currentTime.update(time => {
        if (time >= this.duration()) {
          this.isPlaying.set(false);
          return 0;
        }
        return time + 1;
      });
    }, 1000);
  }

  stopTimer() {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  formatTime(secs: number): string {
    const minutes = Math.floor(secs / 60);
    const seconds = secs % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  get progressPercent(): number {
    return (this.currentTime() / this.duration()) * 100;
  }

  articles = signal<Article[]>([
    {
      id: 1,
      category: 'Editorial',
      title: 'The Lost Art of Deceleration',
      excerpt: 'Why travelling at 5 miles per hour reveals details that planes and highways completely obliterate. Reflections on walking the Norwegian shores.',
      date: 'May 12, 2026',
      readTime: '6 min read'
    },
    {
      id: 2,
      category: 'Acoustics',
      title: 'Capturing the Sound of Silence',
      excerpt: 'A technical guide to spatial recording in remote environments, from binaural ears to shielding wind noise in arctic conditions.',
      date: 'April 28, 2026',
      readTime: '8 min read'
    },
    {
      id: 3,
      category: 'Interview',
      title: 'Wisdom of the High Passes',
      excerpt: 'Sitting down with Eduardo Cruz, a traditional salt harvester in the Uyuni highlands, discussing heritage, landscape, and ancestral song.',
      date: 'March 15, 2026',
      readTime: '10 min read'
    },
    {
      id: 4,
      category: 'Field Notes',
      title: 'Water Under Yakushima Moss',
      excerpt: 'Field sketches and acoustic measurements from the moss-covered forests of Japan, tracing the exact frequency responses of primeval rain.',
      date: 'Feb 19, 2026',
      readTime: '5 min read'
    }
  ]);
}
