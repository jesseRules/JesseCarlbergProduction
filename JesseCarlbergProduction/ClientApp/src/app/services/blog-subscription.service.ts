import { Injectable } from '@angular/core';
import { BlogSubscriptionRequest} from './models/blogSubscriptionRequest';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BlogSubscriptionService {
  constructor(private http: HttpClient) {}

  createSubscription(contact: BlogSubscriptionRequest) {
    return this.http.post<BlogSubscriptionRequest>('/api/Subscription', contact);
  }

  getSubscriptionItem(id: string): Observable<BlogSubscriptionRequest> {
    return this.http.get<BlogSubscriptionRequest>('/api/Subscription/' + id);
  }
}
