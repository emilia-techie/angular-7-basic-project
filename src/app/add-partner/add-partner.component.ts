import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiCallsService } from '../service/api-calls.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { APIs } from '../constant'

@Component({
  selector: 'app-add-partner',
  templateUrl: './add-partner.component.html',
  styleUrls: ['./add-partner.component.css']
})

export class AddPartnerComponent implements OnInit {
  // @Output() myEvent = new EventEmitter();

  addPartnerObj: Object = {};
  defaultImg: any;
  defaultSingleImg: any;
  bannerImage: File = null;
  thumbnail: File = null;
  previewBannerImg: any;
  previewThumbnailImg: any;
  imgURL: any;
  images: any;
  addPartnerForm: FormGroup
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private apiCall: ApiCallsService,
    private ngxService: NgxUiLoaderService,
    private router: Router
  ) {
    this.defaultImg = "assets/default-image.png";
    this.defaultSingleImg = "assets/default-single.png";
  }

  ngOnInit() {
    /*validate form */
    this.addPartnerForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['',
        [Validators.required,
        Validators.minLength(10),
        Validators.maxLength(25),
        Validators.pattern('^(?=.*[a-zA-Z])[a-zA-Z0-9]+$')]],
      bannerImage: ['', [Validators.required]],
      thumbnail: ['', [Validators.required]]
    });
  }

  get ap() { return this.addPartnerForm.controls; }

  handleFileInput(files: FileList, fileType) {
    let reader = new FileReader();
    switch (fileType) {
      case "bannerImage":
        this.bannerImage = files.item(0);
        reader.readAsDataURL(files[0]);
        reader.onload = (_event) => {
          this.previewBannerImg = reader.result;
        }
        break;
      case "thumbnail":
        this.thumbnail = files.item(0);
        reader.readAsDataURL(files[0]);
        reader.onload = (_event) => {
          this.previewThumbnailImg = reader.result;
        }
        break;
    }
  }

  urls = new Array<string>();
  readURL(files: any): void {
    this.images = files;
    this.urls = [];
    if (files) {
      for (let file of files) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.urls.push(e.target.result);
        }
        reader.readAsDataURL(file);
      }
    }
  }

  /*add partner*/
  addPartner() {
    this.submitted = true;
    if (this.addPartnerForm.valid) {
      const formData = new FormData();
      formData.append("title", this.addPartnerForm.value.title);
      formData.append("description", this.addPartnerForm.value.description);
      formData.append("bannerImage", this.bannerImage);
      formData.append("thumbnail", this.thumbnail);

      /*For uploading multiple images at a time */
      if (this.images) {
        for (let i = 0; i < this.images.length; i++) {
          const img = this.images[i];
          formData.append("images", img);
        }
      }
      this.apiCall.postFormDataToService(APIs.addPartner, formData).pipe(first()).subscribe(
        (response: any) => {
          this.ngxService.stop();
          if (response.success == true) {
            alert("Partner has been created successfully!");
            this.router.navigate(['/partners']);
          } else {
            console.log(response.message);
          }
        },
        errors => {
          console.log("errors ", errors);
        });
    }
  }
}
