import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {samePass} from 'src/app/pass-validation';
import {AuthService} from 'src/app/services/auth.service';

@Component({selector: 'app-header', templateUrl: './header.component.html', styleUrls: ['./header.component.scss']})



export class HeaderComponent implements OnInit {

    proreform !: FormGroup;
    formData : any;
    url : any;
    video : any;
    msg = "";
    imagePath : any;
    videopath:any;
    imgattachment:any;
    vidattachment:any;


    constructor(private auth : AuthService, private route : Router, private fb : FormBuilder) {
    }

    ngOnInit(): void {
      this.formData = new FormData();
        this.proreform = this.fb.group({
            description: new FormControl('', [Validators.required]),
            type: new FormControl('', [Validators.required]),
            isVideoURL: new FormControl('', [Validators.required]),
            videoURL: new FormControl('', [Validators.required]),
            nonSubscriberView: new FormControl('', [Validators.required]),
            images: new FormControl('', [Validators.required])
        });


    }

    selectVideo(event : any) {
      let video = event.target.files;
      let videoformData = new FormData();
      console.log("video",video);
      
        if (!video||video.length==0) {
            this.msg = 'You must select an video';
            return;
        } 

        var mimeType = video[0].type;
        if (mimeType.match(/video\/*/) == null) {
            this.msg = "Only Video are supported";
            return;
        }

        var reader = new FileReader();
        reader.readAsDataURL(video[0]);
        reader.onload = (_event) => {
            this.msg = "";
            this.video = reader.result;
        }

        this.formData.delete('isVideoURL')
        this.formData.append('isVideoURL',video[0])

        
        // this.formData.delete('file')
        // this.formData.append('file',video[0])

        this.auth.upload_Image(videoformData).subscribe((res:any) => {
            console.log(res);
            this.vidattachment=res.result.attachmentId
          },(err : any) => {
            console.log(err);
        });

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
            this.url = reader.result;
        }

        imageformdata.delete('images')
        imageformdata.append('images',img[0])


        this.auth.upload_Image(imageformdata).subscribe((res:any) => {
          console.log(res);
          this.imgattachment=res.result.attachmentId
        },(err : any) => {
          console.log(err);
      });

    }


    store : any;
    post() {
        console.log(this.proreform.value);

        let formValue = this.proreform.value;
        Object.keys(formValue).forEach(key=>{
          this.formData.delete(key);
          this.formData.append(key,formValue[key]);
        })
        this.formData.append("img[0]",this.imgattachment);
        this.formData.append("video[0]",this.vidattachment);

        // this.auth.Post_createPost(this.formData.value && this.proreform.value).subscribe((res) => {
        //   if (res.success) {
        //     console.log(res);
        //     let user = res;
        //     localStorage.setItem('Token', JSON.stringify(user.token));
        //     this.route.navigateByUrl('/manage');
        //   } else {
        //     alert('please try again');
        //   }

        // this.formData.append('data',JSON.stringify(formValue))



        this.auth.Post_createPost(this.formData).subscribe((res :{}) => {
            console.log("btn signup called");
            console.log(res);
            this.route.navigate(['/home'])
            alert("Registered successfully..!!")

        }, (err : any) => {
            console.log(err);
           let a= JSON.stringify(this.proreform.getRawValue())
           console.log(a);

            alert(a)
        });
    }

}
