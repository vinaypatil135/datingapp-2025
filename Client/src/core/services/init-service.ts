import { inject, Injectable } from '@angular/core';
import { AccountService } from './account-service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InitService {
  private accountservice=inject(AccountService);

  init(){
      const userString=localStorage.getItem('user');
    if(!userString) return of(null);
    const user=JSON.parse(userString);
    this.accountservice.currentuser.set(user);

    return of(null)
  }
}
