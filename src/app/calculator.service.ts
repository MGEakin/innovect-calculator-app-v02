import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Calculator } from './calculator';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  private calculatorsUrl = 'api/calculators';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET calculator from the server */
  getCalculators(): Observable<Calculator[]> {
    return this.http.get<Calculator[]>(this.calculatorsUrl)
      .pipe(
        tap(_ => this.log('fetched calculators')),
        catchError(this.handleError<Calculator[]>('getCalculators', []))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for calculator consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a CalculatorService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`CalculatorService: ${message}`);
  }
}
