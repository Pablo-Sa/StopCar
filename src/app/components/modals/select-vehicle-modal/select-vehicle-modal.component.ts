import { EditModalCarsComponent } from './../edit-modal-cars/edit-modal-cars.component';
import { ExclusionModalComponent } from './../exclusion-modal/exclusion-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { CarsService } from './../../../shared/cars.service';
import { MatTableDataSource } from '@angular/material/table';
import { CarsInterface } from './../../../model/CarsInterface';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-select-vehicle-modal',
  templateUrl: './select-vehicle-modal.component.html',
  styleUrls: ['./select-vehicle-modal.component.css']
})
export class SelectVehicleModalComponent implements OnInit {

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  ELEMENT_DATA: CarsInterface[] = [];
  displayedColumns: string[] = ["modelo", "ano", "cor", "placa", "selecionar"];
  dataSource = new MatTableDataSource();
  completeLoading: boolean;
  errorLoading: boolean;

  constructor(private carsService: CarsService) {
    this.loadClients();
  }

  ngOnInit() {}

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
