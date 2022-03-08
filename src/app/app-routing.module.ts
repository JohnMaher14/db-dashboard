import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './content/pages/about-us/about-us.component';
import { EditComponent } from './content/pages/about-us/edit/edit.component';
import { EditHomeComponent } from './content/pages/home/edit-home/edit-home.component';
import { HomeComponent } from './content/pages/home/home.component';
import { HomeDashboardComponent } from './content/pages/home-dashboard/home-dashboard.component';
import { ServicesComponent } from './content/pages/services/services.component';
import { EditServiceComponent } from './content/pages/services/edit-service/edit-service.component';
import { ClientsComponent } from './content/pages/clients/clients.component';
import { EditClientComponent } from './content/pages/clients/edit-client/edit-client.component';
import { FeedbacksComponent } from './content/pages/feedbacks/feedbacks.component';
import { EditFeedbackComponent } from './content/pages/feedbacks/edit-feedback/edit-feedback.component';
import { CasestudyComponent } from './content/pages/casestudy/casestudy.component';
import { EditCasestudyComponent } from './content/pages/casestudy/edit-casestudy/edit-casestudy.component';
import { SlidersComponent } from './content/pages/sliders/sliders.component';
import { EditSlidersComponent } from './content/pages/sliders/edit-sliders/edit-sliders.component';
import { BannerImagesComponent } from './content/pages/banner-images/banner-images.component';
import { EditBannersComponent } from './content/pages/banner-images/edit-banners/edit-banners.component';
import { CaseStudyModelsComponent } from './content/pages/case-study-models/case-study-models.component';
import { EditCaseStudyModelComponent } from './content/pages/case-study-models/edit-case-study-model/edit-case-study-model.component';
import { CaseStudyModelGalleryComponent } from './content/pages/case-study-model-gallery/case-study-model-gallery.component';
import { EditCaseStudyModalGalleryComponent } from './content/pages/case-study-model-gallery/edit-case-study-modal-gallery/edit-case-study-modal-gallery.component';

const routes: Routes = [

  {path: '', redirectTo:'home' ,pathMatch:'full'},
  {path: 'home', component:HomeDashboardComponent},
  {path: 'home-page', component:HomeComponent},
  {path: 'home-page/edit/:id', component:EditHomeComponent},
  {path: 'about-us', component:AboutUsComponent},
  {path: 'about-us/edit/:id', component:EditComponent},
  {path: 'services', component:ServicesComponent},
  {path: 'services/:id', component:EditServiceComponent},
  {path: 'clients', component:ClientsComponent},
  {path: 'clients/:id', component:EditClientComponent},
  {path: 'feedbacks', component:FeedbacksComponent},
  {path: 'feedbacks/:id', component:EditFeedbackComponent},
  {path: 'case-studies', component:CasestudyComponent},
  {path: 'case-studies/:id', component:EditCasestudyComponent},
  {path: 'case-study-model/:id', component:CaseStudyModelsComponent},
  {path: 'case-study-model/edit/:id', component:EditCaseStudyModelComponent},
  {path: 'case-study-model-gallery/:id', component:CaseStudyModelGalleryComponent},
  {path: 'case-study-model-gallery/edit/:id', component:EditCaseStudyModalGalleryComponent},
  {path: 'sliders', component:SlidersComponent},
  {path: 'sliders/:id', component:EditSlidersComponent},
  {path: 'banners', component:BannerImagesComponent},
  {path: 'banners/edit/:id', component:EditBannersComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes , {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
