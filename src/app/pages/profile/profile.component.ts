import { Component, Input, ViewChild, ViewContainerRef, AfterViewInit } from '@angular/core';
import {Subject, pipe, Observable} from 'rxjs';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import {
  NgbActiveModal,
  NgbModal,
  NgbModalRef,
} from '@ng-bootstrap/ng-bootstrap';
import { ModalService } from 'src/app/components/modal/modal.service';
import { takeUntil } from 'rxjs/operators';
import {User} from "oidc-client";
import {UserService} from "../../services/user.service";
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements AfterViewInit {

  firstName = '';
  lastName = '';
  email = '';

  // private readonly ngUnsubscribe = new Subject();
  @Input() user: any;
  reset: Subject<boolean> = new Subject<boolean>();
  modalRef: NgbModalRef | undefined;

  constructor(
    private modalService: ModalService,
    private viewContainerRef: ViewContainerRef,
    private profileService: ProfileService,
    private userService: UserService,
    private ngModal: NgbModal
  ) {}

  ngOnInit() {
    console.log('ProfileComponent');
  }

  ngAfterViewInit(): void {
    this.userService.getUser().subscribe({
      next: (data) => {
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.email = data.email;
      },
      error: (error) => console.error('There was an error!', error)
    });
  }

  onDeletePic(e: any): void {
    const modal = this.ngModal.open(ModalComponent);
    modal.componentInstance.modalTitle = 'Odstránenie profilovej fotografie';
    modal.componentInstance.modalText =
      'Ste si istí, že chcete odstrániť profilovú fotografiu?';
    modal.componentInstance.submitText = 'Odstrániť';
    modal.componentInstance.cancelText = 'Zrušiť';
    modal.componentInstance.submitModal.subscribe((isSubmitted: boolean) => {
      if (isSubmitted) {
        console.log('Profilová fotografia bola odstránená.');
        this.profileService.deletePic(this.user.id);
        this.ngOnInit();
      } else {
        console.log('Formulár nebol odoslaný.');
      }
    });
  }
  onEditPic(e: any): void {}

  onEditData(): void {
    let userData = {
      firstName: this.firstName,
      lastName: this.lastName,
    };
    this.userService.putUser(userData).subscribe({
      next: (data) => {
        this.firstName = data.firstName;
        this.lastName = data.lastName;
      },
      error: (error) => console.error('There was an error!', error)
    });
  }


  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const imageBlob = e.target.result;
        this.profileService.editPic(this.user.id, imageBlob);
      };
      reader.readAsDataURL(file);
    }
  }

  onUpdateProfile(
    id: number,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    phoneNumber: string
  ): void {
    this.profileService.updatePost(
      id,
      email,
      password,
      firstName,
      lastName,
      phoneNumber
    );
  }
}
