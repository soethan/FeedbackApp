import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IFeedback, IUserFeedback, UserFeedback, UserAnswer, AnswerOption, IQuestionOption } from './feedback';
import { FeedbackService } from './feedback.service';

@Component({
    styleUrls: ['./feedback.css'],
    templateUrl: './feedback-detail.html'
})
export class FeedbackDetailComponent implements OnInit, OnDestroy {
    private sub: any;
    feedback: IFeedback;
    errorMessage: string;
    userFeedback: IUserFeedback;

    constructor(private _feedbackService: FeedbackService,
        private router: Router,
        private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.sub = this.activatedRoute.params.subscribe(params => {
            this.userFeedback = new UserFeedback(params['id']);
            this.getFeedback(params['id']);
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    getFeedback(id: string) {
        this._feedbackService.getFeedback(id)
            .subscribe(
                feedback => this.feedback = feedback,
                error => this.errorMessage = <any>error
            );
    }

    onSelectOption(opt: IQuestionOption, qId, allowMultiple): void {
        //userAnswer => 1 Question
        //console.log(opt.id + ";" + opt.description + ";" + qId);

        let isExistingAnswer: boolean;
        let userAns = this.userFeedback.answers.find(opt => opt.questionId == qId);

        if(userAns != null) {
            isExistingAnswer = true;
            if(!allowMultiple) {
                userAns.answerOptions = new Array<AnswerOption>();
            }
        }
        else {
            userAns = new UserAnswer(qId);
        }

        let customText = opt.customText ? opt.customText : "";
        userAns.answerOptions.push(new AnswerOption(opt.id, (opt.isCustomText ? customText : opt.description)));

        if(!isExistingAnswer) {
            this.userFeedback.answers.push(userAns);
        }     
        
        console.log(this.userFeedback);
    }

    onChangeCustomText(optId, customText, qId): void {
        let userAns = this.userFeedback.answers.find(opt => opt.questionId == qId);
        let opt = userAns.answerOptions.find(opt => opt.id === optId);
        if(opt != null) {

            opt.description = customText;
        }
        else{
            console.log('NOT checked...');
        }
        
    }

    onSubmit(): void {
        console.log(this.userFeedback);
    }

    onBack(): void {
        this.router.navigate(['feedback']);
    }

}