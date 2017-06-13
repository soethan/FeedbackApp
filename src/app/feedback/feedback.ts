export interface IFeedback{
    id: string;
    name: string;
    description: string;
    points: number;
    questions: IQuestion[]
}
export interface IQuestion{
    id: string;
    description: string;
    allowMultiple: boolean;
    options: IQuestionOption[];
}

export interface IQuestionOption{
    id: string;
    description: string;
    customText: string;
    isCustomText: boolean;
}

//User's feedbacks
export interface IUser{
    id: string;
    feedbacks: IUserFeedback[];
}

export interface IUserFeedback{
    feedbackId: string;
    answers: IUserAnswer[];
}

export interface IUserAnswer{
    questionId: string;
    answerOptions: IAnswerOption[];
}

export interface IAnswerOption{
    id: string;
    description: string;
}

export class UserFeedback implements IUserFeedback{
    feedbackId: string;
    answers: IUserAnswer[];

    constructor(id: string){
        this.feedbackId = id;
        this.answers = new Array<UserAnswer>();
    }
}

export class UserAnswer implements IUserAnswer{
    questionId: string;
    answerOptions: IAnswerOption[];

    constructor(questionId: string){
        this.questionId = questionId;
        this.answerOptions = new Array<AnswerOption>();
    }
}

export class AnswerOption implements IAnswerOption{
    id: string;
    description: string;
    constructor(id: string, description: string){
        this.id = id;
        this.description = description;
    }
}