import { ClientInterface } from './../model/ClientInterface';
import { Injectable } from "@angular/core";
import { map } from 'rxjs/operators';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "@angular/fire/firestore";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root",
})
export class ClientService {
  private clientCollection: AngularFirestoreCollection<any> = this.db.collection("cliente");

  constructor(private db: AngularFirestore) {
    
  }

  insert(client: ClientInterface) {
    return this.clientCollection.add({...client})
    .then(sucess=> console.log('Usuário Salvo Com Sucesso.'));
  }

  getAll():Observable<ClientInterface[]>{
    return this.db.collection<ClientInterface>("cliente", 
    ref => ref.orderBy('nome', 'asc'))
    .snapshotChanges()
    .pipe(
      map(actions =>{ 
        return actions.map(
          item=>{
            const data = item.payload.doc.data() as ClientInterface;
            const id = item.payload.doc.id;
            return {id, ...data};
            })
      })
    );
  }

  delete(key: string) {
    return this.clientCollection.doc(key).delete();
  }

  update(object: ClientInterface) {
    return this.clientCollection.doc(object.id);
  }

}
