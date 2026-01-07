import { Component, inject } from '@angular/core';
import { MemeberService } from '../../../core/services/memeber-service';
import { Observable } from 'rxjs';
import { Member } from '../../../types/member';
import { AsyncPipe } from '@angular/common';
import { MemberCard } from "../member-card/member-card";

@Component({
  selector: 'app-member-list',
  imports: [AsyncPipe, MemberCard],
  templateUrl: './member-list.html',
  styleUrl: './member-list.css',
})
export class MemberList {
  private memberService=inject(MemeberService);
 protected memebers$:Observable<Member[]>;

    constructor(){
      this.memebers$=this.memberService.getMembers();
    }
}
