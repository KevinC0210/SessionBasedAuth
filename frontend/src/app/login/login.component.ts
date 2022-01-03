import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    userid: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.loginForm.invalid == true) {
      return;
    } else {
      let data: any = Object.assign(
        {
          userid: this.loginForm.value.userid,
          password: this.loginForm.value.password,
        },
        this.loginForm.value
      );
      this.http
        .post('http://localhost:3030/api/login', data, {
          withCredentials: true,
        })
        .subscribe((data: any) => {
          if (data.userid) {
            this.router.navigate(['/']);
          }
        });
    }
  }
}
