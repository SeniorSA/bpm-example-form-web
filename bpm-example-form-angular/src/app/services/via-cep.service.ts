import { Injectable, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Cep } from './../model/cep';

@Injectable({
  providedIn: 'root'
})

export class ViaCepService {

  private cep: Cep = {};

  constructor(private http: HttpClient) { }

  getCep(cep: string): Observable<any> {
    console.log('cep: ' + JSON.stringify(cep));

    // Deixa apenas dígitos no cep
    cep = cep.replace(/\D/g, '');

    // Verifica se campo cep possui valor informado.
    if (cep !== '') {
      // Expressão regular para validar o CEP.
      const validateCep = /^[0-9]{8}$/;

      // Valida o formato do CEP.
      if (validateCep.test(cep)) {
        return this.http.get(`https://viacep.com.br/ws/${cep}/json`);
      }
    }

    return of({});
  }
}
