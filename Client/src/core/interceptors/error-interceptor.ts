import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { ToastService } from '../services/toast-service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toast = inject(ToastService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error) {
        switch (error.status) {
          case 400:
            if(error.error.errors){
              const modelstateErrors=[];
              for(const key in error.error.errors){
                if(error.error.errors[key]){
                  modelstateErrors.push(error.error.errors[key])
                }
              }
              throw modelstateErrors.flat()
            } 
            else{
              toast.error(error.error)
            }
            break;

          case 401:
            toast.error('Unauthorized');
            // router.navigate(['/login']); // optional
            break;

          case 404:
           router.navigateByUrl('/not-found')
            break;

          case 500:
           const navigationExtras:NavigationExtras={state:{error:error.error}}
           router.navigateByUrl('/server-error',navigationExtras)
            break;

          default:
            toast.error('Something went wrong');
            break;
        }
      }

      return throwError(() => error);
    })
  );
};
