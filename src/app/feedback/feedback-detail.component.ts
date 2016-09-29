import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IFeedback, IUserFeedback } from './feedback';
import { FeedbackService } from './feedback.service';

@Component({
    styleUrls: ['./feedback.css'],
    templateUrl: './feedback-detail.html'
})
export class FeedbackDetailComponent implements OnInit, OnDestroy {
    id: string;
    private sub: any;
    feedback: IFeedback;
    errorMessage: string;
    userFeedbacks: IUserFeedback[];

    constructor(private _feedbackService: FeedbackService,
        private router: Router,
        private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.sub = this.activatedRoute.params.subscribe(params => {
            this.id = params['id']; 
            this.getFeedback(this.id);
        });
    }

    ngOnDestroy(){
        this.sub.unsubscribe();
    }

    getFeedback(id: string) {
        this._feedbackService.getFeedback(id)
            .subscribe(
                feedback => this.feedback = feedback,
                error => this.errorMessage = <any>error
            );
    }

    onBack(): void {
        this.router.navigate(['feedback']);
    }

}