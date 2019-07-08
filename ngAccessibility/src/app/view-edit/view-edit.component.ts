import { Component, OnInit, ViewChild } from '@angular/core';
import { ViewEditService } from '../core/view-edit.service';
import { AuthService } from '../core/auth.service';

@Component({
    selector: 'app-view-edit',
    templateUrl: './view-edit.component.html',
    styleUrls: ['./view-edit.component.css']
})

export class ViewEditComponent implements OnInit {

    @ViewChild('content') content: any;
    priorities = [
        '1',
        '2',
        '3',
        '4'
    ];
    types = [
        'Video',
        'Audio',
        'Alt Text',
        'Slide'
    ];
    stages = [
        'Ready for Prep',
        'In Prep',
        'Ready for Transcription',
        'In Transcription',
        'Ready for Review',
        'In Review',
        'Review Completed',
        'Finished'
    ];
    constructor(public storage: ViewEditService, private auth: AuthService) { }

    ngOnInit() {

    }


    async openModal(id) {
      const modal       = document.getElementById('view-modal');
      const navbar      = document.getElementById('main-nav');
      const content     = document.getElementsByTagName('main');
      modal.classList.remove('hide');
      navbar.classList.add('blur');
      for (let i = 0; i < content.length; i++) {
          content[i].classList.add('blur');
      }
      this.storage.storageEdit(id);
    }

    closeModal() {
      const modal    = document.getElementById('view-modal');
      const navbar   = document.getElementById('main-nav');
      const content  = document.getElementsByTagName('main');
      modal.classList.add('hide');
      navbar.classList.remove('blur');
      for (let i = 0; i < content.length; i++) {
          content[i].classList.remove('blur');
      }
      this.storage.editing = false;
    }
    clickedOut(event) {
      if (event.target.className === 'modal') {
          this.closeModal();
      }
    }

    confirmEdit() {
      this.storage.confirmEdit();
      this.storage.editing = false;
    }
    edit() {
      this.storage.editing = !this.storage.editing;
    }
    delete() {
      if (this.storage.delete()) {
        this.closeModal();
      }
    }
}

