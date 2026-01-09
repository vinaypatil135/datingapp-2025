import { Component, HostListener, inject, OnDestroy, OnInit, signal, ViewChild, viewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EditableMember, Member } from '../../../types/member';
import { DatePipe } from '@angular/common';
import { MemeberService } from '../../../core/services/memeber-service';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastService } from '../../../core/services/toast-service';
import { AccountService } from '../../../core/services/account-service';

@Component({
  selector: 'app-member-profile',
  imports: [DatePipe,FormsModule],
  templateUrl: './member-profile.html',
  styleUrl: './member-profile.css'
})
export class MemberProfile implements OnInit,OnDestroy {

  private toast=inject(ToastService);
  private route = inject(ActivatedRoute);
  protected memberService=inject(MemeberService);
  // protected member = signal<Member | undefined>(undefined);
    @ViewChild('editForm') editForm ?: NgForm;
    @HostListener('window:beforeunload', ['$event'])
     notify(event: BeforeUnloadEvent) {
  if (this.editForm?.dirty) {
    event.preventDefault();
  }
};
  private accountService=inject(AccountService);

  protected editableMember:EditableMember ={
    displayName:'',
    description:'',
    city:'',
    country:''
  };
   
  ngOnInit(): void {
    // this.route.parent?.data.subscribe(data => {
    //   this.member.set(data['member']);
    // })
      
    //  this.editableMember={
    //   displayName:this.member()?.displayName || '',
    //   description:this.member()?.description || '',
    //   city:this.member()?.city || '',
    //   country:this.member()?.country || '',
    // }
      this.editableMember={
      displayName:this.memberService.member()?.displayName || '',
      description:this.memberService.member()?.description || '',
      city:this.memberService.member()?.city || '',
      country:this.memberService.member()?.country || '',
    }

  }

   updateProfile(){
    if(!this.memberService.member()) return;
    const updatedMember={...this.memberService.member(),...this.editableMember}
    // console.log(updatedMember);
    this.memberService.updateMemeber(this.editableMember).subscribe({
      next: ()=>{
        const currentUser=this.accountService.currentuser();
        if(currentUser && updatedMember.displayName !== currentUser.displayName){
          currentUser.displayName=updatedMember.displayName;
          this.accountService.setCurrentUser(currentUser);
        }
         this.toast.success('profile updated sucessfully');
        this.memberService.editMode.set(false);
        this.memberService.member.set(updatedMember as Member);
        this.editForm?.reset(updatedMember);
      }
    })
   }
       ngOnDestroy(): void {
    if(this.memberService.editMode()){
    this.memberService.editMode.set(false);
    }
}
}
