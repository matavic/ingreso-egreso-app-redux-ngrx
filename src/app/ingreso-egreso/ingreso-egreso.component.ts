import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Tipo, IngresoEgreso } from './ingreso-egreso.model';
import { IngresoEgresoService } from './ingreso-egreso.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import * as fromIE from 'src/app/ingreso-egreso/ingreso-egreso.reducer';
import { Subscription } from 'rxjs';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../shared/ui.actions';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  Tipo = Tipo;
  form: FormGroup;
  tipo = Tipo.Ingreso;
  cargando: boolean;
  suscription: Subscription = new Subscription();
  constructor(private ieService: IngresoEgresoService,
    private store: Store<fromIE.AppStateWithIE>) { }

  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }

  ngOnInit() {
    this.suscription = this.store.select('ui').subscribe((ui)=> this.cargando = ui.isLoading);
    this.form = new FormGroup({
      'description': new FormControl('', Validators.required),
      'monto': new FormControl(0, Validators.required)
    });
  }

  crearIngresoEgreso(){
    this.store.dispatch(new ActivarLoadingAction());
    const ingresoEgreso = new IngresoEgreso({...this.form.value, tipo: this.tipo});
    this.ieService.crearIngresoEgreso(ingresoEgreso)
    .then( () => {
      this.store.dispatch(new DesactivarLoadingAction());
      Swal.fire('Creado', ingresoEgreso.description, 'success');
      this.form.reset({monto: 0});
    })
    .catch( err => {
      console.error(err);
      this.store.dispatch(new DesactivarLoadingAction());
    });
  }

}
