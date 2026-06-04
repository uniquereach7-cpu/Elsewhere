import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { AboutComponent } from './pages/about/about';
import { JourneyComponent } from './pages/journey/journey';
import { InsightsPodcastComponent } from './pages/insights-podcast/insights-podcast';
import { ContactComponent } from './pages/contact/contact';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'journey', component: JourneyComponent },
  { path: 'insights', component: InsightsPodcastComponent },
  { path: 'contact', component: ContactComponent },
  { path: '**', redirectTo: 'home' }
];
