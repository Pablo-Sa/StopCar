import { ClientInterface } from "./../../model/ClientInterface";
import { ClientService } from "./../../shared/client-service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from '@angular/material/sort';

@Component({
  selector: "app-list-clients",
  templateUrl: "./list-clients.component.html",
  styleUrls: ["./list-clients.component.css"],
})
export class ListClientsComponent implements OnInit{
  
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  
  ELEMENT_DATA: ClientInterface[] = [];
  displayedColumns: string[] = [
    "nome",
    "sobrenome",
    "cnpjcpf",
    "celular",
    "fixo",
    "editar",
    "excluir",
  ];

  dataSource = new MatTableDataSource();
  completeLoading: boolean;
  errorLoading: boolean;

  constructor(private clientService: ClientService) {
    this.loadClients();
    
  }

  ngOnInit() {}

  loadClients() {
    this.clientService.getAll().subscribe(
      (data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.completeLoading = true;
        this.ELEMENT_DATA = data;
        this.paginator._intl.itemsPerPageLabel = "Items por Página";
        console.log(this.ELEMENT_DATA)
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
