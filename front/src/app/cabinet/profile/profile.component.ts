import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

    user: {
        lastName: string,
        name: string,
        phone: string,
        inn: string,
        bankAccount: string
    }

    constructor() {
        this.user = {
            lastName: "Василий",
            name: "Петров",
            phone: "+7 995 265 56 71",
            inn: "87242316015654",
            bankAccount: null
        }
    }

    ngOnInit() {
    }

}
