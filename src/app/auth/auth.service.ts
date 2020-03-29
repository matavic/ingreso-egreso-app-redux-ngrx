import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import * as firebase from 'firebase';
import { map } from 'rxjs/operators'
import { User } from './user.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../shared/ui.actions';
import { AppState } from '../app.reducer';
import { SetUserAction } from './auth.actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubscription : Subscription = new Subscription();

  constructor(private afAuth: AngularFireAuth,
    private router: Router,
    private afDB: AngularFirestore,
    private store: Store<AppState>) { }

    initAuthListener(){
      this.afAuth.authState.subscribe( (fbUser: firebase.User) => {
        if(fbUser){
          this.userSubscription = this.afDB.doc(`${fbUser.uid}/usuario`).valueChanges().subscribe( (usuarioObj: any) => {
            const newUser = new User(usuarioObj);
            this.store.dispatch(new SetUserAction(newUser));
          })
        } else {
          this.userSubscription.unsubscribe();
        }
      })
    }

  crearUsuario(nombre, email, password){
    const loadingAction = new ActivarLoadingAction();
    this.store.dispatch(loadingAction);
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then( resp => {
        const user: User = {
          uid: resp.user.uid,
          nombre: nombre,
          email: resp.user.email
        }
        this.afDB.doc(`${user.uid}/usuario`).set(user)
        .then( () => {
          this.router.navigate(['/']);
          this.store.dispatch(new DesactivarLoadingAction());
        });
      })
      .catch( error => {
        console.error(error);
        this.store.dispatch(new DesactivarLoadingAction());
        swal.fire('Error en la creación del usuario', error.message, 'error');
      });
  }

  login(email, password){
    this.store.dispatch(new ActivarLoadingAction());
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
    .then( resp => {
      this.router.navigate(['/']);
      this.store.dispatch(new DesactivarLoadingAction());
    })
    .catch( error => {
      console.error(error);
      this.store.dispatch(new DesactivarLoadingAction());
      swal.fire('Error en el login', error.message, 'error');
    });
  }

  logout(){
    this.store.dispatch(new ActivarLoadingAction());
    this.router.navigate(['/login']);
    this.afAuth.auth.signOut();
    this.store.dispatch(new DesactivarLoadingAction());
  }
  
  isAuthenticated(){
    return this.afAuth.authState
      .pipe(
        map( fbUser => {
          if(fbUser === null)
            this.router.navigate(['/login']);
          return fbUser !== null
        })
      );
  }
}
