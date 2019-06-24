import { Title } from '@angular/platform-browser';
import { Categoria } from './../../shared/model/categoria.model';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CategoriaService } from '../categoria.service';
import { ToastyService } from 'ng2-toasty';
import { ConfirmationService, LazyLoadEvent } from 'primeng/components/common/api';
import { ErrorHandleService } from 'src/app/shared/core/error-handle.service';
import { EventEmitterService } from 'src/app/shared/utils/event.manager';
import { CategoriaFilter } from 'src/app/shared/model/filtros/categoria.filter';

@Component({
  selector: 'app-categoria-pesquisa',
  templateUrl: './categoria-pesquisa.component.html',
  styleUrls: ['./categoria-pesquisa.component.css']
})
export class CategoriaPesquisaComponent implements OnInit, OnDestroy {
  categorias: Categoria[];
  filtro = new CategoriaFilter();
  totalRegistros = 0; // Qtd de registro do retorno da consulta
  @ViewChild('tabela') grid; // @ViewChild('?') recupera algum dado da view
  sub: Subscription;


  constructor(
    private categoriaService: CategoriaService, // Serviço
    private toasty: ToastyService, // Alertas
    private confirmation: ConfirmationService, // Popup para exclusão de itens
    private errorHandle: ErrorHandleService, // Erros
    private title: Title // Título da página
  ) {
    EventEmitterService.get('CategoriListModification').subscribe((data) => {
      this.grid.first = 0;
      this.pesquisar();
    });
   }

  ngOnInit() {
    this.title.setTitle('Pesquisa de categoria');
    this.sub = EventEmitterService.get('CategoriListModification').subscribe( data => {} );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.categoriaService.pesquisar( this.filtro ).subscribe((dados) => {
      this.totalRegistros = dados.total;
      this.categorias = dados.categorias;
    }, (error) => this.errorHandle.handle(error));
  }

  confirmExclusao(id: number, parametro: any) {
    this.confirmation.confirm({
        message: `Deseja realmente excluir ${parametro} ?`,
        header: 'Confirmação de exclusão',
        icon: 'pi pi-question-circle',
        acceptLabel: 'Sim',
        rejectLabel: 'Não',
        accept: () => {
            this.excluir(id);
        }
    });
  }

  excluir(codigo: any) {
    this.categoriaService.excluir(codigo).subscribe((response) => {

      this.toasty.success( 'Categoria excluída com sucesso!');

      EventEmitterService.get('CategoriListModification').emit({
        nome: 'CategoriListModification',
        mensagem: 'Categoria alterada.'
      });

    },
    (response) => this.errorHandle.handle(response));
  }

  onMudarPagina(event: LazyLoadEvent) {
    const pagina = (event.first / event.rows);
    this.pesquisar(pagina);
  }


}
