import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { FeedComponent } from './modules/feed/feed.component';
import { HomeComponent } from './modules/home/home.component';
import { LoginComponent } from './modules/login/login.component';
import { ManageComponent } from './modules/manage/manage.component';
import { RegisterComponent } from './modules/register/register.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {
    path:'login',component:LoginComponent
  },
   {path:'register',component:RegisterComponent},

  {path:'',component:DefaultComponent,
  children:[{
    path:'feed',component:FeedComponent
  },{
    path:'home',component:HomeComponent,
  },{
    path:'manage', component:ManageComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
