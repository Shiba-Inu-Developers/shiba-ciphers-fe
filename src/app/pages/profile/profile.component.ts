import { Component, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { Subject, pipe } from 'rxjs';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import {
  NgbActiveModal,
  NgbModal,
  NgbModalRef,
} from '@ng-bootstrap/ng-bootstrap';
import { ModalService } from 'src/app/components/modal/modal.service';
import { takeUntil } from 'rxjs/operators';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  // private readonly ngUnsubscribe = new Subject();
  @Input() user: any;
  reset: Subject<boolean> = new Subject<boolean>();
  modalRef: NgbModalRef | undefined;

  constructor(
    private modalService: ModalService,
    private viewContainerRef: ViewContainerRef,
    private profileService: ProfileService,
    private ngModal: NgbModal
  ) {}

  ngOnInit() {
    console.log('ProfileComponent');
    this.profileService.getUserInfo(this.user.id).subscribe((userInfo) => {
      this.user = userInfo;
    });
  }

  onDeletePic(): void {
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
      }
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
