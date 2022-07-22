import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  post !: FormGroup;
  activePage:number = 0;
  p:any = 1
  displayActivePage(activePageNumber:number){
    this.activePage = activePageNumber
  }

  constructor(private auth : AuthService, private route : Router, private fb : FormBuilder) { }

  ngOnInit(): void {

    this.post = this.fb.group({
      description: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      isVideoURL: new FormControl('', [Validators.required]),
      videoURL: new FormControl('', [Validators.required]),
      nonSubscriberView: new FormControl('', [Validators.required]),
      images: new FormControl('', [Validators.required]),
      limits: new FormControl('', [Validators.required])
    });
  this.get_post();
  }



name:any;
  test : any;
  test1 : any;

  get_post() {
      this.auth.create_post(this.p).subscribe(res => {
          this.test = res.result.result;
          console.log(this.test);
          console.log(res.result.result);

      })
  }

}
