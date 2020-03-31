import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromIE from 'src/app/ingreso-egreso/ingreso-egreso.reducer';
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
  public doughnutChartLabels: string[] = ['Ingresos', 'Egresos'];
  public doughnutChartData: number[] = [];

  constructor(private store: Store<fromIE.AppStateWithIE>) { }

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

    });
    this.doughnutChartData = [this.ingresos, this.egresos];
  }

}
