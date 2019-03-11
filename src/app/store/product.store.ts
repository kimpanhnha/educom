import { ICategory } from './../interfaces/category';
import { Injectable } from "@angular/core";
import { observable, action } from 'mobx-angular';
import { DataService } from '../services/data.service';
import { callbackify } from 'util';
import { Action } from 'rxjs/internal/scheduler/Action';


@Injectable()
export class Product{

    @observable
    public data=[];
    @observable
    public loading=false;
    @observable
    public empty=false;
    @observable
    public process=false;

    constructor(private ds:DataService){}
    
    @action
    updateCover(product,fileUrl,callback){
      this.ds.productRef().doc(product.key).update({
        fileUrl:fileUrl
      }).then(()=>{
        callback(true)
      }).catch(error=>{
        callback(false)
      })
    }
    @action  
    fetchCategory(callback){
        this.ds.categoryRef().valueChanges().subscribe(list=>{
            callback(list);
        })
    }
    @action
    fectchData(){
        this.ds.productRef().valueChanges().subscribe(docs=>{
            this.data=docs;
        })
    }
    @action
    save(product){
        return this.ds.productRef().doc(product.key).set(product)
    }

}