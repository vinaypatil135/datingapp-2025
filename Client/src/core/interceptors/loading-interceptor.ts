import { HttpEvent, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { BusyService } from '../services/busy-service';
import { delay, finalize, of, tap } from 'rxjs';

const cache=new Map<string,HttpEvent<unknown>>();

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const busyServie=inject(BusyService);
  if(req.method==="GET"){
    const cachedResponce=cache.get(req.url);
    if(cachedResponce){
      return of(cachedResponce);
    }
  }
  busyServie.busy();
  return next(req).pipe(
    delay(500),
    tap(responce =>{
      cache.set(req.url,responce)
    }),
    finalize(() => {
      busyServie.idle()
    })
  );
};
