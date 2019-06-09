import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.scss']
})
export class RouteComponent implements OnInit {

  routes = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getRoutes()
  }

  getData(url) { // Получить
    this.http
      .get(url,{observe: 'response'})
      .subscribe(res => {
        if (res.status == 200) {
          console.log(res.body);
          return res.body;
        } else return []
      })
    return []
  }

  putData(url, params) { // Создать
     this.http
       .put(url, JSON.stringify({params}))
       .subscribe(response => {
         console.log(response)
         return response
       })
  }

  postData(url) { // Изменить
    const params = JSON.stringify({
    'id': 'UUID',
    'price': 0,
    'weight': 100,
    'lenght': 100,
    'height': 200,
    'width': 50,
    'status_order': 0,
    'status_payment': 0
    });

    this.http
      .post(url, params)
      .subscribe(response => {
        console.log(response)
        return response
      })
  }

  getRoutes() {
    this.http
      .get("http://api.t-rocket.ru/api/vroutes",{observe: 'response'})
      .subscribe(res => {
        if (res.status == 200) {
          console.log(res.body);
          this.routes = (res.body || []);
        }
      })
    // this.routes.push({
    //     'id': 1,
    //     'pointA': 'СПб, ул. Шоссе в Лаврики 87',
    //     'pointB': 'СПб, ул. Солнечная 12а',
    //     'routeDate': '29.06.2019',
    //     'carModel': 'Газель',
    //     'routeStatus': 'Сформирован'
    //   },
    //   {
    //     'id': 2,
    //     'pointA': 'СПб, ул. Комсомольская 4',
    //     'pointB': 'Москва, наб. Москвы-реки 48',
    //     'routeDate': '22.05.2019',
    //     'carModel': 'Газель',
    //     'routeStatus': 'Формирование'
    //   },
    //   {
    //       'id': 3,
    //       'pointA': 'Пермь, ул. Правды 88',
    //       'pointB': 'Самараб пр. Новаторов 21',
    //       'routeDate': '07.06.2019',
    //       'carModel': 'Барагузин ласточка моя',
    //       'routeStatus': 'В пути'
    //     },
    //     {
    //         'id': 4,
    //         'pointA': 'Саратов, ул. Ленина 49',
    //         'pointB': 'Магадан, пр. Победы 90',
    //         'routeDate': '12.05.2019',
    //         'carModel': 'Газель',
    //         'routeStatus': 'Завершен'
    //       })
    console.log('getRoutes')
  }

  createRoute() {
    const params = {
      'point_a': 'Салехард',
      'point_b': 'Каракум',
      'date': new Date(),
      'status': 'fba9358b-16c5-69ac-6de4-772cc4fc0098'
    };
    this.putData('http://api.t-rocket.ru/api/vroutes', params)
    console.log('createRoute')
  }

  openRoute(id) {
    console.log('openRoute', id)
  }

}
