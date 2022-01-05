import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable()
export class AdminCanActivate implements CanActivate {
  constructor(private http: HttpClient, private router: Router) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const data: any = await this.http
      .get('http://localhost:3030/api/login', { withCredentials: true })
      .toPromise();

    if (data.session.admin) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
