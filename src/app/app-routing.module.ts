import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './content/pages/about-us/about-us.component';
import { EditComponent } from './content/pages/about-us/edit/edit.component';
import { EditHomeComponent } from './content/pages/home/edit-home/edit-home.component';
import { HomeComponent } from './content/pages/home/home.component';
import { ServicesComponent } from './content/pages/services/services.component';
import { EditServiceComponent } from './content/pages/services/edit-service/edit-service.component';
import { ClientsComponent } from './content/pages/clients/clients.component';

const routes: Routes = [

  {path: '', redirectTo:'home' ,pathMatch:'full'},
  {path: 'home', component:HomeComponent},
  {path: 'home/edit/:id', component:EditHomeComponent},
  {path: 'about-us', component:AboutUsComponent},
  {path: 'about-us/edit/:id', component:EditComponent},
  {path: 'services', component:ServicesComponent},
  {path: 'services/:id', component:EditServiceComponent},
  {path: 'clients', component:ClientsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes , {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
