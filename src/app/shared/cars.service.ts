import { CarsModel } from './../model/CarsModel';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  private clienteCollection: AngularFirestoreCollection<CarsModel> = this.db.collection("veiculos");

  constructor(private db: AngularFirestore) {}

  insert(cars: CarsModel) {
    return this.clienteCollection.add({...cars});
  }

  getAll():Observable<CarsModel[]>{
    return this.clienteCollection.valueChanges();
  }

}
