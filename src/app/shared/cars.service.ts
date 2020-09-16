import { CarsInterface } from "./../model/CarsInterface";
import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class CarsService {
  private carsCollection: AngularFirestoreCollection<
    CarsInterface
  > = this.db.collection("veiculos");

  constructor(private db: AngularFirestore) {}

  insert(cars: CarsInterface) {
    return this.carsCollection.add({ ...cars });
  }

  getAll(): Observable<CarsInterface[]> {
    return this.db
      .collection<CarsInterface>("veiculos")
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((item) => {
            const data = item.payload.doc.data() as CarsInterface;
            const id = item.payload.doc.id;
            return { id, ...data };
          });
        })
      );
  }

  delete(key: string) {
    return this.carsCollection.doc(key).delete();
  }

  update(object: CarsInterface) {
    return this.carsCollection.doc(object.id).update(object);
  }
}
