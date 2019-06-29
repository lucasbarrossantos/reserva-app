import { EmpresaService } from './../empresa.service';
import { Empresa } from './../../shared/model/empresa.model';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-cadastro-empresa',
  templateUrl: './cadastro-empresa.component.html',
  styleUrls: ['./cadastro-empresa.component.css']
})
export class CadastroEmpresaComponent implements OnInit, OnDestroy {
  empresa = new Empresa();

  constructor(private empresaService: EmpresaService) {}

  ngOnInit() {}

  ngOnDestroy() {}

  get editando() {
    return this.empresa.id;
  }

  completarEndereco(event: any) {
    if (event.target.value) {
      this.empresaService
        .findEnderecoByCep(event.target.value.replace('-', ''))
        .subscribe((response: any) => {
          this.empresa.endereco.bairro = response.bairro;
          this.empresa.endereco.cidade = response.localidade;
          this.empresa.endereco.logradouro = response.logradouro;
          this.empresa.endereco.estado = response.uf;
          this.empresa.endereco.complemento = response.complemento;
        });
    }
  }
}
