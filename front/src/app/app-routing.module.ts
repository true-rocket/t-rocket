import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { RegisterComponent } from './register/register.component';
import { CabinetComponent } from './cabinet/cabinet.component';
// import { CommonModule } from '@angular/common';

const routes: Routes = [
    { path: '', redirectTo: 'welcome', pathMatch: 'full' },
    { path: 'welcome', component: WelcomeComponent },
    { path: 'cabinet', component: CabinetComponent },
    { path: 'register', component: RegisterComponent }
]

@NgModule({
    // imports: [
    //     CommonModule
    // ],
    // declarations: []
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
