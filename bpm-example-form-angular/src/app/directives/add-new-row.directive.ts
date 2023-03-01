import { Directive, HostListener, Input } from '@angular/core';
import { Table } from 'primeng/table';

@Directive({
  selector: '[pAddNewRow]'
})
export class AddNewRowDirective {
  @Input() table!: Table;
  @Input() newRow: any;

  @HostListener('click', ['$event'])
  onClick(event: Event) {
    //Insert new row
    this.table.value.push(this.newRow);
    // Set new row in edit mode
    this.table.initRowEdit(this.newRow);
    event.preventDefault();
  }

}
