import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCallsService } from './service/api-calls.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular';
  constructor(
    private apiCalls: ApiCallsService,
    private router: Router
  ) {

  }
} 
