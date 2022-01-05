import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

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

  constructor(private authService: AuthService) {}

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
      this.authService.login(data);
    }
  }
}
