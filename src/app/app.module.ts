import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NotFoundComponent} from './pages/not-found/not-found.component';
import {HomeComponent} from './pages/home/home.component';
import {CipherComponent} from './pages/cipher/cipher.component';
import {TextAreaComponent} from './components/text-area/text-area.component';
import {UploadImageComponent} from './components/upload-image/upload-image.component';
import {LoginComponent} from './pages/auth/login/login.component';
import {SignUpComponent} from './pages/auth/sign-up/sign-up.component';
import {AuthInterceptor} from './pages/auth/interceptor.interceptor';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {VerifyOtpComponent} from './pages/auth/verify-otp/verify-otp.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    HomeComponent,
    CipherComponent,
    TextAreaComponent,
    UploadImageComponent,
    LoginComponent,
    SignUpComponent,
    HeaderComponent,
    FooterComponent,
    VerifyOtpComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
