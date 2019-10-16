import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Item } from '../item/item';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  constructor(private http: HttpClient) { }

  private itemUrl =  environment.apiUrl + '/api/item/get/';

  getItem(uuid: string): Observable<Item> {
    return this.http.get<Item>(this.itemUrl + uuid).pipe(
      catchError(this.handleError<Item>('getItem'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
