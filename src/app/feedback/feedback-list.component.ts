import {Component, OnInit} from "@angular/core";
import {IFeedback} from './feedback';
import {FeedbackService} from './feedback.service';

@Component({
  selector: 'feedback-list',
  styleUrls: ['./feedback-list.css'],
  templateUrl: './feedback-list.html'
})
export class FeedbackListComponent implements OnInit{
    private feedbacks: IFeedback[];
    errorMessage: string;

    constructor(private _feedbackService: FeedbackService){

    }

    ngOnInit(): void{
        this._feedbackService.getFeedbacks()
            .subscribe(
                feedbacks => this.feedbacks = feedbacks,
                error => this.errorMessage = <any>error
            );
    }
}