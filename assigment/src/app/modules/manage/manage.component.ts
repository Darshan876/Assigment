import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { AuthService } from 'src/app/services/auth.service';
// import { URLSearchParams } from 'url';


@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  card:boolean = true;
  info:boolean=false;
  soon:boolean=false;

  url1 : any;
  url2:any;
  url3:any;
  url4:any;
  msg = "";
  form!: FormGroup;
  profileform!:FormGroup
  p:any;

  constructor(private auth: AuthService,private route:Router,private fb: FormBuilder) { }

  ngOnInit(): void {


    this.form = this.fb.group({
      name: new FormControl('', [Validators.required]),
      number: new FormControl('', [Validators.required]),
      cvv: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
    })

    this.profileform = this.fb.group({
      name:new FormControl('', [Validators.required]),
      email:new FormControl('', [Validators.required]),
      username:new FormControl('', [Validators.required]),
      city:new FormControl('', [Validators.required]),
      country:new FormControl('', [Validators.required]),
      shortBio:new FormControl('', [Validators.required]),
      dob:new FormControl('', [Validators.required])
    })
    this.get_profile();
      this.get_post();
  }


  store : any;
  onsubmit() {
      console.log(this.form.value);
      let date = moment(this.form.value['date'])
      alert("card upload successfully")
  let body = new URLSearchParams()
    body.set("key", "pk_test_51IUaEtKvww4b0ijcoNgwhZ9lrkyORD4dYLL0mry0nim9bmPnbuPA0mYZuKfMP9OveS9u4uH14awwEOCCopktw8Kw004075CoTi")
    body.set("guid", "264ef4c9-a79d-4805-b746-77d88d03eac52ec5e1")
    body.set('muid', 'bf20a9a4-d6b9-4bcd-8017-d3f2645ea8c52681fb')
    body.set('sid','e9f1c810-a344-4233-a731-6a51785b029b92d235')
    body.set('payment_user_agent','stripe.js/a928bb833;+stripe-js-v3/a928bb833')
    body.set('time_on_page','16498')
    body.set('card[name]', `${this.form.value.name}`)
    body.set('card[number]', `${this.form.value.number}`)
    body.set('card[cvc]', `${this.form.value.cvv}`)
    body.set('card[exp_month]', `${date.format('MM')}`)
    body.set('card[exp_year]', `${date.format('YY')}`)


    console.log(body);
    this.auth.get_cardDetails(body)
      .subscribe((res : any) => {
        console.log("Res",res,res.id);
      }, (err : any) => {
          console.log(err);
          alert(err)
      });

      // this.auth.get_cardToken(body)
      // .subscribe((res : any) => {
      //   console.log("Res",res,res.id);
      // }, (err : any) => {
      //     console.log(err);
      //     alert(err)
      // });
  }

  test1 : any;
  user:any;
  get_profile() {
      this.auth.get_profileData(this.form).subscribe(res => {
          this.test1 = res;
          console.log(this.test1.ID);
          console.log(res);
          this.profileform.controls['name'].setValue(this.test1.name);
          this.profileform.controls['email'].setValue(this.test1.email);
          this.profileform.controls['username'].setValue(this.test1.username);
          this.profileform.controls['city'].setValue(this.test1.city);
          this.profileform.controls['country'].setValue(this.test1.country);
          this.profileform.controls['dob'].setValue(this.test1.dob);
          this.profileform.controls['shortBio'].setValue(this.test1.shortBio);
      })
  }

onUpdate(){
  console.log(
    this.profileform.value
  );
  alert("successfully save")

}


test : any;
  get_post() {
      this.auth.get_cardinfo(this.form).subscribe(res => {
          this.test = res;
      }, (err) => {
          // alert(err)
      })
  }


  selectImage(event : any) {

    let img = event.target.files;
    let imageformdata = new FormData();
    console.log("img",img);
      if (!img|| img.length == 0) {
          this.msg = 'You must select an image';
          return;
      }
      var mimeType = img[0].type;
      console.log("mime",mimeType);

      if (mimeType.match(/image\/*/) == null) {
          this.msg = "Only images are supported";
          return;
      }
      var reader = new FileReader();
      reader.readAsDataURL(img[0]);
      reader.onload = (_event) => {
          this.msg = "";
          this.url1 = reader.result;
          this.url2=reader.result;
          this.url3=reader.result;
          this.url4=reader.result;
      }
      imageformdata.delete('images')
      imageformdata.append('images',img[0])
  }

  myCard(){
    this.card=true;
    this.info=false;
    this.soon=false;
  }

  myInfo(){
    this.info=true;
    this.card=false;
    this.soon=false;
    }

    Comingsoon(){
      this.info=false;
      this.card=false;
      this.soon=true;
    }

}
