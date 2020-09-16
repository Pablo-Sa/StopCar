import { environment } from "./../environments/environment";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { RegisterClientComponent } from "./components/register-client/register-client.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "./material.module";
import { HeaderComponent } from "./components/header/header.component";
import {
  BreakPointRegistry,
  FlexLayoutModule,
  FlexOrderStyleBuilder,
  FlexStyleBuilder,
  LayoutAlignStyleBuilder,
  LayoutStyleBuilder,
  MediaMarshaller,
  PrintHook,
  ShowHideStyleBuilder,
  StylesheetMap,
  StyleUtils,
  ɵMatchMedia,
} from "@angular/flex-layout";
import { RegisterCarsComponent } from "./components/register-cars/register-cars.component";
import { OrderServiceComponent } from "./components/order-service/order-service.component";
import { EstimateComponent } from "./components/estimate/estimate.component";
import { LogCarsComponent } from "./components/log-cars/log-cars.component";
import { LogOrderComponent } from "./components/log-order/log-order.component";
import { HeaderDialogComponent } from "./components/header-dialog/header-dialog.component";
import { FooterComponent } from "./components/footer/footer.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { ListClientsComponent } from "./components/list-clients/list-clients.component";
import { ListCarsComponent } from "./components/list-cars/list-cars.component";
import { ExclusionModalComponent } from "./components/modals/exclusion-modal/exclusion-modal.component";
import { EditModalCarsComponent } from './components/modals/edit-modal-cars/edit-modal-cars.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterClientComponent,
    HeaderComponent,
    RegisterCarsComponent,
    OrderServiceComponent,
    EstimateComponent,
    LogCarsComponent,
    LogOrderComponent,
    HeaderDialogComponent,
    FooterComponent,
    ListClientsComponent,
    ListCarsComponent,
    ExclusionModalComponent,
    EditModalCarsComponent,
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
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    StyleUtils,
    LayoutAlignStyleBuilder,
    StylesheetMap,
    MediaMarshaller,
    ɵMatchMedia,
    BreakPointRegistry,
    PrintHook,
    LayoutStyleBuilder,
    FlexStyleBuilder,
    ShowHideStyleBuilder,
    FlexOrderStyleBuilder,
  ],
  bootstrap: [AppComponent],
  entryComponents: [HeaderDialogComponent, ExclusionModalComponent,EditModalCarsComponent],
})
export class AppModule {}
