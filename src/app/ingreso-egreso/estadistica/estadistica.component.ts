import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';
import { IngresoEgreso, Tipo } from '../ingreso-egreso.model';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: []
})
export class EstadisticaComponent implements OnInit {

  ingresos: number;
  egresos: number;
  cuantosIngresos: number;
  cuantosEgresos: number;
  subscription: Subscription = new Subscription();

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.subscription = this.store.select('ingresoEgreso').subscribe( ingresoEgreso => {
      this.contarIngresosEgresos(ingresoEgreso.items);
    } );
  }

  contarIngresosEgresos(items: IngresoEgreso[]){
    this.cuantosIngresos = 0;
    this.cuantosEgresos = 0;
    this.ingresos = 0;
    this.egresos = 0;

    items.forEach( item => {
      if(item.tipo === Tipo.Ingreso) {
        this.ingresos += item.monto;
        this.cuantosIngresos++;
      } else {
        this.egresos += item.monto;
        this.cuantosEgresos++;
      }

    })
  }

}
