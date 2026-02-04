import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TableHeader } from 'src/app/components/shared/custom-table/table.header';
import { Tienda } from 'src/app/models';
import { TiendaService } from 'src/app/services/tienda.service';

declare var bootstrap: any;

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css']
})
export class TiendaComponent implements OnInit {

  listTienda: Tienda[] = [];
  tienda: Tienda = {
    id: 0,
    sucursal: '',
    direccion: ''
  };

  isViewMode: boolean = false;

  tableHeaders : TableHeader[] = [
    { key: 'id', label: 'ID' },
    { key: 'sucursal', label: 'Sucursal' },
    { key: 'direccion', label: 'Dirección' }
  ];

  constructor(
    private tiendaService: TiendaService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getTiendas();
  }

  getTiendas(){
    
    this.tiendaService.getAll().subscribe(
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

  newTienda() {
    this.clearForm();
    this.isViewMode = false;
    this.openModal('modalTienda');
  }

  viewTienda(tienda: Tienda){
    this.clearForm();
    this.isViewMode = true;
    this.tienda = { ...tienda };
    this.openModal('modalTienda');
  }

  editTienda(tienda: Tienda){
    this.clearForm();
    this.isViewMode = false;
    this.tienda = { ...tienda };    
    this.openModal('modalTienda');
  }

  deleteTienda(tienda: Tienda) {
    this.clearForm();
    this.tienda = { ...tienda };
    this.openModal('modalEliminar');
  }

  goToInventory(tienda: Tienda) {
    this.router.navigate([`/tienda/${tienda.id}/articulos`]);
  }

  openModal(modalId: string) {
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  saveTienda(){
    if(this.tienda.sucursal || this.tienda.direccion){
      if(this.tienda.id === 0){
        this.tiendaService.create(this.tienda).subscribe({
          next: () => {
            this.getTiendas();
            this.clearForm();
          },
          error: (err) => {
            console.error('[ERROR]:', err);
          }
        });
      } else {
        this.tiendaService.update(this.tienda.id, this.tienda).subscribe({
          next: () => {
            this.getTiendas();
            this.clearForm();
          },
          error: (err) => {
            console.error('[ERROR]:', err);
          }
        });
      }
    }
  }

  clearForm() {
    this.tienda = { id: 0, sucursal: '', direccion: '' };
  }

  delete(){
    if (this.tienda.id !== 0) {
      this.tiendaService.delete(this.tienda.id).subscribe({
        next: () => {
          this.getTiendas();
          this.clearForm();
        },
        error: (err) => console.error('Error al eliminar:', err)
      });
    }
  }


  
}
