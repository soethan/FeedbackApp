import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
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
    myForm: FormGroup;

    constructor(private _formBuilder: FormBuilder, private _feedbackService: FeedbackService,
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
                feedback => {
                    this.feedback = feedback;
                    this.createValidationRules();
                },
                error => this.errorMessage = <any>error
            );
    }

    createValidationRules(){
        let validationParamObj = {};

        this.feedback.questions.forEach(q => {
            validationParamObj[q.id] = ['', Validators.required]; 
        });
        this.myForm = this._formBuilder.group(validationParamObj);
    }

    onSelectOption(opt: IQuestionOption, qId: string): void {
        this.myForm.controls[qId].markAsDirty();
        this.myForm.controls[qId].setValue(opt.id + ';' + opt.description);
    }

    onChangeCustomText(customText, qId): void {
        this.myForm.controls[qId].setValue(this.myForm.controls[qId].value + ';' + customText);
    }

    onSubmit(): void {
        this.populateUserFeedbackAnswers();
        this.printUserFeedback();
    }

    populateUserFeedbackAnswers(): void{
        this.userFeedback.answers = new Array<UserAnswer>();
        //for each question, there is an answer with answer options
        for(var qId in this.myForm.controls) {
            let opts = this.myForm.controls[qId].value.split(';');
            let optDesc = opts.length > 2 ? opts[1] + ';' + opts[2] : opts[1];
            let ansOpt = new AnswerOption(opts[0], optDesc);

            let ans = new UserAnswer(qId);
            this.userFeedback.answers.push(ans);
            ans.answerOptions.push(ansOpt);

            console.log(this.myForm.controls[qId].value);
        }
    }

    printUserFeedback(): void{
        console.log("this.userFeedbackId=" + this.userFeedback.feedbackId);
        this.userFeedback.answers.forEach(ans => {
            console.log("Q:" + ans.questionId);
            ans.answerOptions.forEach(ansOpt => {
                console.log("A:" + ansOpt.id + ':' + ansOpt.description);
            });
        });
    }

    onBack(): void {
        this.router.navigate(['feedback']);
    }

}