import {Injectable} from "@angular/core";
import {IFeedback} from "./feedback";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Rx";

@Injectable()
export class FeedbackService{
    private _feedbackUrl = "api/feedback/feedbacks.json"
    constructor(private _http: Http){

    }

    getFeedbacks(): Observable<IFeedback[]>{
        return this._http.get(this._feedbackUrl)
                .map((response: Response) => <IFeedback[]>response.json());
    }

    getFeedback(id: string): Observable<IFeedback> {
        return this.getFeedbacks()
            .map((feedbacks: IFeedback[]) => feedbacks.find(p => p.id === id));
    }

    private handleError(error: Response){
        console.error(error);
        return Observable.throw(error.json().error || "Server Error");
    }
}