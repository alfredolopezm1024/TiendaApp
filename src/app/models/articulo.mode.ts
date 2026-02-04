export interface Articulo {
  id: number;
  codigo: string;
  descripcion: string;
  precio: number | undefined;
  stock: number | undefined;
  imagen: string;
}