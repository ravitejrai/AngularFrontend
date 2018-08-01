import { Component, ViewContainerRef } from '@angular/core';
import { Modal, BSModalContext } from 'ngx-modialog/plugins/bootstrap';
import { Overlay, overlayConfigFactory } from 'ngx-modialog';

import { AlertModal, ConfirmModal , SearchModal } from './basic.modal.component';

const dialogsMap = {
  'Alert': AlertModal,
  'Confirm': ConfirmModal,
  'Search' : SearchModal
};

@Component({
  selector: 'app-dialog',
  template: `<a></a>`
})

export class ModalPopupFactory {
  constructor(private modalService: Modal, overlay: Overlay) { 
    this.modalService.overlay = overlay;
  }

  open(key: string, viewRef: ViewContainerRef, data?: any) {
    return this.modalService.open(dialogsMap[key], overlayConfigFactory(data, BSModalContext));
  }
}