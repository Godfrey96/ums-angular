import { Component, OnInit, } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm!: FormGroup;
  isSubmitted = false;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this._initSignupForm();
  }

  private _initSignupForm() {
    this.signUpForm = this.fb.group({
      username: ['', Validators.required],
      phoneNo: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    this.isSubmitted = true;

    const user: User = {
      username: this.signUpFormError['username'].value,
      phoneNo: this.signUpFormError['phoneNo'].value,
      email: this.signUpFormError['email'].value,
      password: this.signUpFormError['password'].value,
    }

    console.log("New user: ", user);
  }


  // errors
  get signUpFormError() {
    return this.signUpForm.controls;
  }

}
