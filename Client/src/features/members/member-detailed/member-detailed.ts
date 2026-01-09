import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MemeberService } from '../../../core/services/memeber-service';
import { Member } from '../../../types/member';
import { filter } from 'rxjs';
import { AgePipe } from '../../../core/pipes/age-pipe';
import { AccountService } from '../../../core/services/account-service';

@Component({
  selector: 'app-member-detailed',
  standalone: true,
  imports: [RouterLink, RouterLinkActive,RouterOutlet,AgePipe],
  templateUrl: './member-detailed.html',
  styleUrl: './member-detailed.css',
})
export class MemberDetailed implements OnInit {
  protected memberService = inject(MemeberService);
  protected acountservice=inject(AccountService);
  private route = inject(ActivatedRoute);
  private router=inject(Router);
  // protected member$!: Observable<Member>;
  // protected member=signal<Member | undefined>(undefined);
  protected title=signal<string | undefined>('Profile');
  protected isCurrentUser=computed(() =>{
    return this.acountservice.currentuser()?.id==this.route.snapshot.paramMap.get('id');
  })

  ngOnInit(): void {
    // this.member$ = this.loadMember();
    // this.route.data.subscribe({
    //   next : data => this.member.set(data['member'])
    // })
    this.title.set(this.route.firstChild?.snapshot?.title);

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe({
      next:() => {
        this.title.set(this.route.firstChild?.snapshot?.title)
      }
    })
  }

  // private loadMember(): Observable<Member> {
  //   const id = this.route.snapshot.paramMap.get('id');

  //   if (!id) {
  //     return EMPTY; // always return an Observable
  //   }

  //   return this.memberService.getMember(id);
  // }
}
