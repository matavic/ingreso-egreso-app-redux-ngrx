import { Pipe, PipeTransform } from '@angular/core';
import { IngresoEgreso, Tipo } from './ingreso-egreso.model';

@Pipe({
  name: 'ordenIngresoEgreso'
})
export class OrdenIngresoEgresoPipe implements PipeTransform {

  transform(items: IngresoEgreso[]): IngresoEgreso[] {
    return items.sort( (a,b) => {
      if(a.tipo === Tipo.Ingreso)
        return -1;
      else
        return 1;  
    });
  }

}
