import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { TableCrudService } from 'src/app/services/table-crud.service';

export interface TableRow {
  id: number,
  name: string,
  country: string,
  total: number
}

@Component({
  selector: 'app-table-crud',
  templateUrl: './table-crud.component.html',
  styleUrls: ['./table-crud.component.scss'],
  providers: [MessageService]
})
export class TableCrudComponent implements OnInit {

  tableRows: TableRow[] = [];
  clonedRows: { [s: string]: TableRow;} = {}

  constructor(private tableService: TableCrudService, private messageService: MessageService) {}

  ngOnInit() {
    this.tableService.getTableRows().subscribe(data => this.tableRows = data);
  }

  onRowEditInit(row: TableRow) {
      this.clonedRows[row.id] = {...row};
  }

  onRowEditSave(row: TableRow) {
      if (row.total > 0) {
          delete this.clonedRows[row.id];
          this.messageService.add({severity:'success', summary: 'Success', detail:'Tabela atualizada!'});
      }
      else {
          this.messageService.add({severity:'error', summary: 'Error', detail:'Total deve ser superior a 0'});
      }
  }

  onRowEditCancel(row: TableRow, index: number) {
    this.tableRows[index] = this.clonedRows[row.id];
    delete this.clonedRows[row.id];
  }

  newRow() {
    const lastIndex = this.tableRows.length + 1
    return { id: lastIndex, name: '', country: '', total: 1000};
  }

  deleteRow(row: TableRow, index: number) {
    delete this.tableRows[index];
  }
}
