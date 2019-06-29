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
import { Categoria } from '../shared/model/categoria.model';
import { CategoriaFilter } from '../shared/model/filtros/categoria.filter';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  public resourceUrl = URL_BASE;

  constructor(private http: HttpClient) {}

  // Serviço para salvar a categoria no banco de dados
  salvar(categoria: Categoria): Observable<any> {
    return this.http.post<Categoria>(
      `${this.resourceUrl}/categorias`,
      categoria,
      {
        params: null,
        observe: 'response'
      }
    );
  }

  excluir(id: number) {
    return this.http.delete<any>(`${this.resourceUrl}/categorias/${id}`,
    {
      observe: 'response'
    });
  }

  atualizar(categoria: Categoria): Observable<any> {
    return this.http
        .put<Categoria>(`${this.resourceUrl}/categorias/${categoria.id}`, categoria,
        { observe: 'response' });
  }

  // Pesquisas

  pesquisar(filtro: CategoriaFilter): Observable<any> {
    let param = new HttpParams();
    param = this.filtros(filtro, param);

    return this.http
      .get<Categoria[]>(`${this.resourceUrl}/categorias?sort=descricao,asc`, {
        params: param,
        observe: 'response'
      })
      .pipe(map((res: any) => this.convertDateArrayFromServer(res)));
  }

  findById(id: number): Observable<any> {
    return this.http
      .get<Categoria>(`${this.resourceUrl}/categorias/${id}`, {
        observe: 'response'
      })
      .pipe(map((res: any) => res));
  }

  protected convertDateArrayFromServer(res: any): any {
    let result = {};
    if (res.body) {
      result = {
        categorias: res.body.content,
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
    if (filtro.descricao) {
      param = param.set('descricao', filtro.descricao);
    }

    return param;
  }

}
