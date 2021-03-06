import { CarsInterface } from './../../model/CarsInterface';
import { CarsService } from './../../shared/cars.service';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import {  Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-register-cars',
  templateUrl: './register-cars.component.html',
  styleUrls: ['./register-cars.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }],
  preserveWhitespaces: true
})
export class RegisterCarsComponent implements OnInit{
  vehicleForm: FormGroup;

  constructor(private _formBuilder: FormBuilder,
              private _snackBar: MatSnackBar,
              private carsService: CarsService
              ) {}

  openSnackBar(message: string,) {
    this._snackBar.open(message, 'Ok',{
      duration: 2000,
      verticalPosition:'top'
    });
  }              

  ngOnInit() {
    this.vehicleForm = this._formBuilder.group({
      modelo: ['', Validators.required],
      ano: ['', Validators.required],
      cor: ['', Validators.required],
      placa: ['', Validators.required]
    });
  }

  saveVehicle(){
    console.log(this.vehicleForm.value);
    this.carsService.insert(this.vehicleForm.value)
    .then(sucess => this.openSnackBar('Veículo Cadastrado Com Sucesso.'),
          error => this.openSnackBar(`Ocorreu um Erro ao tentar Salvar: ${error}`));

    this.vehicleForm.reset();
    console.log('Inclusão Concluída com Sucesso.');
  }

}
