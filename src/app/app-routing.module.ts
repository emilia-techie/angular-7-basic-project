import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../app/login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './guard/auth.guard';
import { PartnersComponent } from './partners/partners.component';
import { AddPartnerComponent } from './add-partner/add-partner.component';
import { PartnerDetailsComponent } from './partner-details/partner-details.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard], pathMatch: "full" },
  { path: 'partners', component: PartnersComponent, canActivate: [AuthGuard], pathMatch: "full" },
  { path: 'add-partner', component: AddPartnerComponent, canActivate: [AuthGuard], pathMatch: "full" },
  { path: 'partner-details/:id', component: PartnerDetailsComponent, canActivate: [AuthGuard], pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
