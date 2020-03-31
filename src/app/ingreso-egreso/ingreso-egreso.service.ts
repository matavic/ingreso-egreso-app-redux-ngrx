import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IngresoEgreso } from './ingreso-egreso.model';
import { AuthService } from '../auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { filter, map } from 'rxjs/operators';
import { SetItemsAction, UnsetItemsAction } from './ingreso-egreso.actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  ieListenerSubscription: Subscription = new Subscription();
  ieItemsSubscription: Subscription = new Subscription();

  constructor(private afDB: AngularFirestore, 
    private authService: AuthService,
    private store: Store<AppState>) { }

  ingresoEgresoListener(){
    this.ieItemsSubscription = this.store.select('auth')
    .pipe(
      filter( auth => auth.user != null)
    )
    .subscribe( auth => {
      this.getIngresoEgresoItems(String(auth.user.uid))
    });
  }

  private getIngresoEgresoItems( uid: string){
    this.ieListenerSubscription = this.afDB.collection(`${uid}/ingresos-egresos/items`)
    .snapshotChanges()
    .pipe(
      map( docData => {
        return docData.map( doc => {
          const inf = doc.payload.doc.data() as Object;
          return {
            uid: doc.payload.doc.id,
            ...inf
          }
        })
      })
    )
    .subscribe( (colection: any) => {
      this.store.dispatch(new SetItemsAction(colection))
    });
  }

  crearIngresoEgreso(ingresoEgreso: IngresoEgreso){
    const usuario = this.authService.getUser();
    return this.afDB.doc(`${usuario.uid}/ingresos-egresos`)
      .collection('items').add({...ingresoEgreso, uid: usuario.uid});
  }

  borrarIngresoEgreso(uid: string){
    const usuario = this.authService.getUser();
    return this.afDB.doc(`${usuario.uid}/ingresos-egresos/items/${uid}`).delete();
  }

  cancelarSubscriptions(){
    this.ieItemsSubscription.unsubscribe();
    this.ieListenerSubscription.unsubscribe();
    this.store.dispatch(new UnsetItemsAction());
  }
}
