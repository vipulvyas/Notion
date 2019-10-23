import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CategoriesComponent } from './categories/categories.component';
import { HeaderComponent } from './header/header.component';
import { ContentComponent } from './content/content.component';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { FooterComponent } from './footer/footer.component';
import { ActivityComponent } from './activity/activity.component';
import { HttpClientModule } from '@angular/common/http';
import { AdminComponent } from './admin/admin.component';
import { UploadArticleComponent } from './upload-article/upload-article.component';
import { CommentComponent } from './comment/comment.component';
import { LogoutComponent } from './logout/logout.component';
import { UpdateArticleComponent } from './update-article/update-article.component';
import { Upload2ArticleComponent } from './upload2-article/upload2-article.component';


const routes: Routes = [
  { path: 'profile', component: ProfileComponent},
  { path: 'activity', component: ActivityComponent},
  { path: 'categories', component: CategoriesComponent},
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignUpComponent},
  {path: 'upload', component: UploadArticleComponent},
  {path: 'upload2', component: Upload2ArticleComponent},

  {path: 'update', component: UpdateArticleComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'comment', component: CommentComponent},
  {path: 'logout', component: LogoutComponent},
  { path: '**', component: ContentComponent}
  ];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CategoriesComponent,
    HeaderComponent,
    ContentComponent,
    ProfileComponent,
    SignUpComponent,
    FooterComponent,
    ActivityComponent,
    AdminComponent,
    UploadArticleComponent,
    CommentComponent,
    LogoutComponent,
    UpdateArticleComponent,
    Upload2ArticleComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
