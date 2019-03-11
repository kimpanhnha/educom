import { Product } from './../../store/product.store';
import { AddCategoryComponent } from './../add-category/add-category.component';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/auth/auth.service';
import { Observable } from 'rxjs';
import { StateKey } from '@angular/platform-browser';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  form:FormGroup;
  name:AbstractControl;
  price:AbstractControl;
  category:AbstractControl;

  filteredStates: Observable<any[]>; 
  states:Array<any>;

  constructor(
    public dialogRef: MatDialogRef<AddCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb:FormBuilder,
    public store:Product,
    private db: AngularFirestore,
    private auth:AuthService
    ) {}

  ngOnInit() {
    this.form=this.fb.group({
      name:[null,Validators.required],
      category:[null,Validators.required],
      price:[null,Validators.required],
    })
    this.name=this.form.controls["name"];
    this.category=this.form.controls["category"];
    this.price=this.form.controls["price"];
    this.store.fetchCategory(list=>{
      this.states=list;
    this.filteredStates = this.category .valueChanges
      .pipe(
        startWith(''),
        map(state => state ? this._filterStates(state) : this.states.slice())
      );
    })
}

  private _filterStates(value: any):any[] {
  const filterValue = value?value.key?value.name:value.toLowerCase():null;

  return this.states.filter(state => state.name && state.name.toLowerCase().indexOf(filterValue) === 0);
}
displayFn(user?: any): string | undefined {
  return user ? user.name : undefined;
}
_onSave(f){
  if(this.form.valid){
    this.form.disable();
    const {name,price,category}=f;
    const item:any={
      key:this.db.createId(),
      createBy:this.auth.getUser(),
      createDate: new Date(),
      name:name,
      price:price,
      category:category
    }
    this.store.save(item).then(()=>{
      this.form.enable();
      this.form.reset();
    }).catch(error=>{
      alert(error);
      this.form.enable();
    })
    }
  }
}