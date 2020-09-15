import { CarsInterface } from './../model/CarsInterface';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  private clienteCollection: AngularFirestoreCollection<CarsInterface> = this.db.collection("veiculos");

  constructor(private db: AngularFirestore) {}

  insert(cars: CarsInterface) {
    return this.clienteCollection.add({...cars});
  }

  getAll():Observable<CarsInterface[]>{
    return this.clienteCollection.valueChanges();
  }

}
