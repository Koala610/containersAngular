import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppDetailComponent } from './app-detail/app-detail.component';
import { AppMainComponent } from './app-main/app-main.component';

const routes: Routes = [ 
  {path: '', component: AppMainComponent},
  {path: ':id', component: AppDetailComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
