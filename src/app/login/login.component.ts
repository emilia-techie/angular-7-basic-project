import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiCallsService } from '../service/api-calls.service';
import { first } from 'rxjs/operators';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  forgotPassForm: FormGroup;
  resetPassForm: FormGroup;
  hide = true;
  hideNewPass = true;
  hideConfirmPass = true;
  apiUrl: String;

  constructor(
    private formBuilder: FormBuilder,
    private apiCall: ApiCallsService,
    private ngxService: NgxUiLoaderService,
    private router: Router
  ) { }

  ngOnInit() {

    if (this.apiCall.isUserLoggedIn()) {
      this.router.navigate(['/home']);
    }

    /*For login form */
    this.loginForm = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{6,}')
      ]]
    });

    /*For forgot password form */
    this.forgotPassForm = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.email]]
    })

    /*For reset password form */
    this.resetPassForm = this.formBuilder.group({
      otp: ['', [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.maxLength(4),
      ]],
      newPassword: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{6,}')
      ]],
      confirmPassword: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{6,}')
      ]],
    })
  }

  /* convenience getter for easy access to form fields*/
  get l() { return this.loginForm.controls; }
  get fp() { return this.forgotPassForm.controls; }
  get rp() { return this.resetPassForm.controls; }

  loginFn() {
    /*stop here if form is invalid*/
    if (this.loginForm.invalid) {
      return;
    }
    this.ngxService.start();
    this.apiUrl = "admin/login";
    this.apiCall.callPostService(this.apiUrl, this.loginForm.value).pipe(first()).subscribe(
      (response: any) => {
        this.ngxService.stop();
        if (response.success == true) {
          localStorage.setItem('isUserLoggedIn', "true");
          localStorage.setItem('token', response.data.loginSessionKey);
          this.router.navigate(['/home']);
        } else {
          alert(response.message);
        }
      },
      errors => {
        console.log("errors ", errors);
      }
    );
  }

  forgotPassFn() {
  }

  resetPassFn() {
  }

}
