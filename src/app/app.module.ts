import { APP_SERVICES } from './services/app.service';
import { APP_STORE } from './store/app.store';
import { APP_DIALOG } from './dialog/app.dialog';
import { AuthService } from './auth/auth.service';
import { MATERIAL_MODULE,} from './material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppLayoutComponent } from './share/app-layout/app-layout.component';
import { LoginLayoutComponent } from './share/login-layout/login-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { AdministratorComponent } from './pages/administrator/administrator.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import 'firebase/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './auth/auth.guard';
import { HeaderComponent } from './share/header/header.component';
import { CategoryComponent } from './pages/category/category.component';
import { ProductComponent } from './pages/product/product.component';
import { SideBarComponent } from './share/side-bar/side-bar.component';
import { AddCategoryComponent } from './dialog/add-category/add-category.component';
import { MobxAngularModule } from 'mobx-angular';
import { DeleteComponent } from './components/delete/delete.component';
import { AddProductComponent } from './dialog/add-product/add-product.component';
import { UploadCoverComponent } from './dialog/upload-cover/upload-cover.component';

@NgModule({
  declarations: [
    AppComponent,
    AppLayoutComponent,
    LoginLayoutComponent,
    HomeComponent,
    LoginComponent,
    AdministratorComponent,
    HeaderComponent,
    CategoryComponent,
    ProductComponent,
    SideBarComponent,
    AddCategoryComponent,
    DeleteComponent,
    AddProductComponent,
    UploadCoverComponent
  ],
  entryComponents: [
    APP_DIALOG
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MobxAngularModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase, 'my-app-name'), // imports firebase/app needed for everything
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    MATERIAL_MODULE
  ],
  providers: [AuthGuard, AuthService, APP_SERVICES, APP_STORE],
  bootstrap: [AppComponent]
})
export class AppModule { }
