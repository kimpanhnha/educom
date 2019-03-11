import { Category } from './../../store/category.store';
import { MatDialog, MatSnackBarModule, MatSnackBar } from '@angular/material';
import { AddCategoryComponent } from './../../dialog/add-category/add-category.component';
import { Component, OnInit } from '@angular/core';
import { DeleteComponent } from 'src/app/components/delete/delete.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  displayedColumns= ['name','email','action'];

  constructor(private dialog:MatDialog, 
    private snackBar:MatSnackBar,
    public store:Category) { }

  ngOnInit() {
    this.store.fetchData();
    
  }
  create(){
    const dialogRef = this.dialog.open(AddCategoryComponent, {
      width: '35vw',
      data: null
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  delete(item){
    const dialogRef=this.dialog.open(DeleteComponent, {
      width: '250px',
      data: {title: "Delete Category", subtitle: "Are you sure you want to delete category"}
    });
    dialogRef.afterClosed().subscribe(result => {
     if(result==='yes'){
      this.store.delete(item,(success,error)=>{
        if(success){
          this.snackBar.open("Category has been delete successfully.", 
          "Done", 
          {
            duration: 2000,
          }); 
        }
        else{
          this.snackBar.open(error, "Error");
          }
        })
     }
    }); 
   }
  }
