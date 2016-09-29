import {Routes} from '@angular/router';
import {About} from './about/about';
import {Home} from './home/home';
import {FeedbackListComponent} from './feedback/feedback-list.component';
import {FeedbackDetailComponent} from './feedback/feedback-detail.component';

export const rootRouterConfig: Routes = [
  {path: '', redirectTo: 'feedback', pathMatch: 'full'},
  {path: 'home', component: Home},
  {path: 'about', component: About},
  {path: 'feedback', component: FeedbackListComponent},
  {path: 'feedback-detail/:id', component: FeedbackDetailComponent}
];