import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BlogSubscriptionService } from '../../services/blog-subscription.service';
import { BlogSubscriptionRequest } from '../../services/models/blogSubscriptionRequest';
@Component({
  selector: 'app-blog-subscription',
  templateUrl: './blog-subscription.component.html',
  styleUrls: ['./blog-subscription.component.scss']
})
export class BlogSubscriptionComponent  implements OnInit {
  public sendingInfo = false;
  public subMessage = 'I won\'t sell your info, I promise';
  public btnText = 'Subscribe';
  public message = 'Subscribe to get email updates';
  public recentsubscription: BlogSubscriptionRequest;
  constructor(private subscriptionService: BlogSubscriptionService) {}

  ngOnInit(): void {}

  public subscriptionForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    message: new FormControl(''),
  });

  getErrorMessage() {
    if (this.subscriptionForm.controls.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.subscriptionForm.controls.email.hasError('email')
      ? 'Not a valid email'
      : '';
  }

  sendInfo(event) {
    this.sendingInfo = true;
    let subscription: BlogSubscriptionRequest = new BlogSubscriptionRequest();
    subscription.email = this.subscriptionForm.get('email').value;
    subscription.name = this.subscriptionForm.get('name').value;
    subscription.message = this.subscriptionForm.get('message').value;
    subscription.timeStamp = Date().toLocaleString();
    this.subscriptionService.createSubscription(subscription).subscribe(
      (data) => {
        this.recentsubscription = data;
        this.sendingInfo = false;
        this.subscriptionForm.reset();
      },
      (err) => {
        this.sendingInfo = false;
      }
    );
  }
}
