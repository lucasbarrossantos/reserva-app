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
          { label: 'Interessados' },
          { label: 'Interessados(Eventos)' },
          { label: 'Matrículas' },
          { label: 'Frequências' },
          { label: 'Alunos', routerLink: '/alunos' },
          { label: 'Categoria', routerLink: '/categorias/nova'},
          { label: 'Cursos', routerLink: '/cursos'}
        ]
      },
      {
        label: 'Cadastros',
        items: [
          { label: 'Professor', routerLink: '/professores'},
          { label: 'Disciplinas', routerLink: '/disciplinas'},
          { label: 'Materiais', routerLink: '/materiais'},
          { label: 'Turmas', routerLink: '/turmas'},
          { label: 'Eventos', routerLink: '/eventos'},
          { label: 'Empresas', routerLink: '/empresas/nova'}
         ]
      },
      {
        label: 'Financeiro',
        items: [
          { label: 'Títulos'},
          { label: 'Estoque'},
        ]
      },
      {
        label: 'Relatórios',
        items: [
          { label: 'Matrículas' },
          { label: 'Financeiro' },
          { label: 'Frequências' },
          { label: 'Interessados' },
          { label: 'Professores' },
        ]
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
          { label: 'Suporte', url: 'http://google.com' }
        ]
      },
      /* { label: 'Login',  routerLink: '/login' } */
    ];
  }

}
