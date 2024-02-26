import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  @Input() modalTitle: string | undefined;
  @Input() modalText: string | undefined;
  @Input() submitText: string | undefined;
  @Input() cancelText: string | undefined;
  @Output() submitModal = new EventEmitter<boolean>();

  constructor(private modalRef: NgbActiveModal) {}

  ngOnInit() {}

  close() {
    // Zavrie modalne okno
    this.modalRef.close();
  }

  onCancel() {
    // Vykona akciu pred zatvorením modálneho okna
    this.modalRef.close();
  }

  onSubmit() {
    this.submitModal.emit(true);
    // Vykona akciu pred zatvorením modálneho okna
    this.modalRef.close();
  }
}
