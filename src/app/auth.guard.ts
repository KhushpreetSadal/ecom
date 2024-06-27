
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
   const router = inject(Router)
   let user = localStorage.getItem('user')
   let seller = localStorage.getItem('seller')
  if(user && user.length || seller && seller.length){
    return true
  }else{
    router.navigate([''])
    return false
  }
};
