import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Logincreds, Registercreds, User} from '../../types/user';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {

  private http = inject(HttpClient);
  baseUrl = 'https://localhost:5001/api/';
  currentuser = signal<User | null>(null);

register(creads:Registercreds){
 return this.http.post<User>(this.baseUrl + 'account/register', creads).pipe(
            tap(user=>{
             if(user){
              this.setCurrentUser(user)
             }
            })
    )
}
  
  login(creads: Logincreds) {
    return this.http.post<User>(this.baseUrl + 'account/login', creads).pipe(
            tap(user=>{
             if(user){
              this.setCurrentUser(user)
             }
            })
    )

    }

    setCurrentUser(user:User){
      localStorage.setItem('user',JSON.stringify(user))
              this.currentuser.set(user)
    }
      logout(){
        localStorage.removeItem('user');
      this.currentuser.set(null);
    }
  }
