import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-restricted',
  templateUrl: './restricted.component.html',
  styleUrls: ['./restricted.component.css'],
})
export class RestrictedComponent implements OnInit {
  hasAccessToRestrictedContent: Boolean = false;
  userid: String = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get('http://localhost:3030/api/restricted', { withCredentials: true })
      .subscribe((data: any) => {
        this.userid = data.userid;
      });
  }
}
