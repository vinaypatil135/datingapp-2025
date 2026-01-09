import { HttpClient} from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { EditableMember, Member, Photo } from '../../types/member';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MemeberService {
   private http=inject(HttpClient);
  //  private accountservice=inject(AccountService);
   private baseUrl=environment.apiUrl;
   editMode=signal(false);
   member=signal<Member|null>(null);

   getMembers(){
    return this.http.get<Member[]>(this.baseUrl+'members'); //,this.getHttpOptions()
   }

   getMember(id:string){
     return this.http.get<Member>(this.baseUrl+'members/'+id).pipe(
      tap(member => {
        this.member.set(member);
      })
     )
     ;// this.getHttpOptions()
   }

   getMemberPhotos(id:string){
    return this.http.get<Photo[]>(this.baseUrl+'members/'+ id+'/photos');
   }
   updateMemeber(member:EditableMember){
    return this.http.put(this.baseUrl+'members',member);
   }

  //  private getHttpOptions(){
  //   return{
  //     headers:new HttpHeaders({
  //       Authorization:'Bearer '+this.accountservice.currentuser()?.token
  //     })
  //   }
  
}

