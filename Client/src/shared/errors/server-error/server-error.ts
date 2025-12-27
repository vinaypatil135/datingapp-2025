import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Apierror } from '../../../types/error';

@Component({
  selector: 'app-server-error',
  imports: [],
  templateUrl: './server-error.html',
  styleUrl: './server-error.css',
})
export class ServerError {
  protected error:Apierror;
 private router=inject(Router);
 protected showdetails=false;

  constructor(){
   const navigation=this.router.currentNavigation();
   this.error=navigation?.extras?.state?.['error']
  }
  detailsToggel(){
    this.showdetails=!this.showdetails;
  }
}
