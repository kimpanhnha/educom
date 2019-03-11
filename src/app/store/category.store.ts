import { ICategory } from './../interfaces/category';
import { Injectable } from "@angular/core";
import { observable, action } from 'mobx-angular';
import { DataService } from '../services/data.service';
import { callbackify } from 'util';


@Injectable()
export class Category {
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
    add(item:ICategory){
       return this.ds.categoryRef().doc(item.key).set(item)
    }
    @action 
    fetchData(){
        this.loading=true;
        this.ds.categoryRef().valueChanges().subscribe(docs=>{
            this.data=docs;
            this.empty=docs.length===0;
            this.loading=false;
        })
    }
    @action
    delete(item,callback){
        this.process=true;
        this.ds.categoryRef().doc(item.key).delete()
        .then(()=>{
            this.process=false;
            callback(true,null);
        }).catch(error=>{
            this.process=false;
            callback(false,error)
        })
    }

}