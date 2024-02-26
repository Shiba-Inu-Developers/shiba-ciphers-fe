import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { Subject, pipe } from 'rxjs';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import {
  NgbActiveModal,
  NgbModal,
  NgbModalRef,
} from '@ng-bootstrap/ng-bootstrap';
import { ModalService } from 'src/app/components/modal/modal.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  // private readonly ngUnsubscribe = new Subject();
  reset: Subject<boolean> = new Subject<boolean>();
  modalRef: NgbModalRef | undefined;
  constructor(
    private modalService: ModalService,
    private viewContainerRef: ViewContainerRef,
    private ngModal: NgbModal
  ) {}

  ngOnInit() {
    console.log('ProfileComponent');
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
        this.ngOnInit();
      } else {
        console.log('Formulár nebol odoslaný.');
      }
    });
  }
  onEditPic(e: any): void {}
}
