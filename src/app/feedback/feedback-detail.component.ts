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
                    let validationParamObj = {};

                    this.feedback.questions.forEach(q => {
                        validationParamObj[q.id] = ['', Validators.required]; 
                    });
                    this.myForm = this._formBuilder.group(validationParamObj);
                },
                error => this.errorMessage = <any>error
            );
    }

    onSelectOption(opt: IQuestionOption, qId: string, allowMultiple: boolean): void {
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
               
        this.myForm.controls[qId].markAsDirty();
        this.myForm.controls[qId].setValue(opt.id + ';' + customText);
        
        if(!isExistingAnswer) {
            this.userFeedback.answers.push(userAns);
        }     
        
        console.log(this.userFeedback);
    }

    onChangeCustomText(optId, customText, qId): void {
        this.myForm.controls[qId].setValue(this.myForm.controls[qId].value + customText);
    }

    onSubmit(): void {
        for(var key in this.myForm.controls) {
            console.log(this.myForm.controls[key].value);
        }
    }

    onBack(): void {
        this.router.navigate(['feedback']);
    }

}