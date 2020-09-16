import { ClientInterface } from './../../model/ClientInterface';
import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/shared/client-service';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register-client',
  templateUrl: './register-client.component.html',
  styleUrls: ['./register-client.component.css'],
    providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }],
  preserveWhitespaces: true
})
export class RegisterClientComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder,
              private _snackBar: MatSnackBar,
              private clientService: ClientService) { }

  openSnackBar(message: string,) {
    this._snackBar.open(message, 'Ok',{
      duration: 2000,
      verticalPosition:'top'
    });
  }              

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required]
    });

    this.secondFormGroup = this._formBuilder.group({
      rua: ['', Validators.required],
      numero: ['', Validators.required],
      bairro: ['', Validators.required],
      celular: ['', Validators.required],
      fixo: ['', Validators.required],
      cnpjcpf: ['', Validators.required]
    });
  }

  saveClient(){
    const client:ClientInterface =  {
          ...this.firstFormGroup.value,
          "celular":this.secondFormGroup.controls['celular'].value,
          "fixo":this.secondFormGroup.controls['fixo'].value,
          "cnpjcpf":this.secondFormGroup.controls['cnpjcpf'].value,
          endereco: {
            "rua": this.secondFormGroup.controls['rua'].value,
            "numero": this.secondFormGroup.controls['numero'].value,
            "bairro": this.secondFormGroup.controls['bairro'].value,
          }
        };

    console.log(client);

    this.clientService.insert(client)
    .then(
      sucess => this.openSnackBar(`Cliente Salvo Com Sucesso`),
      error => this.openSnackBar(`Ocorreu um Erro ao Salvar: ${error}`)
      );
      
    this.firstFormGroup.reset();
    this.secondFormGroup.reset();
  }
}
