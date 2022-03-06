import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AboutUsComponent } from './content/pages/about-us/about-us.component';
import { SidebarComponent } from './content/shared/sidebar/sidebar.component';
import { NavbarComponent } from './content/shared/navbar/navbar.component';
import { FooterComponent } from './content/shared/footer/footer.component';
import { EditComponent } from './content/pages/about-us/edit/edit.component';
import { HomeComponent } from './content/pages/home/home.component';
import { EditHomeComponent } from './content/pages/home/edit-home/edit-home.component';
import { ServicesComponent } from './content/pages/services/services.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditServiceComponent } from './content/pages/services/edit-service/edit-service.component';
import { ClientsComponent } from './content/pages/clients/clients.component';
import { EditClientComponent } from './content/pages/clients/edit-client/edit-client.component';
import { FeedbacksComponent } from './content/pages/feedbacks/feedbacks.component';
import { EditFeedbackComponent } from './content/pages/feedbacks/edit-feedback/edit-feedback.component';
import { BannerImagesComponent } from './content/pages/banner-images/banner-images.component';
import { CasestudyComponent } from './content/pages/casestudy/casestudy.component';
import { EditCasestudyComponent } from './content/pages/casestudy/edit-casestudy/edit-casestudy.component';
import { SlidersComponent } from './content/pages/sliders/sliders.component';
import { EditSlidersComponent } from './content/pages/sliders/edit-sliders/edit-sliders.component';
@NgModule({
  declarations: [
    AppComponent,
    AboutUsComponent,
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
    EditComponent,
    HomeComponent,
    EditHomeComponent,
    ServicesComponent,
    EditServiceComponent,
    ClientsComponent,
    EditClientComponent,
    FeedbacksComponent,
    EditFeedbackComponent,
    BannerImagesComponent,
    CasestudyComponent,
    EditCasestudyComponent,
    SlidersComponent,
    EditSlidersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
