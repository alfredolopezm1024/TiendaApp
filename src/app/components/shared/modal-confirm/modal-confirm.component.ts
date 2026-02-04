import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

type BootstrapColor = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
type BgColor = `bg-${BootstrapColor}`;
type TextColor = `text-${BootstrapColor}` | 'text-white' | 'text-muted';
type ButtonColor = `btn-${BootstrapColor}`;

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styleUrls: ['./modal-confirm.component.css']
})
export class ModalConfirmComponent implements OnInit {

  @Input() modalId: string = '';  //ID del modal
  @Input() title: string = 'Confirmar Acción';//Titulo del modal
  @Input() titleIcon: string = 'bi bi-exclamation-triangle-fill'; //Icono del titulo
  @Input() titleColor: TextColor = 'text-white'; //Color del icono del titulo
  @Input() titleBgColor: BgColor = 'bg-danger'; //Color de fondo del header
  @Input() message: string = ''; //Mensaje principal
  @Input() itemText: string = ''; //El nombre del ítem
  @Input() warningMessage: string = ''; //Esta acción no se puede deshacer.
  @Input() confirmButtonText: string = 'Sí, Eliminar'; //Texto del boton
  @Input() confirmButtonColor: ButtonColor = 'btn-danger';//Color del boton
  @Input() cancelButtonText: string = 'Cancelar';//Texto del boton cancelar

  @Output() onConfirm = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  showTitleIcon(): boolean {
    return !(this.titleIcon.trim() == '');
  }

  showWarningMessage(): boolean {
    return !(this.warningMessage.trim() == '');
  }

  showCancelButton(): boolean {
    return !(this.cancelButtonText.trim() == '');
  }

  get showConfirmButton(): boolean { return this.onConfirm.observers.length>0;}

}
