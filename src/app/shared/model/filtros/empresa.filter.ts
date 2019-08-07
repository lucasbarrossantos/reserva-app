import { ITEMS_POR_PAGINA } from '../../constants/paginacao-constant';

export class EmpresaFilter {
    nomeFantasia?: string;
    cnpj?: string;
    pagina?: number;
    itensPorPagina = ITEMS_POR_PAGINA;
}
