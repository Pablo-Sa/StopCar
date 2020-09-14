import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule }from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { RegisterClientComponent } from './components/register-client/register-client.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { HeaderComponent } from './components/header/header.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RegisterCarsComponent } from './components/register-cars/register-cars.component';
import { OrderServiceComponent } from './components/order-service/order-service.component';
import { EstimateComponent } from './components/estimate/estimate.component';
import { LogCarsComponent } from './components/log-cars/log-cars.component';
import { LogOrderComponent } from './components/log-order/log-order.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterClientComponent,
    HeaderComponent,
    RegisterCarsComponent,
    OrderServiceComponent,
    EstimateComponent,
    LogCarsComponent,
    LogOrderComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    FlexLayoutModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
