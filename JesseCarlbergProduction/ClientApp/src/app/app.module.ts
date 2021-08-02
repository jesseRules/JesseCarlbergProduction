import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { NguiMapModule, NguiMapComponent } from '@ngui/map';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieService } from 'ngx-cookie-service';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppMaterialModule } from './modules/app-material/app-material.module';
import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatCarouselModule } from './modules/app-carousel/carousel.module';
import { HammerModule } from '@angular/platform-browser';
import { GalleryModule } from 'ng-gallery';
import { LightboxModule } from 'ng-gallery/lightbox';
import { ClipboardModule } from 'ngx-clipboard';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { MonacoEditorModule } from '@materia-ui/ngx-monaco-editor';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

// Startup
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Components
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './components/auth/login/login.component';
import { ErrorComponent } from './components/error/error.component';
import { ForgotPasswordComponent } from './components/auth/forgot-password/forgot-password.component';
import { PhotographyComponent } from './components/photography/photography.component';
import { BlogComponent } from './components/blog/blog.component';
import { CodeboxComponent } from './components/codebox/codebox.component';
import { ResumeComponent } from './components/resume/resume.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { BlogEditorComponent } from './components/blog-editor/blog-editor.component';
import { ConsultingComponent } from './components/consulting/consulting.component';
import { CodingComponent } from './components/coding/coding.component';
import { ContactComponent } from './components/contact/contact.component';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { EmailValidationComponent } from './components/auth/email-validation/email-validation.component';
import { HashtagMentionColorizerPipe } from './pipes/hashtag-mention-colorizer.pipe';
import { BlogPostComponent } from './components/blog-post/blog-post.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { JsonBeautifyComponent } from './components/projects/json-beautify/json-beautify.component';
import { MapProjectComponent } from './components/projects/map-project/map-project.component';
import { TseditorComponent } from './components/codebox/tseditor/tseditor.component';
import { HtmleditorComponent } from './components/codebox/htmleditor/htmleditor.component';
import { StyleeditorComponent } from './components/codebox/styleeditor/styleeditor.component';
import { ResultviewComponent } from './components/codebox/resultview/resultview.component';
import { NavfooterComponent } from './components/navfooter/navfooter.component';
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
import { ResetPasswordComponent } from './components/auth/reset-password/reset-password.component';
import { RegisterUserComponent } from './components/auth/register-user/register-user.component';
import { LogoutComponent } from './components/auth/logout/logout.component';
// Services
import { PhotoMainService } from './services/photoMain.service';
import { BlogService } from './services/blog.service';
import { ContactService } from './services/contact.service';
import { TwitterapiService } from './services/twitterapi.service';
import { BlogSubscriptionService } from './services/blog-subscription.service';
import { JhExampleService } from './services/jh-example.service';
import { ErrorHandlerService } from './services/errorhandling/error-handler.service';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { LoggingService } from './services/logging.service';
import { UnauthorizedInterceptor } from './interceptors/unauthorized.interceptor';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AboutComponent,
    LoginComponent,
    ErrorComponent,
    LoginComponent,
    RegisterUserComponent,
    LogoutComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent,
    PhotographyComponent,
    BlogComponent,
    CodeboxComponent,
    ResumeComponent,
    PortfolioComponent,
    BlogEditorComponent,
    ConsultingComponent,
    CodingComponent,
    ContactComponent,
    SafeHtmlPipe,
    HashtagMentionColorizerPipe,
    BlogPostComponent,
    ProjectsComponent,
    JsonBeautifyComponent,
    MapProjectComponent,
    TseditorComponent,
    HtmleditorComponent,
    StyleeditorComponent,
    ResultviewComponent,
    NavfooterComponent,
    ChartSampleComponent,
    YtubeExampleComponent,
    LicenseComponent,
    RssFeedComponent,
    TwitterFeedComponent,
    Twitter2FeedComponent,
    AzurePhotosComponent,
    GooglePhotosComponent,
    BlogSubscriptionComponent,
    JhExampleComponent,
    EmailValidationComponent
  ],
  imports: [
    BrowserAnimationsModule,
    CdkTableModule,
    HttpClientModule,
    CommonModule,
    HammerModule,
    DragDropModule,
    NgxDropzoneModule,
    MonacoEditorModule,
    FlexLayoutModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    AppMaterialModule,
    GalleryModule,
    LightboxModule,
    ScrollingModule,
    ClipboardModule,
    YouTubePlayerModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'X-XSRF-TOKEN',
      headerName: 'X-XSRF-TOKEN'
    }),
    MatCarouselModule.forRoot(),
    NguiMapModule.forRoot({
      apiUrl:
        'https://maps.google.com/maps/api/js?key={Your Key Here}&libraries=drawing',
    }),
  ],
  providers: [
    AuthService,
    NguiMapComponent,
    CookieService,
    PhotoMainService,
    BlogService,
    ContactService,
    TwitterapiService,
    LoggingService,
    ErrorHandlerService,
    JhExampleService,
    BlogSubscriptionService,
    { provide: ErrorHandler, useClass: ErrorHandlerService },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UnauthorizedInterceptor,
      multi: true,
    }],
  bootstrap: [AppComponent],
})
export class AppModule {}
