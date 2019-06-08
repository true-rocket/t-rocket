import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-cabinet',
    templateUrl: './cabinet.component.html',
    styleUrls: ['./cabinet.component.scss']
})
export class CabinetComponent implements OnInit {

    activePage: number = 1

    balance: number = 1250


    constructor() { }

    ngOnInit() {
    }

}
