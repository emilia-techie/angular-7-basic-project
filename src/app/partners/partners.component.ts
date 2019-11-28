import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiCallsService } from '../service/api-calls.service'
import { first } from 'rxjs/operators';

// export interface PeriodicElement {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
// }

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.css']
})
export class PartnersComponent implements OnInit {
  @Output() myEvent = new EventEmitter();

  apiUrl: String;
  dataSource: any;
  displayedColumns: string[] = ['adminId', 'title', 'description', 'isActive', 'createdAt', 'thumbnail', 'bannerImage', 'edit', 'delete'];
  constructor(
    private ngxService: NgxUiLoaderService,
    private apiCall: ApiCallsService,
    private router: Router
  ) { }
  //@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  ngOnInit() {
    this.getAllPartners()
    //this.dataSource.paginator = this.paginator;
  }

  getAllPartners() {
    this.ngxService.start();
    this.apiUrl = "partners/";
    this.apiCall.callGetService(this.apiUrl).pipe(first()).subscribe(
      (response: any) => {
        console.log("response ", response);
        this.ngxService.stop();
        if (response.success == true) {
          this.dataSource = response.data;
          this.myEvent.emit(response.data)
        } else {
          console.log(response.message);
        }
      },
      errors => {
        console.log("errors ", errors);
      }
    );
  }

  /*partner details */
  partnerDetails(partnerId) {
    this.router.navigate(['/partner-details/' + partnerId]);
  }

  /*delete details */
  deletePartner(partnerId) {
    console.log("delete Partner ", partnerId);
    this.apiUrl = "partners/" + partnerId;
    this.apiCall.callDeleteService(this.apiUrl).pipe(first()).subscribe(
      (response: any) => {
        this.ngxService.stop();
        if (response.success == true) {
          this.partnerDetails = response.data;
          alert("Partner details has been deleted successfully!");
          this.getAllPartners();
        } else {
          console.log(response.message);
        }
      },
      errors => {
        console.log("errors ", errors);
      });
  }

}
