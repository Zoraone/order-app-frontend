import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Store } from '../store/store';

import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class StoreService {
  constructor(private http: HttpClient) { }

  private storeUrl = environment.apiUrl + '/api/store/get/';

  getStore(uuid: string): Observable<Store> {
    return this.http.get<Store>(this.storeUrl + uuid).pipe(
      catchError(this.handleError<Store>('getStore'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
