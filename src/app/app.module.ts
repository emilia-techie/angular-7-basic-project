import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {
  MatTabsModule, MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatMenuModule,
  MatToolbarModule,
  MatCardModule,
  MatSidenavModule,
  MatListModule,
  MatTableModule,
  MatPaginatorModule,
  MatTableDataSource,
  MatPaginator
} from '@angular/material';
import { LoginComponent } from './login/login.component';
import { PartnersComponent } from './partners/partners.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { MyNavComponent } from './my-nav/my-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { PartnerDetailsComponent } from './partner-details/partner-details.component';
import { AddPartnerComponent } from './add-partner/add-partner.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PartnersComponent,
    HomeComponent,
    HeaderComponent,
    MyNavComponent,
    PartnerDetailsComponent,
    AddPartnerComponent,
    //  MatTableDataSource
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    MatCardModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxUiLoaderModule,
    LayoutModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    NgbModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
