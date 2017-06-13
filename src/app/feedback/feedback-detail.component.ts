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

    onSelectOption(opt: IQuestionOption, qId: string, allowMultiple: boolean, optCtrl: HTMLInputElement): void {
        this.myForm.controls[qId].markAsDirty();
        
        if(!allowMultiple){
            this.myForm.controls[qId].setValue(opt.id);
        }
        else{
            let opts: Array<string> = this.myForm.controls[qId].value ? this.myForm.controls[qId].value.split(';') : new Array<string>();

            if(optCtrl.checked){
                opts.push(opt.id);
            }
            else{
                opts = opts.filter(v => v !== opt.id);
            }

            this.myForm.controls[qId].setValue(opts.join(';'));
        }
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
            if(this.feedback.questions.find(q => q.id === qId).allowMultiple){
                let opts: Array<string> = this.myForm.controls[qId].value.split(';');
                let ans = new UserAnswer(qId);
                
                opts.forEach(opt => {
                    let ansOpt = new AnswerOption(opt, '');
                    ans.answerOptions.push(ansOpt);
                });
                this.userFeedback.answers.push(ans);
                                
            } 
            else {
                let opts = this.myForm.controls[qId].value.split(';');
                let optCustomText = opts.length > 1 ? opts[1]: '';
                let ansOpt = new AnswerOption(opts[0], optCustomText);

                let ans = new UserAnswer(qId);
                this.userFeedback.answers.push(ans);
                ans.answerOptions.push(ansOpt);
            }
            console.log(this.myForm.controls[qId].value);
        }
    }

    printUserFeedback(): void{
        console.log("this.userFeedbackId=" + this.userFeedback.feedbackId);
        this.userFeedback.answers.forEach(ans => {
            console.log("Q:" + ans.questionId);
            ans.answerOptions.forEach(ansOpt => {
                console.log("A:" + ansOpt.id + ':' + ansOpt.customText);
            });
        });
    }

    onBack(): void {
        this.router.navigate(['feedback']);
    }

}