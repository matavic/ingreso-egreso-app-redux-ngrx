import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { IngresoEgresoService } from 'src/app/ingreso-egreso/ingreso-egreso.service';
import { Tipo } from 'src/app/ingreso-egreso/ingreso-egreso.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit, OnDestroy {

  nombre: string;
  subscription: Subscription = new Subscription();
  constructor(private authService: AuthService,
    private store: Store<AppState>, 
    private ieService: IngresoEgresoService) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.subscription = this.store.select('auth')
    .pipe(
      filter( auth => auth.user != null)
    )
    .subscribe( auth => this.nombre = auth.user.nombre as string)
  }

  logout(){
    this.authService.logout();
    this.ieService.cancelarSubscriptions();
  };

}
