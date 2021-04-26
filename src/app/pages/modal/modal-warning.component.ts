import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'warning-modal',
  styleUrls: ['modal.scss'],
  template: `
    <div>
      <div class="modal-header">
        <span>{{ modalHeader }}</span>
        <button class="close" aria-label="Close" (click)="closeModal()">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
          <form>
          <div class="form-group">
            <span><label style="width:auto">{{ modalContent }}</label>
            </span>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button class="btn btn-md btn-outline-primary" (click)="closeModal()">OK</button>
      </div>
    </div>
  `,
})
export class ModalWarningComponent {
  modalHeader: string;
  modalContent: string;

  constructor(private activeModal: NgbActiveModal) { }

  closeModal() {
    this.activeModal.close();
  }
}
