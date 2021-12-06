import { createAction, props } from "@ngrx/store";
import { Usuario } from "src/app/models/usuario.model";

export const cargarUsuarios = createAction(
  '[Usuarios] Cargar Usuarios'
);

export const cargarUsuariosSucces = createAction(
  '[Usuarios] Cargar Usuarios Succes',
  props<{usuarios: Usuario[]}>()
);

export const cargarUsuariosError = createAction(
  '[Usuarios] Cargar Usuarios Error',
  props<{payload: any}>()
);