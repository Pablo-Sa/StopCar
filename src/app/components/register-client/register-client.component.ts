import { ClientModel } from './../../model/ClientModel';
import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/shared/client-service';

@Component({
  selector: 'register-client',
  templateUrl: './register-client.component.html',
  styleUrls: ['./register-client.component.css']
})
export class RegisterClientComponent implements OnInit {

  public client: ClientModel;

  constructor(private clientService: ClientService) { 
    this.client = new ClientModel();
    this.client.nome = 'Pablo';
    this.client.sobrenome = 'Vinícius';
    this.client.endereco = 'Rua Da Engenharia Civil';
    this.client.celular = 'Vivo';
    this.client.fixo = 'Nao';
    this.client.CNPJCPF = 'ff'
  }

  ngOnInit() {
  }

  teste(){
    console.log('Iniciando')
    this.clientService.insert(this.client);
  } 

}
