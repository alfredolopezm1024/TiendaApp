import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TableHeader } from './table.header';

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.css']
})
export class CustomTableComponent implements OnInit {

  @Input() headers: TableHeader[] = [];
  @Input() data: any[] = [];
  @Input() rowTitle: string = '';

  @Output() onView = new EventEmitter<any>();
  @Output() onEdit = new EventEmitter<any>();
  @Output() onDelete = new EventEmitter<any>();
  @Output() onRowDoubleClick = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  getValue(item: any, key: string) {
    return item[key];
  }

  get showViewButton(): boolean { return this.onView.observers.length>0;}
  get showEditButton(): boolean { return this.onEdit.observers.length>0;}
  get showDeleteButton(): boolean { return this.onDelete.observers.length>0;}
  get activeRowDoubleClick(): boolean { return this.onRowDoubleClick.observers.length>0;}

  get showActionsColumn(): boolean {
    return this.showViewButton || this.showEditButton || this.showDeleteButton;
  }
}
