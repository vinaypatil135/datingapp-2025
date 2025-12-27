import { Component, Inject, inject, input, output } from '@angular/core';
import { Registercreds, User } from '../../../types/user';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../../core/services/account-service';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private accountservice=inject(AccountService);
//  memberFromHome=input.required<User[]>();
  cancelRegister=output<boolean>();

 protected creads={} as Registercreds

 register(){
  this.accountservice.register(this.creads).subscribe({
    next:Response=>{
      console.log(Response);
      this.cancel();
    },
    error:error =>console.log(error)
  })
 }
 cancel(){
 this.cancelRegister.emit(false);
 }
}
