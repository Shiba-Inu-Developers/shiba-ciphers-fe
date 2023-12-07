import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NotFoundComponent} from './pages/not-found/not-found.component';
import {HomeComponent} from './pages/home/home.component';
import {LoginComponent} from './pages/auth/login/login.component';
import {SignUpComponent} from './pages/auth/sign-up/sign-up.component';
import {CipherComponent} from './pages/cipher/cipher.component';
import {VerifyOtpComponent} from "./pages/auth/verify-otp/verify-otp.component";

//******Setting url direction of pages*******/
const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    // canActivate: [AuthGuard], //Pridat AuthGuard aby sa zobrazovalo len to co je potrebne
  },
  {path: 'login', component: LoginComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'cipher', component: CipherComponent},
  {path: 'otp-verification', component: VerifyOtpComponent},
  {path: '404', component: NotFoundComponent},
  {path: '', component: HomeComponent},
  {path: '**', redirectTo: '/404'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
