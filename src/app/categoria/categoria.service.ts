import { Injectable } from '@angular/core';
import { URL_BASE } from '../shared/url-base';
import { HttpParams, HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';
import { Categoria } from '../shared/model/categoria.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';

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

  // Pesquisas
  findById(id: number): Observable<any> {
    return this.http
      .get<Categoria>(`${this.resourceUrl}/categorias/${id}`, {
        observe: 'response'
      })
      .pipe(map((res: any) => res));
  }

}
