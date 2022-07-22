import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { samePass } from 'src/app/pass-validation';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isSignUp:boolean = false;
  isLogin:boolean = true;
  login!:FormGroup;
  signupform!:FormGroup;

  conf:any;
  email:any;

  constructor(private auth: AuthService,private route:Router,private fb: FormBuilder) { }


  ngOnInit(): void {
    this.login = new FormGroup({
      email:new FormControl('',[Validators.required, Validators.email]),
      password:new FormControl('',[Validators.required,Validators.minLength(8)]),
      deviceId: new FormControl('', [Validators.required])
    })

  }

   change(){
    this.route.navigateByUrl('/register');

    }
    store:any;
    signIn() {
      console.log(this.login.value);
      // if(this.signupform){
      // this.signupform.markAllAsTouched();
      // return;
      // }
      this.auth.btn_signin(this.login.value)
      .subscribe((res : any) => {
          console.log("btn sigin called");

          this.store = res;
          console.log(res);
          localStorage.setItem('Token', JSON.stringify(this.store.token));
            alert("login successfully..!!")
            this.route.navigateByUrl('/home');

      }, (err : any) => {
          console.log(err);
          alert(err)
      });

  }


    }


