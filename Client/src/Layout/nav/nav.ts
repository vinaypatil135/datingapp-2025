import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../core/services/account-service';
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { ToastService } from '../../core/services/toast-service';

@Component({
  selector: 'app-nav',
  imports: [FormsModule, RouterLink,RouterLinkActive],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  protected accountservice = inject(AccountService)
  private router=inject(Router);
  private toast=inject(ToastService);
  protected creads: any = {}

  login() {
    this.accountservice.login(this.creads).subscribe({
      next: result => {
        this.router.navigateByUrl('/members');
        console.log(result);
      },
      error: error => {
       this.toast.error(error.error);

      }
    })
  }

  logout() {
    this.accountservice.logout();
     this.router.navigateByUrl('/');
  }

}
