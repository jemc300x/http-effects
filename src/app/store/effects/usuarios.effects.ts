import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { UsuarioService } from 'src/app/services/usuario.service';
import * as usuarioActions from '../actions/usuarios.actions';

@Injectable()
export class UsuariosEffects {
  constructor(
    private actions$: Actions,
    private usuarioService: UsuarioService
  ) {}

  cargarUsuarios$ = createEffect(
    () => this.actions$.pipe(
        ofType(usuarioActions.cargarUsuarios),
        tap(data => console.log('effect tap', data)),
        mergeMap(
          () => this.usuarioService.getUser()
            .pipe(
              map(users => usuarioActions.cargarUsuariosSucces({usuarios: users})),
              catchError(err => of(usuarioActions.cargarUsuariosError({payload: err})))
            )
        )
      )
  )

}