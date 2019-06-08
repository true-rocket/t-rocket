import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

    email: string
    password: string

    tokenHandler(token: any): void {
        console.log(token);
        if (token == false) {
            document.getElementById('wrong-pass').classList.remove('transparent');
        } else {
            console.log("oll korrect");
            this.router.navigate(['/user']);
        }
    }

    submit() {
        // let headers = new HttpHeaders({
        //     'Content-Type': 'application/json'
        // });
        this.http.post("http://localhost:8000/api/login", { email: this.email, password: this.password }, { withCredentials: true })
            .subscribe(resp => this.tokenHandler(resp['success']));
        console.log('login passed');
    }

    constructor(
        private http: HttpClient,
        private router: Router
    ) { }

    ngOnInit() {
    }

}
