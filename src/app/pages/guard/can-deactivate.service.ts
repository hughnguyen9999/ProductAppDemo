import { CanDeactivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ShareDataService } from '../products/share-data.service';
import { ModalWarningComponent } from '../modal/modal-warning.component';

export interface ComponentCanDeactivate {
  canDeactivate: () => boolean | Observable<boolean>;
}

@Injectable()
export class PendingChangesGuard implements CanDeactivate<ComponentCanDeactivate> {
  constructor(private modalService: NgbModal, private shareDataService: ShareDataService) { }
  changed: boolean;
  error: boolean;

  canDeactivate(component: ComponentCanDeactivate): boolean | Promise<boolean> {
    // if there are no pending changes, just allow deactivation; else confirm first
    if (!component.canDeactivate()) {
      const activeModal = this.modalService.open(ModalWarningComponent, { size: 'lg', container: 'nb-layout' });
      activeModal.componentInstance.modalHeader = 'There are unsaved changes';
      activeModal.componentInstance.modalContent = 'You have unsaved changes. Press Cancel to go back and save these changes, or OK to lose these changes';
      return activeModal.result;
    }
    return true;
  }
}
