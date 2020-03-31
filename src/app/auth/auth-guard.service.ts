import { Injectable } from '@angular/core';
import { CanActivate, CanLoad } from '@angular/router';
import { AuthService } from './auth.service';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanLoad{

  constructor(private authService: AuthService) { }

  canLoad() {
    return this.authService.isAuthenticated()
    .pipe(
      take(1)
    );
  }

  canActivate() {
    return this.authService.isAuthenticated()
  }
}
