import {NgModule} from '@angular/core'
import {RouterModule} from "@angular/router";
import {rootRouterConfig} from "./app.routes";
import {AppComponent} from "./app";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {HttpModule} from "@angular/http";
import {About} from './about/about';
import {FeedbackService} from './feedback/feedback.service';
import {FeedbackListComponent} from './feedback/feedback-list.component';
import {FeedbackDetailComponent} from './feedback/feedback-detail.component';
import {Home} from './home/home';

@NgModule({
  declarations: [AppComponent, FeedbackListComponent, FeedbackDetailComponent, About, Home],
  imports     : [BrowserModule, FormsModule, HttpModule, RouterModule.forRoot(rootRouterConfig)],
  providers   : [FeedbackService],
  bootstrap   : [AppComponent]
})
export class AppModule {

}