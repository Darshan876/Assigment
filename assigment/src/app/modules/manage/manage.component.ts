import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { AuthService } from 'src/app/services/auth.service';


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
  p:any;

  constructor(private auth: AuthService,private route:Router,private fb: FormBuilder) { }

  ngOnInit(): void {


    this.form = this.fb.group({
      name: new FormControl('', [Validators.required]),
      number: new FormControl('', [Validators.required]),
      cvv: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
    })

    // this.form = this.fb.group({
    //   guid: new FormControl('', [Validators.required]),
    //   muid: new FormControl('', [Validators.required]),
    //   sid: new FormControl('', [Validators.required]),
    //   payment_user_agent: new FormControl('', [Validators.required]),
    //   time_on_page: new FormControl('', [Validators.required]),
    // });

    this.get_profile();
      this.get_post();
  }

  // user_profile(){

  //  this.auth.get_profileData(this.profile).subscribe(res=>{
  //   console.log(res);
  //   console.log("add successful");
  //  },err=>{
  //    alert("something wrong")
  //  })

  // }


  store : any;
  onsubmit() {
      console.log(this.form.value);
      let date = moment(this.form.value['date'])

  //   let obj = {card:
  //   {
  //     name: this.form.value['name'],
  //     number: this.form.value['number'],
  //     cvc: this.form.value['cvv'],
  //     exp_month: date.format('MM'),
  //     exp_year:date.format('YY'),
  //   }
  //   key: 'pk_test_51IUaEtKvww4b0ijcoNgwhZ9lrkyORD4dYLL0mry0nim9bmPnbuPA0mYZuKfMP9OveS9u4uH14awwEOCCopktw8Kw004075CoTi'
  // };
  let obj: any = {}
  obj['key'] = 'pk_test_51IUaEtKvww4b0ijcoNgwhZ9lrkyORD4dYLL0mry0nim9bmPnbuPA0mYZuKfMP9OveS9u4uH14awwEOCCopktw8Kw004075CoTi';
  obj['guid'] = '264ef4c9-a79d-4805-b746-77d88d03eac52ec5e1';
  obj['muid'] = 'bf20a9a4-d6b9-4bcd-8017-d3f2645ea8c52681fb';
  obj['sid'] = 'e9f1c810-a344-4233-a731-6a51785b029b92d235';
  obj['payment_user_agent'] = 'stripe.js/a928bb833;+stripe-js-v3/a928bb833';
  obj['time_on_page'] = '16498';
  obj['card'] = {}

  obj['card']['name'] = this.form.value['name'];
  obj['card']['number'] = this.form.value['number'];
  obj['card']['cvc'] = this.form.value['cvv'];
  obj['card']['exp_month'] = date.format('MM');
  obj['card']['exp_year'] = date.format('YY');

    this.auth.get_cardDetails(obj)
      .subscribe((res : any) => {
        console.log("Res",res,res.id);
        // this.auth.addCardToSystem(res.id).subscribe((data: any)=>{
        //   console.log("cardRes", data);
        // })
      }, (err : any) => {
          console.log(err);
          alert(err)
      });



  }

  test1 : any;
  user:any;
  get_profile() {
      this.auth.get_profileData(this.form).subscribe(res => {
          this.test1 = res;
          console.log(this.test1.id);
          console.log(res);
//           this.test1?.forEach((element:any) => {
//             console.log(element);
// this.user=element?.name;
//            });
      }, (err) => {
          // alert(err)
      })
  }



  // post_cardinfo(){
  //   console.log(this.form.value);

  //   this.auth.get_Addcarddetails(this.form.value).subscribe((res :{}) => {
  //       console.log("btn signup called");
  //       console.log(res);
  //       this.route.navigate(['/home'])
  //       alert("Registered successfully..!!")

  //   }, (err : any) => {
  //       console.log(err);
  //      let a= JSON.stringify(this.form.getRawValue())
  //      console.log(a);

  //       alert(a)
  //   });
  // }


test : any;
  get_post() {
      this.auth.get_cardinfo(this.form).subscribe(res => {
          this.test = res;
          // console.log(this.test);
          // console.log(res);
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


    //   this.auth.upload_Image(imageformdata).subscribe((res:any) => {
    //     console.log(res);
    //     this.imgattachment=res.result.attachmentId
    //   },(err : any) => {
    //     console.log(err);
    // });

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
