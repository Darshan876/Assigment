import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {samePass} from 'src/app/pass-validation';
import {AuthService} from 'src/app/services/auth.service';

@Component({selector: 'app-register', templateUrl: './register.component.html', styleUrls: ['./register.component.scss']})
export class RegisterComponent implements OnInit {

    setprofileform !: FormGroup;
    formData : any;
    // country:any;
    // place:any;

    // isSignUp : boolean = false;
    // isLogin : boolean = true;
    // loginform !: FormGroup;
    // signupform !: FormGroup;
    conf : any;

    constructor(private auth : AuthService, private route : Router, private fb : FormBuilder) {}

    ngOnInit(): void {


        // this.formData = new FormData();
        this.setprofileform = this.fb.group({


            email: new FormControl('', {
                validators: [Validators.required, Validators.email]
            }),
            password: new FormControl('', {
                validators: [Validators.required, Validators.minLength(8)]
            }),
            fullName: new FormControl('', {
                validators: [Validators.required]
            }),
            mobileNo: new FormControl('', {
                validators: [Validators.required, Validators.min(1000000000), Validators.max(9999999999),]
            }),
            confirm_password: new FormControl('', {
                validators: [Validators.required]
            }),
            username: new FormControl('', [Validators.required]),
            name: new FormControl('', [Validators.required]),

            legalName: new FormControl('', [Validators.required]),
            dateOfBirth: new FormControl('', [Validators.required]),
            profileImage: new FormControl('', [Validators.required]),
            coverImage: new FormControl('', [Validators.required]),
            postalCode: new FormControl('', [Validators.required, Validators.min(100000), Validators.max(999999)]),
            referral_code: new FormControl('', [Validators.required]),
            cityId: new FormControl('', [Validators.required]),
            userType: new FormControl('', [Validators.required]),
            state: new FormControl('', [Validators.required]),
            countryId: new FormControl('', [Validators.required]),
            selectedTopics: new FormControl('', [Validators.required]),
            isAccept: new FormControl('', [Validators.required]),
            deviceId: new FormControl('', [Validators.required])
        });
        this.persons.forEach((person) => {
            this.setprofileform.addControl(person, new FormControl('', [Validators.required]));
        });

        this.city();
        this.coutry();

    }

    imagePath : any;
    url:any= '';
  onSelectFile(event:any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (event) => {
        this.url = event.target?.result;
      }
    }
  }

    onFileChanged(event : any) {
        console.log(event.target.files[0])
        this.formData.delete('profileImage')
        this.formData.append('profileImage', event.target.files[0])
        const files = event.target.files;
        if (files.length === 0)
            return;


        const reader = new FileReader();
        this.imagePath = files;
        reader.readAsDataURL(files[0]);
        reader.onload = (_event) => {
            this.url = reader.result;
        };
    }

    educertifile : any;
    trainingfile : any;


    educertificate(event : any) {
        this.educertifile = <File> event.target.files[0];
        this.formData.delete('degreeUpload')
        this.formData.append('degreeUpload', event.target.files[0])
    }

    traningcertificate(event : any) {
        this.trainingfile = <File> event.target.files[0];
        this.formData.delete('certificateUpload')
        this.formData.append('certificateUpload', event.target.files[0])
        console.log(this.trainingfile);
    }

    designations = ['Juniar', 'Intermidiate', 'Senior', 'Lead'];
    persons = ['Welder', 'Fitter', 'Wigger', 'Sactfolder'];
    skillSets : any = {};

    changeSelection(person : any, designation : any, event : any) {
        this.skillSets[person] = designation;
    }

    // submitData() {

    // if(this.setprofileform.invalid){
    //     this.setprofileform.markAllAsTouched();
    //     return;
    //     }

    // let data = this.setprofileform.value;


    // // data.address = {};
    // // data.address['addressLine1'] = this.setprofileform.value.addressLine1;
    // // data.address['addressLine2'] = this.setprofileform.value.addressLine2;

    // // data.address['postalCode'] = this.setprofileform.value.postalCode;

    // // data.address['city'] = this.setprofileform.value.city;

    // // data.address['state'] = this.setprofileform.value.state;
    // // data.address['LGA'] = this.setprofileform.value.LGA;
    // // data.address['country'] = this.setprofileform.value.country;
    // // data.address['DailyWages'] = this.setprofileform.value.DailyWages;

    // // data.skillSetsAndTrade = {};
    // // data.skillSetsAndTrade["skillSets"] = {};
    // // Object.keys(this.skillSets).forEach((key) => {
    // //   data.skillSetsAndTrade["skillSets"][key] = this.skillSets[key];
    // // });

    // // this.formData.append('data',JSON.stringify(data))


    //    this.auth.btn_image(this.setprofileform)
    // .subscribe(res=>{
    //     console.log(res);

    //     this.formData=null;
    //     // console.log(res);
    //     alert("Set profile Successfully!!")
    // },(err)=>{
    //     this.formData=null;
    //     console.log(err)
    //     alert(err.error.message);
    //     // console.log(err);
    // })
    // }

    test : any;
    test1 : any;
    city() {
        this.auth.get_city(this.setprofileform.value).subscribe(res => {
            this.test = res;
        }, (err) => {
            alert(err)
        })
    }

    coutry() {
        this.auth.get_contry(this.setprofileform.value).subscribe(res => {
            console.log("con= ", res);
            this.test1 = res;
        }, (err) => {
            console.log(err);
            alert(err)
        })

    }

    store : any;
    signUp() {
        console.log(this.setprofileform);
        // if(this.signupform){
        // this.signupform.markAllAsTouched();
        // return;
        // }

        this.auth.btn_signup(this.setprofileform.value)
        .subscribe((res : any) => {
            console.log("btn signup called");

            this.store = res;
            console.log(res);
            localStorage.setItem('Token', JSON.stringify(this.store.token));
                    // this.route.navigateByUrl('/home');
            if(res.code == 200){
              this.route.navigate(['/login'])
            }
            // localStorage.setItem('form', JSON.stringify(this.store))
            // let data = localStorage.getItem('form')
            // console.log("data = " + data);

            // console.log(data);
            // this.isLogin=true;
            // this.isSignUp=false;
            // console.log(res);
            alert("Registered successfully..!!")

        }, (err : any) => {
            console.log(err);
            alert(err)
        });

    }
    user:any;
    // signUp() {
    //   if (this.setprofileform) {
    //     this.auth.btn_signup(this.setprofileform.value).subscribe((res) => {
    //       if (res.success) {
    //         console.log(res);
    //         this.user = res;
    //         localStorage.setItem('Token', JSON.stringify(this.user.token));
    //         this.route.navigateByUrl('/home');
    //       } else {
    //         alert('please try again');
    //       }
    //     });
    //   }
    // }

    signImg() {
        // console.log(this.signupform)
        // if(this.signupform.invalid){
        // this.signupform.markAllAsTouched();
        // return;
        // }

        this.auth.btn_image(this.setprofileform.value).subscribe(res => {
            // this.isLogin = true;
            // this.isSignUp = false;
            // console.log(res);
            alert("Registered successfully..!!")

        }, (err) => { // console.log(err);
            alert(err.error.error)
        })

    }

    // signup() {
    //     this.isSignUp = true;
    //     this.isLogin = false;
    // }

    change() {
        this.route.navigateByUrl('/login');

    }
}
