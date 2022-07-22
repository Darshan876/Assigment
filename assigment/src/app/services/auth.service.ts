import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
set_profile(formData: any) {
    throw new Error('Method not implemented.');
  }

  constructor(private http :HttpClient) {}

 btn_signup(data:any){

  let headersObj = {
    "Accept": "application/json",
    "Accept-Language": "en-US,en;q=0.9",
    "Connection": "keep-alive",
    "Content-Type": "application/json",
    // "Access-Control-Allow-Origin":"*",
    "Origin":"https://pwa.dev.starclusive.com",
    "Referer": "https://pwa.dev.starclusive.com/",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-site",
    "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36",
    // "authorization": "Bearer " + localStorage.getItem('token'),
    "sec-ch-ua": "\".Not/A)Brand\";v=\"99\", \"Google Chrome\";v=\"103\", \"Chromium\";v=\"103\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Linux\"",
    // "timeout": "3600000"
}
let headers=new HttpHeaders(headersObj);
    return this.http.post<any>('https://api.dev.starclusive.com/api/user/sign-up',data, {headers}).pipe(map((res:any)=>{
      console.log(res);
      return res;
    }));
  }




  btn_signin(data:any){
//     let headersObj1 = {
//       // "Access-Control-Allow-Origin": "*",
// "Access-Control-Allow-Headers":"Origin, X-Requested-With, Content-Type, Accept,Access-Control-Allow-Headers, Authorization, multipart/form-data",
// "Access-Control-Request-Headers":"*",
// "Vary":"X-HTTP-Method-Override, Accept-Encoding"

//     }

//     let headers=new HttpHeaders(headersObj1);
//     console.log("sign",headers);

    return this.http.post<any>('https://api.dev.starclusive.com/api/user/sign-in',data).pipe(map((res:any)=>{
      console.log(res);
      return res;
    }));
  }




  btn_image(data:any){
    return this.http.post<any>('https://api.dev.starclusive.com/api/user/updateProfileImage',data);

  }

  get_city(data:any){
    return this.http.get<any>('https://api.dev.starclusive.com/api/countries/city_list/'+data+'/all');
  }

  get_contry(){
    return this.http.get<any>('https://api.dev.starclusive.com/api//countries/country_list/all');
  }



  public create_post(data:any){

    const headers: HttpHeaders = new HttpHeaders({
      'authorization':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mzk5LCJpYXQiOjE2NTU4OTE5ODR9.mDUQPLnzb-71t-HxN_CfvLoqnZBof5ctIElDi7fFOwo'
    });


    return this.http.get<any>(`https://api.dev.starclusive.com/api/feed/newsFeed`,{headers}).pipe(map((res:any)=>{
      console.log(res);
      return res;
    }))
   }


