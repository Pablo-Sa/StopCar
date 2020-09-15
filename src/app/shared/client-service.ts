import { ClientModel } from "./../model/ClientModel";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from "@angular/fire/firestore";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root",
})
export class ClientService {
  private clienteCollection: AngularFirestoreCollection<ClientModel> = this.db.collection("cliente");

  constructor(private db: AngularFirestore) {}

  insert(client: ClientModel) {
    return this.clienteCollection.add({...client});
  }

  getAll():Observable<ClientModel[]>{
    return this.clienteCollection.valueChanges();
  }

}
