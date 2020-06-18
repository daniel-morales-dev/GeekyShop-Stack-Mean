import { Pipe, PipeTransform } from '@angular/core';
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(lista: any[], texto: string): any {
    if (!texto) {
      return lista;
    }
    return lista.filter((product) =>
      product.name.toUpperCase().includes(texto.toUpperCase())
    );
  }
}
