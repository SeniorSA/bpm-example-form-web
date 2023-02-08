import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TableCrudService {

  url: string = './assets/tableRows.json';

  constructor(private http: HttpClient) { }

  getTableRows(): Observable<any> {
    return this.http.get(this.url);
  }
}
