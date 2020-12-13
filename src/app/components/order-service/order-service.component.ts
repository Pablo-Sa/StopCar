import { ClientInterface } from './../../model/ClientInterface';
import { SelectClientModalComponent } from './../modals/select-client/select-client-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup } from '@angular/forms';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-order-service',
  templateUrl: './order-service.component.html',
  styleUrls: ['./order-service.component.css'],
  preserveWhitespaces: true
})
export class OrderServiceComponent implements OnInit {
  panelOpenState = false;
  isCheckedGarantia = false;
  isCheckedEmitirRecibo = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  @ViewChild('nameCliente',{static:false}) nameCliente: ElementRef;

  constructor(private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog) { }

    selectCliente(){
      const dialogRef = this.dialog.open(SelectClientModalComponent, {
        width: '90%'
      });

      dialogRef.afterClosed().subscribe((client:ClientInterface) =>{
        this.nameCliente.nativeElement.value = client ? client.nome: null;
        this.openSnackBar(`Cliente ${client.nome} Informado com Sucesso.`);
      })

    }

    openSnackBar(message: string) {
      this._snackBar.open(message, "Ok", {
        duration: 2000,
        verticalPosition: "top",
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

}
