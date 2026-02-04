import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TableHeader } from 'src/app/components/shared/custom-table/table.header';
import { Articulo, Tienda } from 'src/app/models';
import { ArticuloService, TiendaService } from 'src/app/services';

@Component({
  selector: 'app-articulo-tienda',
  templateUrl: './articulo-tienda.component.html',
  styleUrls: ['./articulo-tienda.component.css']
})
export class ArticuloTiendaComponent implements OnInit {

  
  listTienda: Tienda[] = [];
  tienda: Tienda = {
    id: 0,
    sucursal: '',
    direccion: ''
  };

  articulo: Articulo = {
      id: 0,
      codigo: '',
      descripcion: '',
      precio: undefined,
      stock: undefined,
      imagen: ''
    };

  isViewMode: boolean = false;
  
  tableHeaders : TableHeader[] = [
    { key: 'id', label: 'ID' },
    { key: 'sucursal', label: 'Sucursal' },
    { key: 'direccion', label: 'Dirección' }
  ];

  constructor(
    private tiendaService: TiendaService,
    private articuloService: ArticuloService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');

    this.getTiendasByArticuloId(Number(id));
    this.getArticuloById(Number(id));
  }

  getTiendasByArticuloId(id: number){
    this.articuloService.getTiendasByArticuloId(id).subscribe(
      {
        next: (data: Tienda[]) => {
          this.listTienda = data;
        },
        error: (err) => {
          console.error('Error fetching tiendas:', err);
        }
      }
    )
  }

  getArticuloById(id: number){
    this.articuloService.getById(id).subscribe(
      {
        next: (data) => {
          this.articulo = data;
        },
        error: (err) => {
          console.error('Error fetching articulo:', err);
        }
      }
    )
  }
}
