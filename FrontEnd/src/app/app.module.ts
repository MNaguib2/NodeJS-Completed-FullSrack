import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { LoadderSpinner } from './Core/SpinnerRequest.interceptor';
import { NewPostComponent } from './new-post/new-post.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { PlaceholderDirective } from './Core/placeholder.directive';
import { FormsModule } from '@angular/forms';
import { ViewPostComponent } from './view-post/view-post.component';
import { RoutingDirective } from './Core/routing.directive';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    NewPostComponent,
    NavBarComponent,
    PlaceholderDirective,
    ViewPostComponent,
    RoutingDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: LoadderSpinner, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
