import { MenuItem } from 'primeng/api';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  items: MenuItem[];

  constructor() {}

  ngOnInit() {
    this.items = [
      {
        label: 'Início',
        items: [
          { label: 'Categoria', routerLink: '/categorias'},
          { label: 'Empresas', routerLink: '/empresas'}
        ]
      },
      {
        label: 'Cadastros',
        items: [
          { label: 'Empresas', routerLink: '/empresas/nova'}
         ]
      },
      {
        label: 'Financeiro',
        items: [ ]
      },
      {
        label: 'Relatórios',
        items: [ ]
      }/* ,
      {
        label: 'Administração',
        items: [
          { label: 'Grupo de acesso' },
          { label: 'Papeis' },
          { label: 'Utilizadores' }
        ]
      } */,
      {
        label: 'Ajuda',
        items: [
          { label: 'Abrir chamado' },
          { label: 'Configurações' },
          { label: 'Sobre' },
          { label: 'Suporte', url: 'http://google.com', target: '_blanck' }
        ]
      },
      /* { label: 'Login',  routerLink: '/login' } */
    ];
  }

}
