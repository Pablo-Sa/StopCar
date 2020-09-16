import { CarsService } from './../../../shared/cars.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { CarsInterface } from "src/app/model/CarsInterface";

@Component({
  selector: "app-edit-modal-cars",
  templateUrl: "./edit-modal-cars.component.html",
  styleUrls: ["./edit-modal-cars.component.css"],
  preserveWhitespaces: true
})
export class EditModalCarsComponent implements OnInit {
  vehicleForm: FormGroup;

  constructor(private _formBuilder: FormBuilder,
              private _snackBar: MatSnackBar,
              private carsService: CarsService,
              @Inject(MAT_DIALOG_DATA) private data: CarsInterface
              ) {
                console.log(this.data)
              }

  openSnackBar(message: string,) {
    this._snackBar.open(message, 'Ok',{
      duration: 2000,
      verticalPosition:'top'
    });
  }              

  ngOnInit() {
    this.vehicleForm = this._formBuilder.group({
      modelo: [this.data.modelo, Validators.required],
      ano: [this.data.ano, Validators.required],
      cor: [this.data.cor, Validators.required],
      placa: [this.data.placa, Validators.required]
    });
  }

  saveVehicle(){
    console.log(this.vehicleForm.value);
    this.carsService.insert(this.vehicleForm.value)
    .then(sucess => this.openSnackBar('Veículo Atualizado Com Sucesso.'),
          error => this.openSnackBar(`Ocorreu um Erro ao tentar Atualizar: ${error}`));

    this.vehicleForm.reset();
    console.log('Inclusão Concluída com Sucesso.');
  }

}