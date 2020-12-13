import { MatSnackBar } from '@angular/material/snack-bar';
import { ClientService } from '../../../shared/client-service';
import { MatTableDataSource } from '@angular/material/table';
import { ViewChild } from '@angular/core';
import { ClientInterface } from '../../../model/ClientInterface';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-select-client',
  templateUrl: './select-client-modal.component.html',
  styleUrls: ['./select-client-modal.component.css']
})
export class SelectClientModalComponent implements OnInit {
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  ELEMENT_DATA: ClientInterface[] = [];
  displayedColumns: string[] = [
    "nome",
    "sobrenome",
    "cnpjcpf",
    "celular",
    "fixo",
    "selecionar"
  ];

  dataSource = new MatTableDataSource();
  completeLoading: boolean;
  errorLoading: boolean;

  constructor(
    private clientService: ClientService,
    private _snackBar: MatSnackBar
  ) {
    this.loadClients();
  }

  ngOnInit() {}

  openSnackBar(message: string) {
    this._snackBar.open(message, "Ok", {
      duration: 2000,
      verticalPosition: "top",
    });
  }


  loadClients() {
    this.clientService.getAll().subscribe(
      (data) => {
        console.log(data);
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.completeLoading = true;
        this.ELEMENT_DATA = data;
        this.paginator._intl.itemsPerPageLabel = "Items por Página";
      },
      (error) => {
        this.errorLoading = true;
        console.log(this.errorLoading);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
