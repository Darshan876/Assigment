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

    // this.signupform = this.fb.group(
    //   {
    //     email: new FormControl('', { validators: [Validators.required,Validators.email] }),
    //     password: new FormControl('', {validators: [Validators.required, Validators.minLength(8)]}),
    //     fullName: new FormControl('', { validators: [Validators.required] }),
    //     mobileNo: new FormControl('', {validators: [
    //         Validators.required,
    //         Validators.min(1000000000),
    //         Validators.max(9999999999),
    //       ],
    //     }),
    //     confirmpass: new FormControl('', { validators: [Validators.required] }),
    //   },
    //   { validators: samePass() }
    // );


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
      console.log(this.login);
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
          // if(res.code == 200){
            //   this.route.navigate(['/home'])
            // }
            // localStorage.setItem('form', JSON.stringify(this.store))
            // let data = localStorage.getItem('form')
            // console.log("data = " + data);

            // console.log(data);
            // this.isLogin=true;
            // this.isSignUp=false;
            // console.log(res);
            alert("login successfully..!!")
            this.route.navigateByUrl('/home');

      }, (err : any) => {
          console.log(err);
          alert(err)
      });

  }


  // async signIn(){
  //   if(this.login.invalid){
  //     this.login.markAllAsTouched();
  //     return;
  //     }

  //   await this.auth.btn_signin(this.login.value)
  //   .subscribe(res=>{
  //     console.log(res);
  //     this.route.navigateByUrl('/home');

  //     // res.user.forEach(element => {
  //     //  this.email = element.email
  //     // });

  //   }

  //   ,(err)=>{
  //     // console.log(err);
  //     if(err.error.error=="Invalid Password"){
  //       alert("Invalid Password")
  //     }else if(err.error.error=="Invalid Email"){
  //       alert("Invalid Email");
  //       this.isSignUp=true;
  //       this.isLogin=false;
  //     }
  //     else{
  //       alert("please check your email id this user is not registered");
  //       this.isSignUp=true;
  //       this.isLogin=false;
  //     }


  //   })

  // }

   signin(){
      this.isLogin=true;
      this.isSignUp=false;
   }


  //  signup(){
  //   this.isSignUp=true;
  //   this.isLogin=false;
  //     }
    }


