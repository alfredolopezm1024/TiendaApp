import { Articulo } from "../articulo.mode";

export interface ArticuloCreate extends Omit<Articulo, 'id'> {
  TiendaId: number;
}