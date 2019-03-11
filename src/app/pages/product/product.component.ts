import { MatDialog } from '@angular/material';
import { Product } from 'src/app/store/product.store';
import { Component, OnInit } from '@angular/core';
import { AddProductComponent } from 'src/app/dialog/add-product/add-product.component';
import { UploadCoverComponent } from 'src/app/dialog/upload-cover/upload-cover.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  displayedColumns= ['name','price','category','action'];

  constructor(public store:Product,
     private dialog:MatDialog
    ) { }

  ngOnInit() {
    this.store.fectchData()
  }

  create(){
    const dialogRef = this.dialog.open(AddProductComponent, {
      width: '35vw',
      data: null
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  onUpdateCover(item){
    const dialogRef = this.dialog.open(UploadCoverComponent, {
      width: '35w',
      data:item
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
