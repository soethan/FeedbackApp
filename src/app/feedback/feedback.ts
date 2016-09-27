export interface IFeedback{
    id: string;
    name: string;
    description: string;
    points: number;
    questions: IQuestion[]
}
export interface IQuestion{
    feedbackId: string;
    id: string;
    description: string;
    allowMultiple: boolean;
    options: IQuestionOption[];
}

export interface IQuestionOption{
    questionId: string;
    id: string;
    description: string;
}