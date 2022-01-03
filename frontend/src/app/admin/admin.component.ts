import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  hasAccessToAdminContent = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.hasAccessToAdminContent = false;
    this.http
      .get('http://localhost:3030/api/admin', { withCredentials: true })
      .subscribe((data: any) => {
        this.hasAccessToAdminContent = data.authenticated;
      });
  }
}
