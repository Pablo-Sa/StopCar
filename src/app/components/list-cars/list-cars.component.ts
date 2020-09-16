import { CarsInterface } from './../../model/CarsInterface';
import { CarsService } from './../../shared/cars.service';
import { MatSort } from '@angular/material/sort';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-list-cars',
  templateUrl: './list-cars.component.html',
  styleUrls: ['./list-cars.component.css'],
  preserveWhitespaces: true
})
export class ListCarsComponent implements OnInit {

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  
  ELEMENT_DATA: CarsInterface[] = [];
  displayedColumns: string[] = [
    "modelo",
    "ano",
    "cor",
    "placa",
    "acao"
  ];

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
