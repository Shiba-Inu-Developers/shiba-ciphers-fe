import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HomeComponent } from './pages/home/home.component';
import { CipherComponent } from './pages/cipher/cipher.component';
import { TextAreaComponent } from './components/text-area/text-area.component';
import { UploadImageComponent } from './components/upload-image/upload-image.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { SignUpComponent } from './pages/auth/sign-up/sign-up.component';
import { AuthInterceptor } from './pages/auth/interceptor.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { VerifyOtpComponent } from './pages/auth/verify-otp/verify-otp.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ModalComponent } from './components/modal/modal.component';
import { ModalService } from './components/modal/modal.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StepperComponent } from './pages/stepper/stepper.component';
import { CipherTextComponent } from './pages/cipher-text/cipher-text.component';
import { CipherKeyComponent } from './pages/cipher-key/cipher-key.component';
import { AuthGuard } from './pages/auth/auth.guard';
import {MyDocumentsComponent} from "./pages/my-documents/my-documents.component";
import { S1ClassificationComponent } from './pages/s1-classification/s1-classification.component';
import { S2tSegmentationComponent } from './pages/s2t-segmentation/s2t-segmentation.component';
import { S3tDecryptComponent } from './pages/s3t-decrypt/s3t-decrypt.component';
import { S2kUploadComponent } from './pages/s2k-upload/s2k-upload.component';
import { S3kSegmentationDecryptComponent } from './pages/s3k-segmentation-decrypt/s3k-segmentation-decrypt.component';
import { S4DecipherComponent } from './pages/s4-decipher/s4-decipher.component';
import { S5DecipherResultComponent } from './pages/s5-decipher-result/s5-decipher-result.component';
import {KeyStepperComponent} from "./pages/key-stepper/key-stepper.component";
import {TextStepperComponent} from "./pages/text-stepper/text-stepper.component";
import {ImageService} from "./services/image.service";

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
    ProfileComponent,
    ModalComponent,
    StepperComponent,
    KeyStepperComponent,
    TextStepperComponent,
    CipherTextComponent,
    CipherKeyComponent,
    MyDocumentsComponent,
    S1ClassificationComponent,
    S2tSegmentationComponent,
    S3tDecryptComponent,
    S2kUploadComponent,
    S3kSegmentationDecryptComponent,
    S4DecipherComponent,
    S5DecipherResultComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
  ],
  providers: [
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
