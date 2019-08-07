import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/components/card/card';
import { SharedModule } from '../shared/shared.module';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { ButtonModule } from 'primeng/components/button/button';
import { TableModule } from 'primeng/components/table/table';
import { TooltipModule } from 'primeng/components/tooltip/tooltip';
import { InputMaskModule } from 'primeng/components/inputmask/inputmask';
import { AccordionModule } from 'primeng/components/accordion/accordion';

import { EmpresaRoutingModule } from './empresa.routing';
import { CadastroEmpresaComponent } from './cadastro-empresa/cadastro-empresa.component';
import { PesquisaEmpresaComponent } from './pesquisa-empresa/pesquisa-empresa.component';


@NgModule({
  declarations: [CadastroEmpresaComponent, PesquisaEmpresaComponent],
  imports: [
    CommonModule,
    EmpresaRoutingModule,
    FormsModule,
    CardModule,
    SharedModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    InputMaskModule,
    AccordionModule
  ]
})
export class EmpresaModule { }
