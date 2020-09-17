import { ClientInterface } from './../../../model/ClientInterface';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, DoCheck, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-client-modal',
  templateUrl: './edit-client-modal.component.html',
  styleUrls: ['./edit-client-modal.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }],
  preserveWhitespaces: true
})
export class EditClientModalComponent implements OnInit, DoCheck {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  currentClient: ClientInterface;

  constructor(private _formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) private data: ClientInterface) {
                console.log(this.data);
               }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      id: [this.data.id, Validators.required],
      nome: [this.data.nome, Validators.required],
      sobrenome: [this.data.sobrenome, Validators.required]
    });

    this.secondFormGroup = this._formBuilder.group({
      rua: [this.data.endereco.rua, Validators.required],
      numero: [this.data.endereco.numero, Validators.required],
      bairro: [this.data.endereco.bairro, Validators.required],
      celular: [this.data.celular, Validators.required],
      fixo: [this.data.fixo, Validators.required],
      cnpjcpf: [this.data.cnpjcpf, Validators.required]
    });
  }

  ngDoCheck(){
    this.currentClient =  {
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
  }

}
