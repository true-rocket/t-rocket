import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// import { HttpRequest, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { WelcomeComponent } from './welcome/welcome.component';
import { RegisterComponent } from './register/register.component';
import { CabinetComponent } from './cabinet/cabinet.component';
import { ProfileComponent } from './cabinet/profile/profile.component';
import { TransportComponent } from './cabinet/transport/transport.component';
import { RouteComponent } from './cabinet/route/route.component';
import { HistoryComponent } from './cabinet/history/history.component';

@NgModule({
    declarations: [
        AppComponent,
        WelcomeComponent,
        RegisterComponent,
        CabinetComponent,
        ProfileComponent,
        TransportComponent,
        RouteComponent,
        HistoryComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpClientModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
