import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TableHeader } from 'src/app/components/shared/custom-table/table.header';
import { Articulo } from 'src/app/models';
import { ArticuloService } from 'src/app/services';

declare var bootstrap: any;

@Component({
  selector: 'app-articulo',
  templateUrl: './articulo.component.html',
  styleUrls: ['./articulo.component.css']
})
export class ArticuloComponent implements OnInit {

  listArticulo: Articulo[] = [];
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
    { key: 'codigo', label: 'Código' },
    { key: 'descripcion', label: 'Descripción' },
    { key: 'precio', label: 'Precio' },
    { key: 'stock', label: 'Cantidad' }
  ];

  constructor(
    private articuloService: ArticuloService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getArticulos();
  }

  getArticulos(){
    this.articuloService.getAll().subscribe(
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

  viewArticulo(articulo: Articulo){
      this.clearForm();
      this.isViewMode = true;
      this.articulo = { ...articulo };

      const dataImage = this.articulo.imagen;

      if(dataImage && !dataImage.startsWith('data:image/')) {
        const mimeType = this.getMimeType(dataImage);
        this.articulo.imagen = `data:${mimeType};base64,${dataImage}`;
      }


      this.openModal('modalArticulo');
    }

  editArticulo(articulo: Articulo){
    this.clearForm();
    this.isViewMode = false;
    this.articulo = { ...articulo };    

    this.articulo.imagen = this.loadImageFromBase64(this.articulo.imagen);

    this.openModal('modalArticulo');
  }

  deleteArticulo(articulo: Articulo) {
    this.clearForm();
    this.articulo = { ...articulo };
    this.openModal('modalEliminar');
  }

  saveArticulo(){
    if(this.articulo.id === 0){
      
      this.articuloService.create(this.articulo).subscribe({
        next: (data: Articulo) => {
          this.getArticulos();
        },
        error: (err) => {
          console.error('Error al registrar el articulo:', err);
        }
      });

    } else {
      this.articuloService.update(this.articulo.id, this.articulo).subscribe({
        next: (data: Articulo) => {
          this.getArticulos();
        },
        error: (err) => {
          console.error('Error al actualizar el articulo:', err);
        }
      }); 
    }
  }

  delete() {
    if (this.articulo.id !== 0) {
      this.articuloService.delete(this.articulo.id).subscribe({
        next: () => {
          this.getArticulos();
          this.clearForm();
        },
        error: (err) => console.error('Error al eliminar:', err)
      });
    }
  }

  goToTiendas(articulo: Articulo) {
    this.router.navigate([`/articulo/${articulo.id}/tiendas`]);
  }

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

  loadImageFromBase64(dataImage: string): string {
    if(dataImage && !dataImage.startsWith('data:image/')) {
      const mimeType = this.getMimeType(dataImage);
      return `data:${mimeType};base64,${dataImage}`;
    }else {
      return dataImage;
    }
  }

  getMimeType(base64String: string): string {
    if (!base64String) return 'image/jpeg';
    switch (base64String.charAt(0)) {
      case '/': return 'image/jpeg';
      case 'i': return 'image/png';
      case 'R': return 'image/gif';
      case 'U': return 'image/webp';
      default: return 'image/jpeg';
    }
  }
}
