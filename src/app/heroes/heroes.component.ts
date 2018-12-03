import { Component, OnInit } from '@angular/core';
import { HEROES } from '../mock-heroes';
import { Hero } from './hero';


@Component({
    selector: 'heroes',
    templateUrl: './heroes.component.html',
    styleUrls: ['./style.scss']
})
export class HeroesComponent implements OnInit {

    heroes = HEROES;

    selectedHero = null;

    constructor() {
    }

    ngOnInit() {
    }

    onSelect(hero: Hero): void {
        this.selectedHero = hero;
    }

    unsetHero(): void {
        this.selectedHero = null;
    }

}
