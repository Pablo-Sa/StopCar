import { ClientInterface } from './../model/ClientInterface';
import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from "@angular/fire/firestore";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root",
})
export class ClientService {
  private clienteCollection: AngularFirestoreCollection<ClientInterface> = this.db.collection("cliente");

  constructor(private db: AngularFirestore) {}

  insert(client: ClientInterface) {
    return this.clienteCollection.add({...client});
  }

  getAll():Observable<ClientInterface[]>{
    return this.clienteCollection.valueChanges();
  }

}
