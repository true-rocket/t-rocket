import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

    // 0 - intro
    // 1 - pass and mail
    // 2 - registration finished
    state: number = 0;
    req: any = "none";
    emailCheck: string = "";
    input: boolean = false;

    lastTimeout: any;
    // interface UserData {
    // 	name: string
    // 	surname: string
    // 	nick: string
    // 	email: string
    // 	password: string
    // };

    userData = {
        name: "",
        surname: "",
        nick: "",
        email: "",
        password: ""
    }


    passCheck: string = "";
    passStrength: string = "";
    vulLevel = "";

    testRequest() {
        this.http.post("http://localhost:8000/api/new-user", this.userData);
    }

    backButton(state) {
        let button = document.getElementById('back-button');
        if (state == 3) {
            button.classList.remove('transparent');
            button.classList.remove('disabled');
        } else {
            button.classList.add('transparent');
            button.classList.add('disabled');
        }

    }
    nextButton(state) {
        let button = document.getElementById("next-button");
        switch (state) {
            case 0:
                button.classList.add('disabled');
                button.classList.add('transparent');
                break;
            case 1:
                document.getElementById('carousel').style.marginLeft = "0";
                button.classList.add('shift');
                button.classList.remove('disabled');
                button.classList.remove('transparent');
                button.classList.remove('back-button');
                button.classList.add('next-button');
                button.innerText = "Next";
                break;
            case 2:
                document.getElementById('carousel').style.marginLeft = "-100%";
                button.classList.remove('next-button');
                button.classList.add('back-button');
                button.innerText = "Back";
                break;
            case 3:
                document.getElementById('carousel').style.marginLeft = "-100%";
                button.classList.remove('shift');
                button.classList.remove('back-button');
                button.classList.add('next-button');
                button.innerText = "Finish";
                break;
            case 4:
                document.getElementById('carousel').style.marginLeft = "-200%";
                this.nextButton(0);
                this.backButton(0);
        }
    }

    register() {
        console.log("registration");
        let headers = new HttpHeaders({
            // 'Content-Type': 'application/json'
        });
        this.http.post("http://localhost:8000/api/new-user",
            this.userData)
            .subscribe(response => console.log(response));
        console.log("registration passed");
    }

    clickNext() {
        if (this.state == 1)
            this.state = 2;
        else if (this.state == 2)
            this.state = 1;
        else if (this.state == 3) {
            this.state = 4;
            this.register();
        }
    }

    doDataCheck() { // checks email and pass
        // stolen from StackOverflow :3

        if (this.userData.password != '') {
            if (this.passCheck == this.userData.password)
                return true;
        }
        return false;
    }

    handlePassInput() {

    }

    doEmailCheck() {
        let emailRegexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (emailRegexp.test(this.userData.email.toLowerCase())) {
            return true;
        }
        return false;
    }
    toggleEye(eye) {
        if (eye.classList.contains('eye-opened')) {
            eye.classList.remove('eye-opened');
            eye.classList.add('eye-closed');
            (<HTMLObjectElement>document.getElementById('pass-input')).type = 'text';
            (<HTMLObjectElement>document.getElementById('pass-input-check')).type = 'text';
        } else {
            eye.classList.remove('eye-closed');
            eye.classList.add('eye-opened');
            (<HTMLObjectElement>document.getElementById('pass-input')).type = 'password';
            (<HTMLObjectElement>document.getElementById('pass-input-check')).type = 'password';
        }
    }

    constructor(
        private http: HttpClient) {

    }
    prepareMask() {
        let mask = this.userData.password.split('').map(() => '*').join('');
        return mask;
    }

    ngAfterContentChecked() {
        if (!this.doEmailCheck()) this.emailCheck = "invalid";
        else this.emailCheck = "";
        if (this.userData.email == "") this.emailCheck = "";
    }

    ngDoCheck() {
        if (this.userData.password.length == 0) {
            this.passStrength = "";
        } else if (this.userData.password.length < 6) {
            this.passStrength = "too weak";
            this.vulLevel = "red"
        } else if (this.userData.password.length < 11) {
            this.passStrength = "not too weak";
            this.vulLevel = "yellow";
        } else {
            this.passStrength = "strong enough";
            this.vulLevel = "green";
        }

        if (this.passCheck != '') {
            let el = document.getElementById('pass-check');
            if (!this.doDataCheck()) {
                el.innerHTML = 'incorrect';
                el.classList.add('red');
                el.classList.remove('green');
            } else {
                el.innerHTML = '✔';
                el.classList.remove('red');
                el.classList.add('green');
                this.passStrength = '✔';
                this.vulLevel = 'green';
            }
        }

        if (this.userData.name != '' && this.userData.surname != '') {
            if (this.state == 0)
                this.state = 1
        } else this.state = 0


        if (this.doDataCheck() && this.state == 2) {
            this.state = 3;
        };
        if (!this.doDataCheck() && this.state == 3) {
            this.state = 2;
        }



        this.backButton(this.state);
        this.nextButton(this.state);

        console.log(this.userData.password);
        // this.checkInput(this.doDataCheck);
    }

    ngAfterViewChecked() {
    }

    ngOnInit() {
    }

}
