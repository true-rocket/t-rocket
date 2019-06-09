import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


@Component({
    selector: 'app-cabinet',
    templateUrl: './cabinet.component.html',
    styleUrls: ['./cabinet.component.scss']
})
export class CabinetComponent implements OnInit {

    activePage: number = 1

    balance: number = 1250

    changeRoute(id: number) {
        this.activePage = id;
        switch (id) {
            case 1:
                window.history.pushState(null, "", "cabinet/profile")
                break;
            case 2:
                window.history.pushState(null, "", "cabinet/transport")
                break;
            case 3:
                window.history.pushState(null, "", "cabinet/route")
                break;
            case 4:
                window.history.pushState(null, "", "cabinet/history")
                break;
        }

    }

    constructor(private activeRoute: ActivatedRoute,
        private router: Router) { }

    ngOnInit() {

        // this.activeRoute.paramMap.subscribe(params => {
        // })
        console.log("Route params:")
        console.log(this.activeRoute.params.forEach(p => {
            this.activePage = 1;
            if (p.id == "transport")
                this.activePage = 2;
            else if (p.id == "route")
                this.activePage = 3;
            else if (p.id == "history")
                this.activePage = 4;
            console.log(p.id);
        }))
    }


}
