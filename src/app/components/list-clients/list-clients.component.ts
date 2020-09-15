import { ClientInterface } from "./../../model/ClientInterface";
import { ClientService } from "./../../shared/client-service";
import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: "app-list-clients",
  templateUrl: "./list-clients.component.html",
  styleUrls: ["./list-clients.component.css"],
})
export class ListClientsComponent implements OnInit {

  ELEMENT_DATA: ClientInterface[] = [];
  displayedColumns: string[] = ["nome", "sobrenome", "cnpjcpf","celular","fixo","editar","excluir"];
  dataSource = new MatTableDataSource(null);
  completeLoading:boolean;
  errorLoading: boolean;

  constructor(private clientService: ClientService) {
    this.loadClients();
  }

  ngOnInit() {}

  loadClients() {
    this.clientService.getAll().subscribe(
    data => {
      this.dataSource = new MatTableDataSource(data)
      this.completeLoading = true;
      },
    error => {
      this.errorLoading = true
      console.log(this.errorLoading)
      }
    );

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
