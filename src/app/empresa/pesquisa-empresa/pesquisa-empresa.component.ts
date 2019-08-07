import { Title } from '@angular/platform-browser';
import { Empresa } from './../../shared/model/empresa.model';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { EmpresaService } from '../empresa.service';
import { ToastyService } from 'ng2-toasty';
import { ConfirmationService, LazyLoadEvent } from 'primeng/components/common/api';
import { ErrorHandleService } from 'src/app/shared/core/error-handle.service';
import { EventEmitterService } from 'src/app/shared/utils/event.manager';
import { EmpresaFilter } from 'src/app/shared/model/filtros/empresa.filter';

@Component({
  selector: 'app-pesquisa-empresa',
  templateUrl: './pesquisa-empresa.component.html',
  styleUrls: ['./pesquisa-empresa.component.css']
})
export class PesquisaEmpresaComponent implements OnInit, OnDestroy {
  empresas: Empresa[];
  filtro = new EmpresaFilter();
  totalRegistros = 0; // Qtd de registro do retorno da consulta
  @ViewChild('tabela') grid; // @ViewChild('?') recupera algum dado da view
  sub: Subscription;


  constructor(
    private empresaService: EmpresaService, // Serviço
    private toasty: ToastyService, // Alertas
    private confirmation: ConfirmationService, // Popup para exclusão de itens
    private errorHandle: ErrorHandleService, // Erros
    private title: Title // Título da página
  ) {
    EventEmitterService.get('EmpresaListModification').subscribe((data) => {
      this.grid.first = 0;
      this.pesquisar();
    });
   }

  ngOnInit() {
    this.title.setTitle('Pesquisa de empresas');
    this.sub = EventEmitterService.get('EmpresaListModification').subscribe( data => {} );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.empresaService.pesquisar( this.filtro ).subscribe((dados) => {
      this.totalRegistros = dados.total;
      this.empresas = dados.empresas;
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
            // this.excluir(id);
        }
    });
  }

  /* excluir(codigo: any) {
    this.empresaService.excluir(codigo).subscribe((response) => {

      this.toasty.success( 'empresa excluída com sucesso!');

      EventEmitterService.get('CategoriListModification').emit({
        nome: 'CategoriListModification',
        mensagem: 'empresa alterada.'
      });

    },
    (response) => this.errorHandle.handle(response));
  } */

  onMudarPagina(event: LazyLoadEvent) {
    const pagina = (event.first / event.rows);
    this.pesquisar(pagina);
  }


}
