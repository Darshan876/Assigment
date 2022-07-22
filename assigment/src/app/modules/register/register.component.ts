import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {samePass} from 'src/app/pass-validation';
import {AuthService} from 'src/app/services/auth.service';

@Component({selector: 'app-register', templateUrl: './register.component.html', styleUrls: ['./register.component.scss']})
export class RegisterComponent implements OnInit {

    setprofileform !: FormGroup;
    formData! : FormData
    formData1! : FormData
    conf : any;

    constructor(private auth : AuthService, private route : Router, private fb : FormBuilder) {}

    ngOnInit(): void {
        this.setprofileform = this.fb.group({
            email: new FormControl('', {
                validators: [Validators.required, Validators.email]
            }),
            password: new FormControl('', {
                validators: [Validators.required, Validators.minLength(8)]
            }),
            confirm_password: new FormControl('', {
                validators: [Validators.required]
            }),
            username: new FormControl('', [Validators.required]),
            name: new FormControl('', [Validators.required]),
            legalName: new FormControl('', [Validators.required]),
            dateOfBirth: new FormControl('', [Validators.required]),
            referral_code: new FormControl('', [Validators.required]),
            cityId: new FormControl('', [Validators.required]),
            userType: new FormControl('performer', [Validators.required]),
            countryId: new FormControl('', [Validators.required]),
            selectedTopics: new FormControl('3,4,5', [Validators.required]),
            isAccept: new FormControl('true', [Validators.required]),
        });

        this.coutry();
    }

    imagePath : any;
    url:any= '';
  onSelectFile(event:any) {
    // if (event.target.files && event.target.files[0]) {
    //   var reader = new FileReader();

    //   reader.readAsDataURL(event.target.files[0]);

    //   reader.onload = (event) => {
    //     this.url = event.target?.result;
    //   }
    // }
    console.log(event.target.files[0])

        let formData = new FormData();
        formData.delete('file')
        formData.append('file', event.target.files[0])
        const files = event.target.files;
        if (files.length === 0)
            return;
        const reader = new FileReader();
        this.imagePath = files;
        reader.readAsDataURL(files[0]);
        reader.onload = (_event) => {
            this.url = reader.result;
        };
        this.auth.upload_Image(formData).subscribe((res:any) => {
          console.log();

          console.log(res);
          this.profileimgattachment=res.result.attachmentId
        })
  }
  profileimgattachment!:any
    onFileChanged(event : any) {
        console.log(event.target.files[0])
        let formData = new FormData();
        formData.delete('file')
        formData.append('file', event.target.files[0])
        const files = event.target.files;
        if (files.length === 0)
        return;
        const reader = new FileReader();
        this.imagePath = files;
        reader.readAsDataURL(files[0]);
        reader.onload = (_event) => {
            this.url = reader.result;
        };
        this.auth.upload_Image(formData).subscribe((res:any) => {
          console.log();

          console.log(res);
          this.docattachment=res.result.attachmentId
        })
      }

    educertifile : any;
    trainingfile : any;
    docattachment:any
    document(event : any) {
        this.educertifile = <File> event.target.files[0];
        this.formData1.delete('file')
        this.formData1.append('file', event.target.files[0])
        const files = event.target.files;
        if (files.length === 0)
        return;
        const reader = new FileReader();
        this.imagePath = files;
        reader.readAsDataURL(files[0]);
        reader.onload = (_event) => {
            this.url = reader.result;
        };
        this.auth.upload_Image(this.formData1).subscribe((res:any) => {
          console.log();

          console.log(res);
          this.docattachment=res.result.attachmentId
        })
    }
    countryData:any=[];
    cityData:any =[]
    city(e:any) {
      console.log(e)
        this.auth.get_city(e.target.value).subscribe(res => {
          console.log(res,'for city')
            this.cityData = res;
        }, (err) => {
            alert(err)
        })
    }

    coutry() {
        this.auth.get_contry().subscribe(res => {
            console.log("fff ", res);
            this.countryData = res;
        }, (err) => {
            console.log(err);
            alert(err)
        })
    }

    store : any;
    signUp() {
        // console.log(this.setprofileform);
        let a=this.setprofileform.value;
        a.docattachment = this.docattachment
        a.profileimgattachment = this.profileimgattachment
        // if(this.setprofileform){
        // this.setprofileform.markAllAsTouched();
        // return;
        // }
        this.auth.btn_signup(a)
        .subscribe((res : any) => {
            console.log("btn signup called");
            this.store = res;
            console.log(res);
            localStorage.setItem('Token', JSON.stringify(this.store.token));
            if(res.code == 200){
              this.route.navigate(['/login'])
            }
            alert("Registered successfully..!!")
        }

        );
    }
    user:any;
    signImg() {
        this.auth.btn_image(this.setprofileform.value).subscribe(res => {
            alert("Registered successfully..!!")
        }, (err) => { // console.log(err);
            alert(err.error.error)
        })
    }

    change() {
        this.route.navigateByUrl('/login');
    }
}
