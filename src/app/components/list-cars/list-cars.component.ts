import { MatSnackBar } from "@angular/material/snack-bar";
import { CarsInterface } from "./../../model/CarsInterface";
import { CarsService } from "./../../shared/cars.service";
import { MatSort } from "@angular/material/sort";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { MatDialog } from "@angular/material/dialog";
import { ExclusionModalComponent } from "../modals/exclusion-modal/exclusion-modal.component";
import { EditModalCarsComponent } from "../modals/edit-modal-cars/edit-modal-cars.component";

@Component({
  selector: "app-list-cars",
  templateUrl: "./list-cars.component.html",
  styleUrls: ["./list-cars.component.css"],
  preserveWhitespaces: true,
})
export class ListCarsComponent implements OnInit {
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  ELEMENT_DATA: CarsInterface[] = [];
  displayedColumns: string[] = ["modelo", "ano", "cor", "placa", "acao"];
  dataSource = new MatTableDataSource();
  completeLoading: boolean;
  errorLoading: boolean;

  constructor(
    private carsService: CarsService,
    private dialog: MatDialog,
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

  deleteRow(id: string) {
    const dialogRef = this.dialog.open(ExclusionModalComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      if (result) {
        this.carsService.delete(id).then(
          (sucess) => this.openSnackBar("Registro Excluído com Sucesso."),
          (error) => this.openSnackBar(`Erro ao Excluír o Registro: ${error}`)
        );
      }
    });
  }

  updateRow(object: CarsInterface) {
    const dialogRef = this.dialog.open(EditModalCarsComponent, {
      data: object,
    });

    dialogRef.afterClosed().subscribe((result: CarsInterface) => {
      if (result) {
        console.log(result);

        const vehicleRef = this.carsService.update(result);

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

  loadClients() {
    this.carsService.getAll().subscribe(
      (data) => {
        console.log(data);
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.completeLoading = true;
        this.ELEMENT_DATA = data;
        this.paginator._intl.itemsPerPageLabel = "Itens por Página";
        console.log(this.ELEMENT_DATA);
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
