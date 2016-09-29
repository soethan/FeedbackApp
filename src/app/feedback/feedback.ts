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