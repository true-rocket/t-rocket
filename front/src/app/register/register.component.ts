import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    executor = undefined

    title = "Регистрация"

    changeTitle() {
        this.title = 'Спасибо за регистрацию!'
    }

    further(margin: number) {
        $('.carousel-content').css('margin-left', '-' + margin.toString() + '%');
        // document.getElementsByClassName
    }

    back(margin: number) {
        $('.carousel-content').css('margin-left', '-' + margin.toString() + '%');
    }

    constructor() { }

    ngOnInit() {
    }

}
