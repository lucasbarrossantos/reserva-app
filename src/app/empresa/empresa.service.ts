import { Empresa } from './../shared/model/empresa.model';
import { Injectable } from '@angular/core';
import { URL_BASE } from '../shared/url-base';
import {
  HttpParams,
  HttpHeaders,
  HttpClient,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  public resourceUrl = URL_BASE;

  constructor(private http: HttpClient) {}

  // Pesquisas

  findById(id: number): Observable<any> {
    return this.http
      .get<Empresa>(`${this.resourceUrl}/empresas/${id}`, {
        observe: 'response'
      }).pipe(map((res: any) => res));
  }

  findEnderecoByCep(cep: string): Observable<any> {
    return this.http
      .get<any>(`https://viacep.com.br/ws/${cep}/json/`, {
        observe: 'body'
      }).pipe(map((res: any) => res));
  }
}
