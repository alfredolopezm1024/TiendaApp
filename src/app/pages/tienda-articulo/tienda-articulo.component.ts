import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TableHeader } from 'src/app/components/shared/custom-table/table.header';
import { Articulo, Tienda } from 'src/app/models';
import { ArticuloCreate } from 'src/app/models/dto/articulo.create';
import { ArticuloService } from 'src/app/services/articulo.service';
import { TiendaService } from 'src/app/services/tienda.service';

declare var bootstrap: any;

@Component({
  selector: 'app-tienda-articulo',
  templateUrl: './tienda-articulo.component.html',
  styleUrls: ['./tienda-articulo.component.css']
})
export class TiendaArticuloComponent implements OnInit {

  tienda : Tienda = {
    id: 0,
    sucursal: '',
    direccion: ''
  };

  listArticulo: Articulo[] = [];
  articulo: Articulo = {
    id: 0,
    codigo: '',
    descripcion: '',
    precio: undefined,
    stock: undefined,
    imagen: ''
  };

  createArticuloDto: ArticuloCreate = {
    codigo: '',
    descripcion: '',
    precio: undefined,
    stock: undefined,
    imagen: '',
    TiendaId: 0
  };

  isViewMode: boolean = false;

  tableHeaders : TableHeader[] = [
    { key: 'id', label: 'ID' },
    { key: 'codigo', label: 'Código' },
    { key: 'descripcion', label: 'Descripción' },
    { key: 'precio', label: 'Precio' },
    { key: 'stock', label: 'Cantidad' }
  ];

  constructor(
    private tiendaService: TiendaService,
    private articuloService: ArticuloService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');

    this.getArticulosByTiendaId(Number(id));
    this.getTiendaById(Number(id));
  }

  getTiendaById(id: number){
    this.tiendaService.getById(id).subscribe(
      {
        next: (data: Tienda) => {
          this.tienda = data;
        },
        error: (err) => {
          console.error('Error fetching tienda:', err);
        }
      }
    )
  }

  getArticulosByTiendaId(id: number){
    this.tiendaService.getArticulosByTiendaId(id).subscribe(
      {
        next: (data: Articulo[]) => {
          this.listArticulo = data;
        },
        error: (err) => {
          console.error('Error fetching articulos:', err);
        }
      }
    )
  }

  newArticulo() {
    this.clearForm();
    this.isViewMode = false;
    this.openModal('modalArticulo');
  }

  viewArticulo(articulo: Articulo){}

  editArticulo(articulo: Articulo){}

  deleteArticulo(articulo: Articulo){}

  clearForm() {
    this.articulo = {
      id: 0,
      codigo: '',
      descripcion: '',
      precio: undefined,
      stock: undefined,
      imagen: ''
    };
  }

  openModal(modalId: string) {
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  saveArticulo(){
    if(this.articulo.id === 0){

      const newArticulo: ArticuloCreate = {
        codigo: this.articulo.codigo,
        descripcion: this.articulo.descripcion,
        precio: this.articulo.precio,
        stock: this.articulo.stock,
        imagen: this.articulo.imagen,
        TiendaId: this.tienda.id
      };

      this.articuloService.create(this.articulo).subscribe({
        next: (data: Articulo) => {
          this.getArticulosByTiendaId(this.tienda.id);
        },
        error: (err) => {
          console.error('Error al registrar el articulo:', err);
        }
      });

    } else {
    }
  }

  validateInteger($event : any) {
    const inputElement = $event.target;
    const cleanValue = inputElement.value.replace(/[^0-9]/g, '');

    const numericValue = Number(cleanValue);
    this.articulo.stock = cleanValue !== '' 
      ? Math.floor(Math.max(0, numericValue))
      : undefined;
    inputElement.value = cleanValue;
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      if ( file.size > (6 * 1024 * 1024)) {
        alert('La imagen no debe ser mayor a 6MB.');
        event.target.value = '';
        return;
      }

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.articulo.imagen = e.target.result;
      };

      reader.onerror = (e) => {
        console.error('Error al leer el la imagen:', e);
      }

      reader.readAsDataURL(file);
    }
  }
  
}
