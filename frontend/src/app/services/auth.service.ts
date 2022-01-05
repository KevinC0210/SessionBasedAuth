import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private session: any = {};

  constructor(private http: HttpClient, private router: Router) {}

  async isAuthorizedAsUser() {
    const data: any = await this.http
      .get('http://localhost:3030/api/login', { withCredentials: true })
      .toPromise();

    this.session = data.session;
    if (data.session.userid) {
      return true;
    } else {
      return false;
    }
  }

  async isAuthorizedAsAdmin() {
    const data: any = await this.http
      .get('http://localhost:3030/api/login', { withCredentials: true })
      .toPromise();

    this.session = data.session;
    if (data.session.admin) {
      return true;
    } else {
      return false;
    }
  }

  login(loginData: any) {
    this.http
      .post('http://localhost:3030/api/login', loginData, {
        withCredentials: true,
      })
      .subscribe((data: any) => {
        this.session = data.session;
        if (data.session.userid) {
          this.router.navigate(['/']);
        }
      });
  }

  logout() {
    this.http
      .get('http://localhost:3030/api/logout', {
        withCredentials: true,
      })
      .subscribe((data: any) => {
        this.session = {};
        this.router.navigate(['/']);
      });
  }

  getUser() {
    if (this.session.userid) {
      return this.session.userid;
    } else {
      return '';
    }
  }
}
