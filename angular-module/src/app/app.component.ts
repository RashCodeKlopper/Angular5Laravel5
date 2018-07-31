import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { User } from './user/user';
import { Item } from './item/Item';
import { NgForm } from '@angular/forms';
import { Http, Headers } from '@angular/http';
// import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Laravel 5 Angular 5 App!';

  user: User;

  item: Item;

  apiUrl = 'http://angular-laravel:8000';

  constructor(private _http: HttpClient) { }

  // private headers = new Headers({ 'Content-Type': 'application/json' });

  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-token'
    })
  };

  ngOnInit() {
    // Make the HTTP request:
    this._http.get<User>(this.apiUrl + '/auth').subscribe(data => {
      console.log(data);
      this.user = data;
    });
  }

  // addItem(info) {
  addItem(item: Item) {

    // const data = JSON.stringify(info);

    return this._http.post(this.apiUrl + '/api/items', item, this.httpOptions).pipe(
      tap(_ => this.log(`Saved Item with name=${item.name}`)),
      catchError(this.handleError<any>('addItem'))
    );

  }

  // onSubmit(form: NgForm): Promise<Item> {
  //   return this._http.post(this.apiUrl + '/api/items', JSON.stringify(form.value),
  //     { headers: this.headers })
  //     .toPromise()
  //     .then(res => res.json().data)
  //     .catch(this.handleError);
  // }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
