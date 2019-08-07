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
import { EmpresaFilter } from '../shared/model/filtros/empresa.filter';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  public resourceUrl = URL_BASE;

  constructor(private http: HttpClient) {}

  salvar(empresa: Empresa): Observable<any> {
    return this.http.post<Empresa>(`${this.resourceUrl}/empresas`, empresa, {
      params: null,
      observe: 'response'
    });
  }

  atualizar(empresa: Empresa): Observable<any> {
    return this.http.put<Empresa>(
      `${this.resourceUrl}/empresas/${empresa.id}`,
      empresa,
      {
        observe: 'response'
      }
    );
  }

  // Pesquisas

  pesquisar(filtro: EmpresaFilter): Observable<any> {
    let param = new HttpParams();
    param = this.filtros(filtro, param);

    return this.http
      .get<Empresa[]>(`${this.resourceUrl}/empresas?sort=nomeFantasia,asc`, {
        params: param,
        observe: 'response'
      })
      .pipe(map((res: any) => this.convertDateArrayFromServer(res)));
  }

  findById(id: number): Observable<any> {
    return this.http
      .get<Empresa>(`${this.resourceUrl}/empresas/${id}`, {
        observe: 'response'
      })
      .pipe(map((res: any) => res));
  }

  findEnderecoByCep(cep: string): Observable<any> {
    return this.http
      .get<any>(`https://viacep.com.br/ws/${cep}/json/`, {
        observe: 'response'
      })
      .pipe(map((res: any) => res));
  }

  protected convertDateArrayFromServer(res: any): any {
    let result = {};
    if (res.body) {
      result = {
        empresas: res.body.content,
        total: res.body.totalElements
      };
    }
    return result;
  }

  /*
   * Filtros
   * Params: filtro: any, param: HttpParams
   */

  private filtros(filtro: any, param: HttpParams) {
    // Parametros de paginacao
    param = param.set('page', filtro.pagina);
    param = param.set('size', filtro.itensPorPagina);

    // Parametros de filtragens
    if (filtro.nomeFantasia) {
      param = param.set('nomeFantasia', filtro.nomeFantasia);
    }

    if (filtro.cnpj) {
      param = param.set('cnpj', filtro.cnpj);
    }

    return param;
  }
}
