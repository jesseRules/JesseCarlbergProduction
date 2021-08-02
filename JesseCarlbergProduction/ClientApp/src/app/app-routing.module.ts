import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

// Components
import { RegisterUserComponent } from './components/auth/register-user/register-user.component';
import { LogoutComponent } from './components/auth/logout/logout.component';
import { EmailValidationComponent } from './components/auth/email-validation/email-validation.component';
import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { ErrorComponent } from './components/error/error.component';
import { ResetPasswordComponent } from './components/auth/reset-password/reset-password.component';
import { PhotographyComponent } from './components/photography/photography.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { ResumeComponent } from './components/resume/resume.component';
import { CodeboxComponent } from './components/codebox/codebox.component';
import { CodingComponent } from './components/coding/coding.component';
import { ConsultingComponent } from './components/consulting/consulting.component';
import { BlogComponent } from './components/blog/blog.component';
import { ContactComponent } from './components/contact/contact.component';
import { BlogEditorComponent } from './components/blog-editor/blog-editor.component';
import { BlogPostComponent } from './components/blog-post/blog-post.component';
import { ForgotPasswordComponent } from './components/auth/forgot-password/forgot-password.component';
import { JsonBeautifyComponent } from './components/projects/json-beautify/json-beautify.component';
import { MapProjectComponent } from './components/projects/map-project/map-project.component';
import { ChartSampleComponent } from './components/projects/chart-sample/chart-sample.component';
import { YtubeExampleComponent } from './components/projects/ytube-example/ytube-example.component';
import { LicenseComponent } from './components/license/license.component';
import { RssFeedComponent } from './components/projects/rss-feed/rss-feed.component';
import { TwitterFeedComponent } from './components/projects/twitter-feed/twitter-feed.component';
import { Twitter2FeedComponent } from './components/projects/twitter2-feed/twitter2-feed.component';
import { AzurePhotosComponent } from './components/projects/azure-photos/azure-photos.component';
import { GooglePhotosComponent } from './components/projects/google-photos/google-photos.component';
import { BlogSubscriptionComponent } from './components/blog-subscription/blog-subscription.component';
import { JhExampleComponent } from './components/projects/jh-example/jh-example.component';
const routes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: 'home', component: HomeComponent },
  {
    // Needed for hash routing
    path: 'state',
    component: HomeComponent
  },
  {
    // Needed for hash routing
    path: 'code',
    component: HomeComponent
  },
  { path: 'login', component: LoginComponent },
  { path: 'license', component: LicenseComponent },
  { path: 'consulting', component: ConsultingComponent },
  { path: 'coding', component: CodingComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'codebox', component: CodeboxComponent },
  { path: 'blog-subscription/subscribe', component: BlogSubscriptionComponent },
  { path: 'blog-subscription/unsubscribe', component: BlogSubscriptionComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'blog-post/:id', component: BlogPostComponent },
  { path: 'addpost', component: BlogEditorComponent },
  { path: 'addpost/:editor', component: BlogEditorComponent },
  { path: 'addpost/:editor/:id', component: BlogEditorComponent },
  { path: 'error', component: ErrorComponent },
  { path: 'resume', component: ResumeComponent },
  { path: 'photography', component: PhotographyComponent },
  { path: 'portfolio', component: PortfolioComponent },
  { path: 'json-beautifier', component: JsonBeautifyComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'chart-sample', component: ChartSampleComponent },
  { path: 'youtube-sample', component: YtubeExampleComponent },
  { path: 'map-sample', component: MapProjectComponent },
  { path: 'rss-feed-sample', component: RssFeedComponent },
  { path: 'twitter-sample', component: TwitterFeedComponent },
  { path: 'twitter2-sample', component: Twitter2FeedComponent },
  { path: 'azure-photos-sample', component: AzurePhotosComponent },
  { path: 'google-photos-sample', component: GooglePhotosComponent },
  { path: 'jh-sample', component: JhExampleComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'register', component: RegisterUserComponent },
  { path: 'confirm-email', component: EmailValidationComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'error', component: ErrorComponent },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/home',
  },
];
const isIframe = window !== window.parent && !window.opener;

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true,
    // Don't perform initial navigation in iframes
    initialNavigation: !isIframe ? 'enabled' : 'disabled',
    relativeLinkResolution: 'legacy'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
