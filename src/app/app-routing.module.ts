import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { SignUpComponent } from './pages/auth/sign-up/sign-up.component';
import { CipherComponent } from './pages/cipher/cipher.component';
import { VerifyOtpComponent } from './pages/auth/verify-otp/verify-otp.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AuthGuard } from './pages/auth/auth.guard';
import { MyDocumentsComponent } from './pages/my-documents/my-documents.component';
import { S1ClassificationComponent } from './pages/s1-classification/s1-classification.component';
import { KeyStepperComponent } from './pages/key-stepper/key-stepper.component';
import { TextStepperComponent } from './pages/text-stepper/text-stepper.component';

//******Setting url direction of pages*******/
const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'tutorial-classification',
    component: S1ClassificationComponent,
    // canActivate: [AuthGuard], //Pridat AuthGuard aby sa zobrazovalo len to co je potrebne
  },
  {
    path: 'tutorial-key-stepper',
    component: KeyStepperComponent,
    // canActivate: [AuthGuard], //Pridat AuthGuard aby sa zobrazovalo len to co je potrebne
  },
  {
    path: 'tutorial-text-stepper',
    component: TextStepperComponent,
    // canActivate: [AuthGuard], //Pridat AuthGuard aby sa zobrazovalo len to co je potrebne
  },
  {
    path: 'my-documents',
    component: MyDocumentsComponent,
    canActivate: [AuthGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  {
    path: 'classification',
    component: S1ClassificationComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'key-stepper',
    component: KeyStepperComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'text-stepper',
    component: TextStepperComponent,
    canActivate: [AuthGuard],
  },
  { path: 'otp-verification', component: VerifyOtpComponent },
  { path: '404', component: NotFoundComponent },
  { path: '', component: HomeComponent },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