public upload_Image(data:any){
  let headersObj = {
    // "Accept": "application/json, text/plain, */*",
    // "Accept-Language": "en-US,en;q=0.9",
    // "Connection": "keep-alive",
    // "Content-Type": "multipart/form-data; boundary=----WebKitFormBoundarymtsZA6nRJBj3yWYu",
    // "Access-Control-Allow-Origin":"*",
    // "Origin":"https://pwa.dev.starclusive.com",
    // "Origin": "https",
    // "Referer": "https",
    // "Sec-Fetch-Dest": "empty",
    // "Sec-Fetch-Mode": "cors",
    // "Sec-Fetch-Site": "same-site",
    // "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36",
    "authorization": "Bearer " + localStorage.getItem('token'),
    // "sec-ch-ua": "\".Not/A)Brand\";v=\"99\", \"Google Chrome\";v=\"103\", \"Chromium\";v=\"103\"",
    // "sec-ch-ua-mobile": "?0",
    // "sec-ch-ua-platform": "\"Linux\"",
    // "timeout": "3600000"
}
  let headers=new HttpHeaders(headersObj);
  console.log(data);
  return this.http.post<any>('https://api.dev.starclusive.com/api/media/upload',data,{headers});
}



  // public uploadImage(image: File): Observable<Response> {
  //   const formData = new FormData();

  //   formData.append('image', image);

  //   // return this.http.post('/api/v1/image-upload', formData);
  // }



  public Post_createPost(data:any):Observable<any>{
    // const headers: HttpHeaders = new HttpHeaders({
    //   'description': 'Create post',
    //   'type':'normal',
    //   'isVideoURL':'0',
    //   'videoURL':'',
    //   'nonSubscriberView':'0',
    //   'images[0]':'3887'

    // });
    let headersObj = {
      "Accept": "application/json, text/plain, */*",
      "Accept-Language": "en-US,en;q=0.9",
      // "Connection": "keep-alive",
      // "Content-Type": "multipart/form-data; boundary=----WebKitFormBoundarymtsZA6nRJBj3yWYu",
      // "Access-Control-Allow-Origin":"*",
      // "Origin":"https://pwa.dev.starclusive.com",
      // "Origin": "https",
      // "Referer": "https",
      // "Sec-Fetch-Dest": "empty",
      // "Sec-Fetch-Mode": "cors",
      // "Sec-Fetch-Site": "same-site",
      // "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36",
      "authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mzk5LCJpYXQiOjE2NTU4OTE5ODR9.mDUQPLnzb-71t-HxN_CfvLoqnZBof5ctIElDi7fFOwo",
    // "authorization": "Bearer " + localStorage.getItem('token'),

      // "sec-ch-ua": "\".Not/A)Brand\";v=\"99\", \"Google Chrome\";v=\"103\", \"Chromium\";v=\"103\"",
      // "sec-ch-ua-mobile": "?0",
      // "sec-ch-ua-platform": "\"Linux\"",
      "timeout": "3600000"
  }
    let headers=new HttpHeaders(headersObj);


    console.log(headers,'xyuz')

    // headers.append('authorization','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mzk5LCJpYXQiOjE2NTU4OTE5ODR9.mDUQPLnzb-71t-HxN_CfvLoqnZBof5ctIElDi7fFOwo');

    return this.http.post<any>('https://api.dev.starclusive.com/api/post',data,{headers});

  }


  get_leadership(data:any){

    const headers: HttpHeaders = new HttpHeaders({
      'authorization':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mzk5LCJpYXQiOjE2NTU4OTE5ODR9.mDUQPLnzb-71t-HxN_CfvLoqnZBof5ctIElDi7fFOwo'
    });

    return this.http.get<any>('https://api.dev.starclusive.com/api/leadershipBoard?page=1&limit=3',{headers});
  }


  get_cardinfo(data:any){

    // const headers: HttpHeaders = new HttpHeaders({
    //   'authorization':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mzk5LCJpYXQiOjE2NTU4OTE5ODR9.mDUQPLnzb-71t-HxN_CfvLoqnZBof5ctIElDi7fFOwo'
    // });

    const headers: HttpHeaders = new HttpHeaders({
      'authorization':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mzk5LCJpYXQiOjE2NTU4OTE5ODR9.mDUQPLnzb-71t-HxN_CfvLoqnZBof5ctIElDi7fFOwo'
    });

    return this.http.get<any>('https://api.dev.starclusive.com/api/card',{headers}).pipe(map((res:any)=>{
      return res;
    }));
  }


  get_Addcarddetails(data:any){

    let headers=new HttpHeaders();


    console.log(headers,'xyuz')

    // headers.append('key','pk_test_51IUaEtKvww4b0ijcoNgwhZ9lrkyORD4dYLL0mry0nim9bmPnbuPA0mYZuKfMP9OveS9u4uH14awwEOCCopktw8Kw004075CoTi');

    return this.http.post<any>('https://api.stripe.com/v1/tokens',data,{headers});

  }


get_cardToken(data:any){
  return this.http.post<any>('https://api.dev.starclusive.com/api/card',data);
}




get_cardDetails(data:any){
  let headersObj = {
    "authority": "api.stripe.com",
    "accept": "application/json",
    "accept-language": "en-US,en;q=0.9",
    "content-Type": "application/x-www-form-urlencoded",
    // 'authorization':"Bearer " + localStorage.getItem('token'),
    // "origin":"https://js.stripe.com",
    // "referer": "https://js.stripe.com/",
    // "sec-ch-ua": '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103""',
    // "sec-ch-ua-mobile": "?0",
    // "sec-ch-ua-platform": "Linux",
    // "sec-fetch-dest": "empty",
    // "sec-fetch-mode": "cors",
    // "sec-fetch-site": "same-site",
    // "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36"
}
  let headers=new HttpHeaders(headersObj);
  return this.http.post<any>('https://api.stripe.com/v1/tokens',data, {headers});
}

addCardToSystem(cardToken: any){
  let headersObj = {
    "Accept": "application/json, text/plain, */*",
    "Accept-Language": "en-US,en;q=0.9",
    "Connection": "keep-alive",
    "Content-Type": "application/json",
    "Origin":"https://pwa.dev.starclusive.com",
    "Referer":"https://pwa.dev.starclusive.com/",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-site",
    "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36",
    "authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mzk5LCJpYXQiOjE2NTU4OTE5ODR9.mDUQPLnzb-71t-HxN_CfvLoqnZBof5ctIElDi7fFOwo",
    "sec-ch-ua": '"".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103""',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '""Linux""',
}
  let headers=new HttpHeaders(headersObj);
  return this.http.post<any>('https://api.dev.starclusive.com/api/card',cardToken,{headers});
}



get_profileData(data:any){

  const headers: HttpHeaders = new HttpHeaders({
    'authorization':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mzk5LCJpYXQiOjE2NTU5ODQ4MTV9.JWd_8ENuoe5zbB9sa1X6t-KfMfOpaPqgnfL5P8dt8to'
  });
  return this.http.get<any>('https://api.dev.starclusive.com/api/user/',{headers}).pipe(map((res:any)=>{
    return res;
  }));
}
}
