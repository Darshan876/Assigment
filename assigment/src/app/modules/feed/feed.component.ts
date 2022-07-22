import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';



@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})

export class FeedComponent implements OnInit {
  post !: FormGroup;
  
  constructor(private auth : AuthService, private route : Router, private fb : FormBuilder) { }

  ngOnInit(): void {
   this.get_post();
}

test : any;
  get_post() {
      this.auth.get_leadership(this.post).subscribe(res => {
          this.test = res.result.result;
          console.log(this.test);
          console.log(res);
      }, (err) => {
          // alert(err)
      })
  }



}
