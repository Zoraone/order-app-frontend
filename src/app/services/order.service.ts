import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Order } from '../order/order';

import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class OrderService {
  constructor(private http: HttpClient) { }

  private ordersUrl = environment.apiUrl + '/api/order/get/';

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.ordersUrl).pipe(
      catchError(this.handleError<Order[]>('getOrders', []))
    );
  }

  getOrder(id: string): Observable<Order> {
    return this.http.get<Order>(this.ordersUrl + id).pipe(
      catchError(this.handleError<Order>('getOrder'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
