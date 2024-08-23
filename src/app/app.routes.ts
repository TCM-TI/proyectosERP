import { Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { HomeComponent } from '../home/home.component';
import { Content1Component } from '../content1/content1.component';
import { Content2Component } from '../content2/content2.component';
import { Content3Component } from '../content3/content3.component';
import { Content4Component } from '../content4/content4.component';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'home', component: HomeComponent},
    {path: 'content1', component: Content1Component},
    {path: 'content2', component: Content2Component},
    {path: 'content3', component: Content3Component},
    {path: 'content4', component: Content4Component},
    {path: '', redirectTo: '/login', pathMatch:'full'},
];
