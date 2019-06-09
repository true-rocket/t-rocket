import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.scss']
})
export class RouteComponent implements OnInit {

  routes = [];

  constructor() { }

  ngOnInit() {
    this.getRoutes()
    console.log('init route')
  }

  getRoutes() {
    this.routes.push({
        'id': 1,
        'pointA': 'СПб, ул. Шоссе в Лаврики 87',
        'pointB': 'СПб, ул. Солнечная 12а',
        'routeDate': '29.06.2019',
        'carModel': 'Газель',
        'routeStatus': 'Сформирован'
      },
      {
        'id': 2,
        'pointA': 'СПб, ул. Комсомольская 4',
        'pointB': 'Москва, наб. Москвы-реки 48',
        'routeDate': '22.05.2019',
        'carModel': 'Газель',
        'routeStatus': 'Формирование'
      },
      {
          'id': 3,
          'pointA': 'Пермь, ул. Правды 88',
          'pointB': 'Самараб пр. Новаторов 21',
          'routeDate': '07.06.2019',
          'carModel': 'Барагузин ласточка моя',
          'routeStatus': 'В пути'
        },
        {
            'id': 4,
            'pointA': 'Саратов, ул. Ленина 49',
            'pointB': 'Магадан, пр. Победы 90',
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
    console.log('openRoute', id)
  }

}
