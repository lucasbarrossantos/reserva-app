import { FormControl } from '@angular/forms';
import { EmpresaService } from './../empresa.service';
import { Empresa } from './../../shared/model/empresa.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToastyService } from 'ng2-toasty';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-cadastro-empresa',
  templateUrl: './cadastro-empresa.component.html',
  styleUrls: ['./cadastro-empresa.component.css']
})
export class CadastroEmpresaComponent implements OnInit, OnDestroy {
  empresa = new Empresa();

  constructor(
    private empresaService: EmpresaService,
    private toasty: ToastyService,
    private router: Router,
    private route: ActivatedRoute,
    private title: Title
  ) {}

  ngOnInit() {
    this.title.setTitle(
      this.empresa.id
        ? `Edição da empresa - ${this.empresa.nomeFantasia}`
        : 'Nova empresa'
    );
    this.route.data.subscribe(({ empresa }) => {
      this.empresa = empresa;
    });
  }

  ngOnDestroy() {}

  get editando() {
    return this.empresa.id;
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizar(form);
    } else {
      this.adicionar(form);
    }
  }

  atualizar(form: FormControl) {
    this.empresaService.atualizar(this.empresa).subscribe(( empresa ) => {
      this.responseSuccess('Empresa atualizada com sucesso!');
      this.resetForm(form);
      this.router.navigate(['/empresas', empresa.body.id]);
    });
  }

  adicionar(form: FormControl) {
    this.empresaService.salvar(this.empresa).subscribe(empresaResponse => {
      this.responseSuccess('Empresa salva com sucesso!');
      this.resetForm(form);
      this.router.navigate(['/empresas', empresaResponse.id]);
    });
  }

  completarEndereco(event: any) {
    if (event.target.value) {
      this.empresaService
        .findEnderecoByCep(event.target.value.replace('-', ''))
        .subscribe((response: any) => {
          this.setResponse(response);

          if (response.body.erro) {
            this.toasty.error('CEP não encontrado!');
          }
        });
    }
  }

  private setResponse(response: any) {
    this.empresa.endereco.bairro = response.body.bairro;
    this.empresa.endereco.cidade = response.body.localidade;
    this.empresa.endereco.logradouro = response.body.logradouro;
    this.empresa.endereco.estado = response.body.uf;
    this.empresa.endereco.complemento = response.body.complemento;
  }

  private resetForm(form: FormControl) {
    form.reset();
    this.empresa = new Empresa();
  }

  private responseSuccess(msg: string) {
    this.toasty.success(msg);
  }
}
