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
import { EditBannersComponent } from './content/pages/banner-images/edit-banners/edit-banners.component';
import { PaginationModule } from "ngx-bootstrap/pagination";
import { HomeDashboardComponent } from './content/pages/home-dashboard/home-dashboard.component';
import { ModalModule } from "ngx-bootstrap/modal";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { CaseStudyModelsComponent } from './content/pages/case-study-models/case-study-models.component';
import { EditCaseStudyModelComponent } from './content/pages/case-study-models/edit-case-study-model/edit-case-study-model.component';
import { CaseStudyModelGalleryComponent } from './content/pages/case-study-model-gallery/case-study-model-gallery.component';
import { EditCaseStudyModalGalleryComponent } from './content/pages/case-study-model-gallery/edit-case-study-modal-gallery/edit-case-study-modal-gallery.component';
import { LoaderActionComponent } from './content/shared/loader-action/loader-action.component';
import { LoadingComponent } from './content/shared/loading/loading.component';
import { NgxPaginationModule } from "ngx-pagination";
import { AuthComponent } from './content/auth/auth.component';
import { NotfoundComponent } from './content/shared/notfound/notfound.component';
import { TeamsComponent } from './content/pages/teams/teams.component';
import { EditTeamComponent } from './content/pages/teams/edit-team/edit-team.component';
import { MessagesComponent } from './content/pages/messages/messages.component';
import { CareerComponent } from './content/pages/career/career.component';
import { CareerDetailsComponent } from './content/pages/career/career-details/career-details.component';
import { CKEditorModule } from 'ckeditor4-angular';
import { BlogsComponent } from './content/pages/blogs/blogs.component';
import { SearchPipe } from './pipes/search.pipe';
import { ClientFeedbackFormComponent } from './content/pages/client-feedback-form/client-feedback-form.component';
import { SearchMultiplePipe } from './pipes/search-multiple.pipe';
import { FilterModule } from '@josee9988/filter-pipe-ngx';
import { ToastrModule } from 'ngx-toastr';
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
    EditSlidersComponent,
    EditBannersComponent,
    HomeDashboardComponent,
    CaseStudyModelsComponent,
    EditCaseStudyModelComponent,
    CaseStudyModelGalleryComponent,
    EditCaseStudyModalGalleryComponent,
    LoaderActionComponent,
    LoadingComponent,
    AuthComponent,
    NotfoundComponent,
    TeamsComponent,
    EditTeamComponent,
    MessagesComponent,
    CareerComponent,
    CareerDetailsComponent,
    BlogsComponent,
    SearchPipe,
    ClientFeedbackFormComponent,
    SearchMultiplePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    NgxPaginationModule,
    CKEditorModule,
    FilterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
