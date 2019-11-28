import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiCallsService } from '../service/api-calls.service'
import { first } from 'rxjs/operators';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-partner-details',
  templateUrl: './partner-details.component.html',
  styleUrls: ['./partner-details.component.css']
})

export class PartnerDetailsComponent implements OnInit {
  partnerId: String;
  apiUrl: String;
  partnerDetails: Object = {};
  title: String;
  bannerImage: File = null;
  images: any;
  thumbnail: File = null;
  imagesArray: any;
  defaultImg: String;
  deleteImgArr: any = [];

  constructor(
    private apiCall: ApiCallsService,
    private router: Router,
    private route: ActivatedRoute,
    private ngxService: NgxUiLoaderService, ) {
    this.defaultImg = "assets/default-image.png";
  }

  ngOnInit() {
    /*Get value from url params */
    this.partnerId = this.route.params['value'].id;
    if (this.partnerId) {
      this.getPartnerDetails()
    }
  }

  handleFileInput(files: FileList, fileType) {
    switch (fileType) {
      case 'bannerImage':
        this.bannerImage = files.item(0);
        break;
      case "thumbnail":
        this.thumbnail = files.item(0);
        break;
    }
  }

  getPartnerDetails() {
    this.apiUrl = "partners/" + this.partnerId;
    this.apiCall.callGetService(this.apiUrl).pipe(first()).subscribe(
      (response: any) => {
        this.ngxService.stop();
        if (response.success == true) {
          this.imagesArray = response.data.images;
          this.imagesArray = this.imagesArray.map(function (img) {
            let imgObj = {
              isImgDeleted: false,
              image: img
            };
            return imgObj
          });
          delete response.data.images;
          response.data.imagesArr = this.imagesArray
          this.partnerDetails = response.data;
          this.title = response.data.title;
        } else {
          console.log(response.message);
        }
      },
      errors => {
        console.log("errors ", errors);
      });
  }

  deleteImg(img, partnerDetails) {
    /*manage delte images data */
    let delImg = img.split("/uploads/", 2);
    delImg = '/uploads/' + delImg[1];
    this.deleteImgArr.push(delImg);

    /*hide images flag */
    partnerDetails.imagesArr.map(function (el) {
      if (el.image == img) {
        el.isImgDeleted = true;
      }
    });
    this.partnerDetails = partnerDetails;
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

  updatePartner(partnerObj) {
    this.apiUrl = "partners/" + this.partnerId;
    const formData = new FormData();
    formData.append("title", partnerObj.title);
    formData.append("description", partnerObj.description);
    formData.append("bannerImage", this.bannerImage);
    formData.append("thumbnail", this.thumbnail);
    formData.append("deleteImages", this.deleteImgArr.toString());

    /*For uploading multiple images at a time */
    if (this.images) {
      for (let i = 0; i < this.images.length; i++) {
        const img = this.images[i];
        formData.append("images", img);
      }
    }

    this.apiCall.putFormDataToService(this.apiUrl, formData).pipe(first()).subscribe(
      (response: any) => {
        this.ngxService.stop();
        if (response.success == true) {
          this.partnerDetails = response.data;
          alert("Partner details has been updated successfully!");
          this.getPartnerDetails()
          // this.router.navigate(['/partners']);
        } else {
          console.log(response.message);
        }
      },
      errors => {
        console.log("errors ", errors);
      });
  }


}
