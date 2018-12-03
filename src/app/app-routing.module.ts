import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { MessengerComponent } from './messenger/messenger.component';
import { PostEditorComponent } from './post-editor/post-editor.component';
import { UserComponent } from './user/user.component';
// import { CommonModule } from '@angular/common';

const routes: Routes = [
    { path: '', redirectTo: 'welcome', pathMatch: 'full' },
    { path: 'welcome', component: WelcomeComponent },
    { path: 'sign-in', component: SignInComponent },
    { path: 'sign-up', component: SignUpComponent },
    { path: 'messenger', component: MessengerComponent },
    { path: 'post-edit', component: PostEditorComponent },
    { path: 'user', component: UserComponent }
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
