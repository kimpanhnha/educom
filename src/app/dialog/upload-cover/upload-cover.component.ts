import { Observable } from 'rxjs';
import { Product } from './../../store/product.store';
import { AngularFirestore } from '@angular/fire/firestore';
import { MATERIAL_MODULE } from './../../material/material.module';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-upload-cover',
  templateUrl: './upload-cover.component.html',
  styleUrls: ['./upload-cover.component.scss']
})
export class UploadCoverComponent implements OnInit {
  file:any;
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  constructor(public dialogRef: MatDialogRef<UploadCoverComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public storage:AngularFirestore,
    public store:Product
    
    ) { }

  ngOnInit() {
  }
  uploadFile(event){
    this.file = event.target.files[0];
    console.log(this.file);
  }
  _onSave(){
    if(this.file){
      const {name}=this.file;
      const filePath = `${this.data.key}/${name}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, this.file);
      this.uploadPercent = task.percentageChanges();
      task.snapshotChanges().pipe(
        finalize(() => this.downloadURL = fileRef.getDownloadURL() )
     )
    .subscribe(req=>{
      fileRef.getDownloadURL().subscribe(file=>{
        if(file){
          this.store.updateCover(this.data,file,req=>{
            alert("Success")
          });
        }
      })
    })
    }
    
  }
}

