import { HttpClient} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Member, Photo } from '../../types/member';

@Injectable({
  providedIn: 'root',
})
export class MemeberService {
   private http=inject(HttpClient);
  //  private accountservice=inject(AccountService);
   private baseUrl=environment.apiUrl;

   getMembers(){
    return this.http.get<Member[]>(this.baseUrl+'members'); //,this.getHttpOptions()
   }

   getMember(id:string){
     return this.http.get<Member>(this.baseUrl+'members/'+id);// this.getHttpOptions()
   }

   getMemberPhotos(id:string){
    return this.http.get<Photo[]>(this.baseUrl+'members/'+ id+'/photos');
   }

  //  private getHttpOptions(){
  //   return{
  //     headers:new HttpHeaders({
  //       Authorization:'Bearer '+this.accountservice.currentuser()?.token
  //     })
  //   }
  
}

