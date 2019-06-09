import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-route',
    templateUrl: './route.component.html',
    styleUrls: ['./route.component.scss']
})
export class RouteComponent implements OnInit {

    hidden = false;

    routes = [];

    selectedRoute = undefined

    constructor() { }

    ngOnInit() {
        this.getRoutes()
        console.log('init route')
    }

    getRoutes() {
        this.routes.push({
            'id': 1,
            'pointA': 'Санкт-Петербург',
            'pointB': 'Москва',
            'routeDate': '29.06.2019',
            'carModel': 'Газель',
            'routeStatus': 'Сформирован'
        },
            {
                'id': 2,
                'pointA': 'Санкт-Петербург',
                'pointB': 'Москва',
                'routeDate': '22.05.2019',
                'carModel': 'Газель',
                'routeStatus': 'Формирование',
                'routes': [
                    {
                        'date': '11.06.18',
                        'time': '11:30',
                        'city': 'Санкт-Петербург',
                        'addres': 'Студенческая улица, 5, 503',
                        'd_city': 'Москва',
                        'd_addres': 'Кутузовская Улица, 165, 24',
                        'weight': 25,
                        'size': [450, 2000, 800],
                        'cost': 2500
                    },
                    {
                        'date': '11.06.18',
                        'time': '11:30',
                        'city': 'Санкт-Петербург',
                        'addres': 'Студенческая улица, 5, 503',
                        'd_city': 'Москва',
                        'd_addres': 'Кутузовская Улица, 165, 24',
                        'weight': 12,
                        'size': [450, 2000, 800],
                        'cost': 980
                    },
                    {
                        'date': '11.06.18',
                        'time': '11:30',
                        'city': 'Санкт-Петербург',
                        'addres': 'Студенческая улица, 5, 503',
                        'd_city': 'Москва',
                        'd_addres': 'Кутузовская Улица, 165, 24',
                        'weight': 8,
                        'size': [450, 2000, 800],
                        'cost': 450
                    }
                ]
            },
            {
                'id': 3,
                'pointA': 'Пермь',
                'pointB': 'Самара',
                'routeDate': '07.06.2019',
                'carModel': 'Барагузин ласточка моя',
                'routeStatus': 'В пути'
            },
            {
                'id': 4,
                'pointA': 'Саратов',
                'pointB': 'Магадан',
                'routeDate': '12.05.2019',
                'carModel': 'Барагузин ласточка ваще',
                'routeStatus': 'Завершен'
            })
        console.log('getRoutes')
    }

    createRoute() {
        console.log('createRoute')
    }

    openRoute(id) {
        this.hidden = true;
        this.selectedRoute = id;
        console.log('openRoute', id)
    }

}
