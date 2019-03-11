import { AuthService } from 'src/app/auth/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Category } from './../../store/category.store';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit,Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ICategory } from 'src/app/interfaces/category';
@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  form:FormGroup;
  name:AbstractControl;

  constructor(
    public dialogRef: MatDialogRef<AddCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb:FormBuilder,
    public store:Category,
    private db: AngularFirestore,
    private auth:AuthService
    ) {}

  ngOnInit() {
    this.form=this.fb.group({
      name:[null,Validators.required]
    })
    this.name=this.form.controls["name"];
  }
  _onSave(f:any){
    if(this.form.valid){
      this.form.disable();
      const {name}=f;
      const item: ICategory={
        key:this.db.createId(),
         createBy:this.auth.getUser(),
         createDate:new Date(),
         name:name
      }
      this.store.add(item).then(()=>{
        this.form.enable();
        this.form.reset();
      }).catch(error=>{
        alert(error);
        this.form.enable();
      })
    }
  }
}
