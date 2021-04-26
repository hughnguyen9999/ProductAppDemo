import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'change-guard-modal',
  styleUrls: ['modal.scss'],
  template: `
    <div class="modal-header">
      <span>{{ modalHeader }}</span>
      <button class="close" aria-label="Close" (click)="confirmModal(false)">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      {{ modalContent }}
    </div>
    <div class="modal-footer">
      <button class="btn btn-md btn-outline-danger" (click)="confirmModal(true)">Leave</button>
      <button class="btn btn-md btn-outline-success" (click)="confirmModal(false)">Stay</button>
    </div>
  `,
})
export class ModalChangeGuardComponent {

  modalHeader: string;
  modalContent: string;

  constructor(private activeModal: NgbActiveModal) { }

  confirmModal(result) {
    this.activeModal.close(result);
    return result;
  }
}
