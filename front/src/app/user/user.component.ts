import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

    userInfo: any; // info to post
    userData: any;

    logout() {
        this.http.get("http://localhost:8000/api/logout").subscribe(() => { this.router.navigate(["/sign-in"]) });
        // this.router.navigate(["/sign-in"]);
    }

    getUserData() {
        let httpHeaders = new HttpHeaders({ "Content-Type": "application/json" });
        this.http.get("http://localhost:8000/api/user-data", { headers: httpHeaders, withCredentials: true }).subscribe(res => this.userData = res.text);
    }

    constructor(
        private http: HttpClient,
        private router: Router
    ) {
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.getUserData();
    }

}
