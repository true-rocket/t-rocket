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
            phone: "",
            inn: "",
            bankAccount: null
        }
    }

    ngOnInit() {
    }

}
