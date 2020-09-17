import { EditClientModalComponent } from './../modals/edit-client-modal/edit-client-modal.component';
import { MatSnackBar } from "@angular/material/snack-bar";
import { ClientInterface } from "./../../model/ClientInterface";
import { ClientService } from "./../../shared/client-service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { ExclusionModalComponent } from '../modals/exclusion-modal/exclusion-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: "app-list-clients",
  templateUrl: "./list-clients.component.html",
  styleUrls: ["./list-clients.component.css"],
})
export class ListClientsComponent implements OnInit {
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

  constructor(
    private clientService: ClientService,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog
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

  updateRow(object: ClientInterface) {
    const dialogRef = this.dialog.open(EditClientModalComponent, {
      data: object,
      maxHeight: '600px',
    });

    dialogRef.afterClosed().subscribe((result: ClientInterface) => {
      if (result) {
        console.log(result);

        const vehicleRef = this.clientService.update(result);

        vehicleRef.get().subscribe((doc) => {
          if (doc) {
            vehicleRef.update(result);
            this.openSnackBar("Registro Atualizado com Sucesso.");
          } else {
            this.openSnackBar("Registro Não Pode Ser Atualizado");
          }
        });

        console.log("Alteração Concluída com Sucesso.");
      }
    });
  }

  deleteRow(id: string) {
    const dialogRef = this.dialog.open(ExclusionModalComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      if (result) {
        this.clientService.delete(id).then(
          (sucess) => this.openSnackBar("Registro Excluído com Sucesso."),
          (error) => this.openSnackBar(`Erro ao Excluír o Registro: ${error}`)
        );
      }
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
