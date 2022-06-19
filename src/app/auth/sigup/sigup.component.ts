import { setLoadingSpinner } from './../../store/shared/shared.actions';
import { signupStart } from './../state/auth.actions';
import { Store } from '@ngrx/store';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-sigup',
  templateUrl: './sigup.component.html',
  styleUrls: ['./sigup.component.css']
})
export class SigupComponent implements OnInit {
  signUpForm!: FormGroup
  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    })
  }

  onSignUpSubmit(){
    if(!this.signUpForm.valid){return}

    const email = this.signUpForm.value.email
    const password = this.signUpForm.value.password
    this.store.dispatch(setLoadingSpinner({status:true}))
    this.store.dispatch(signupStart({email, password}))
  }

}
