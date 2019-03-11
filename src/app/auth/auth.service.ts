import { CanActivate } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { PARAMETERS } from '@angular/core/src/util/decorators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth) { } 

  CanActivate(){
    const {currentUser}=this.auth.auth
    if(currentUser){
      return true;
    }
    return false;
  }
  signInWithEmail(email, password){
    return this.auth.auth.signInWithEmailAndPassword(email, password);
  }

  signOut(){
    return this.auth.auth.signOut();
  }
  onCanActive(){
    this.auth.auth.onAuthStateChanged(user=>{
      if(user){

      }
    })
  }
  getUser(){
    const {currentUser}=this.auth.auth
    if(currentUser){
      const {uid,email,displayName}=currentUser;
    
  return{
    uid,email,displayName
  }
  }
  return null;
}
}
 