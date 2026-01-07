import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AccountService } from '../services/account-service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const accountservice=inject(AccountService);
  const user=accountservice.currentuser();

  if(user){
    req=req.clone({
      setHeaders:{
        Authorization: `Bearer ${user.token}`
      }
    })
  }
  return next(req);
};
