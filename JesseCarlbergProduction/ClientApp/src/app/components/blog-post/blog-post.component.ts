import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  OnDestroy,
} from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { BlogItem } from '../../services/models/blogFeed';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import md from 'markdown-it';
@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.None,
})
export class BlogPostComponent implements OnInit, OnDestroy {
  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute
  ) {}
  public blogItem: BlogItem;
  public loading = false;
  public errors;
  public markdown;
  public content;
  // Subscriptions
  public routeSubscription: Subscription;
  public blogSubscription: Subscription;

  ngOnInit(): void {
    this.routeSubscription = this.route.paramMap.subscribe((params) => {
      this.getItem(this.route.snapshot.params.id);
    });
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }

    if (this.blogSubscription) {
      this.blogSubscription.unsubscribe();
    }
  }

  getItem(id: string) {
    this.markdown = md();
    this.loading = true;
    this.blogSubscription = this.blogService.getBlogItem(id).subscribe(
      (data) => {
        this.blogItem = data;

        if (this.blogItem.content_markdown) {
          const markdownResponse = this.markdown.render(
            data.content_markdown.replace(/\\"/g, '"')
          );
          this.content = markdownResponse;
        } else {
          this.content = this.blogItem.content;
        }
        this.loading = false;
      },
      (error) => {
        this.errors = error;
        this.loading = false;
      },
      () => {}
    );
  }
}
