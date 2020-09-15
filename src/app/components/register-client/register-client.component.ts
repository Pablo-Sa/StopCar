import { Component, DoCheck, OnInit } from '@angular/core';
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
export class RegisterClientComponent implements OnInit, DoCheck {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  completeFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder,
              private _snackBar: MatSnackBar,
              private clientService: ClientService) { }

  openSnackBar(message: string,) {
    this._snackBar.open(message, 'Ok',{
      duration: 2000,
      verticalPosition:'top'
    });
  }              

  ngDoCheck() {
    this.completeFormGroup = this._formBuilder.group({
      nome: [this.firstFormGroup.controls['nome'].value, Validators.required],     
      sobrenome: [this.firstFormGroup.controls['sobrenome'].value, Validators.required],  
      celular: [this.secondFormGroup.controls['celular'].value, Validators.required],
      fixo: [this.secondFormGroup.controls['fixo'].value, Validators.required],
      cnpjcpf: [this.secondFormGroup.controls['cnpjcpf'].value, Validators.required],
      endereco: this._formBuilder.group({
        rua: [this.secondFormGroup.controls['rua'].value, Validators.required],
        numero: [this.secondFormGroup.controls['numero'].value, Validators.required],
        bairro: [this.secondFormGroup.controls['bairro'].value, Validators.required]
      })    
  })
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
    this.clientService.insert(this.completeFormGroup.value)
    .then(
      sucess => this.openSnackBar(`Cliente Salvo Com Sucesso`),
      error => this.openSnackBar(`Ocorreu um Erro ao Salvar: ${error}`)
      );
    this.firstFormGroup.reset();
    this.secondFormGroup.reset();
    this.completeFormGroup.reset();
    console.log(this.completeFormGroup.value)
  }
}
