import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from '../ingreso-egreso.model';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../ingreso-egreso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {

  items: IngresoEgreso[];
  subscription: Subscription = new Subscription();
  constructor(private store: Store<AppState>,
    private ieService: IngresoEgresoService) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.subscription = this.store.select('ingresoEgreso').subscribe( ingresoEgreso => {
      this.items = ingresoEgreso.items;
    });
  }

  borrarItem(item: IngresoEgreso){
    this.ieService.borrarIngresoEgreso(item.uid)
    .then( ()=> {
      Swal.fire('Item eliminado', item.description, 'success' );
    })
    .catch( (err) => {
      console.error(err);
      Swal.fire('Problema al eleminar el item', err.message, 'error' );
    });
  }

}
