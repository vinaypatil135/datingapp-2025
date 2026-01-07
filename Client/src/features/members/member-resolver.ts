import { inject } from '@angular/core';
import { ResolveFn, Router, RouterEvent } from '@angular/router';
import { MemeberService } from '../../core/services/memeber-service';
import { Member } from '../../types/member';
import { EMPTY } from 'rxjs';

export const memberResolver: ResolveFn<Member> = (route, state) => {
  const memberService=inject(MemeberService);
  const router=inject(Router);
  const memeberId=route.paramMap.get('id');
  
  if(!memeberId){
    router.navigateByUrl('/not-found');
    return EMPTY;
  }
  return memberService.getMember(memeberId);
};
