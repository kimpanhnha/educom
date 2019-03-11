import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private db:AngularFirestore) { }

  categoryRef(){
    return this.db.collection("category")
  }
  productRef(){
    return this.db.collection("product")
  }

}
