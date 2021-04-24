import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'warning-modal',
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
      <button class="btn btn-md btn-outline-warning" (click)="confirmModal(true)">OK</button>
      <button class="btn btn-md btn-outline-warning" (click)="confirmModal(false)">Cancel</button>
    </div>
  `,
})
export class ModalWarningComponent {
  modalHeader: string;
  modalContent: string;

  constructor(private activeModal: NgbActiveModal) { }

  confirmModal(result) {
    this.activeModal.close(result);
    return result;
  }
}
