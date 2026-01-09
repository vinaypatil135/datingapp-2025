import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../core/services/account-service';
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { ToastService } from '../../core/services/toast-service';
import { themes } from '../layout';
import { BusyService } from '../../core/services/busy-service';

@Component({
  selector: 'app-nav',
  imports: [FormsModule, RouterLink,RouterLinkActive],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav implements OnInit {

  protected accountservice = inject(AccountService)
  private router=inject(Router);
  private toast=inject(ToastService);
  protected creads: any = {}
  protected selectedTheme = signal<string>(localStorage.getItem('theme') || 'light');
  protected themes = themes;
   protected busyService=inject(BusyService);
  ngOnInit(): void {
    document.documentElement.setAttribute('data-theme', this.selectedTheme());
  }

  handleSelectTheme(theme: string) {
    this.selectedTheme.set(theme);
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    const elem = document.activeElement as HTMLDivElement;
    if (elem) elem.blur();
  }

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
