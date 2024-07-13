import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StorageService } from './services/storage.service';
import { JwtModule } from "@auth0/angular-jwt";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpService } from './services/http.service';
import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { ToasterUtilService } from './services/toasteUtilr.service';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    JwtModule.forRoot({
      config: {
        allowedDomains: ["http://localhost:4200/"],
      },
    }),
    NgbModule,
    HttpClientModule,
    ToastrModule.forRoot(),

  ],
  providers: [
    StorageService,
    HttpService,
    AuthGuard,
    AuthService,
    ToasterUtilService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
