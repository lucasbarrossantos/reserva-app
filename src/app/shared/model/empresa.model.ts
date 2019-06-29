import { Endereco } from './endereco.model';

export class Empresa {
    id?: number;
    nomeFantasia?: string;
    cnpj?: string;
    razaoSocial?: string;
    inscricaoEstadual?: string;
    site?: string;
    email?: string;
    telefone?: string;
    celular?: string;
    endereco?: Endereco;
    carros?: any;

    constructor() {
        this.endereco = new Endereco();
    }

}
