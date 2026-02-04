import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models';
import { ClienteService } from 'src/app/services/cliente.service';

declare var bootstrap: any;

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  listCliente: Cliente[] = [];
  cliente: Cliente = {
    id: 0,
    nombre: '',
    apellidos: '',
    direccion: '',
    correo: ''
  };
  isViewMode: boolean = false;

  tableHeaders = [
    { key: 'id', label: 'ID' },
    { key: 'nombre', label: 'Nombre' },
    { key: 'apellidos', label: 'Apellidos' },
    { key: 'direccion', label: 'Dirección' },
    { key: 'correo', label: 'Correo' }
  ];

  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.getClientes();
  }

  getClientes(){
    this.clienteService.getAll().subscribe(
      {
        next: (data: Cliente[]) => {
          this.listCliente = data;
        },
        error: (err) => {
          console.error('Error fetching clientes:', err);
        }
      }
    )
  }

  newCliente() {
    this.clearForm();
    this.isViewMode = false;
    this.openModal('modalCliente');
  }

  viewCliente(cliente: Cliente){
    this.clearForm();
    this.isViewMode = true;
    this.cliente = { ...cliente };
    this.openModal('modalCliente');
  }

  editCliente(cliente: Cliente){
    this.clearForm();
    this.isViewMode = false;
    this.cliente = { ...cliente };    
    this.openModal('modalCliente');
  }

  deleteCliente(cliente: Cliente){
    this.clearForm();
    this.cliente = { ...cliente };
    this.openModal('modalEliminar');
  }

  openModal(modalId: string) {
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  saveCliente(){
    if(this.cliente.nombre 
      || this.cliente.apellidos 
      || this.cliente.direccion 
      || this.cliente.correo){
      if(this.cliente.id === 0){
        this.clienteService.create(this.cliente).subscribe({
          next: () => {
            this.getClientes();
            this.clearForm();
          },
          error: (err) => {
            console.error('[ERROR]:', err);
          }
        });
      } else {
        this.clienteService.update(this.cliente.id, this.cliente).subscribe({
          next: () => {
            this.getClientes();
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
    this.cliente = {
      id: 0,
      nombre: '',
      apellidos: '',
      direccion: '',
      correo: ''
    };
  }

    delete(){
    if (this.cliente.id !== 0) {
      this.clienteService.delete(this.cliente.id).subscribe({
        next: () => {
          this.getClientes();
          this.clearForm();
        },
        error: (err) => console.error('Error al eliminar:', err)
      });
    }
  }
}
