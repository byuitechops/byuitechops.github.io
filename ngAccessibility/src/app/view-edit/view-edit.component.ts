import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-edit',
  templateUrl: './view-edit.component.html',
  styleUrls: ['./view-edit.component.css']
})
export class ViewEditComponent implements OnInit {
  viewOpen: boolean;
  copied: boolean;
  courseCode;
  datePrepareFinished;
  docEditURL: string;
  docPublishURL: string;
  length: number;
  lmsURL: string;
  parentTranscript: boolean;
  preparer: string;
  priority: number;
  requestDate: string;
  requestNotes: string;
  requestor: string;
  srcURL: string;
  status: string;
  title: string;
  type: string;
  verbit: boolean;
  verbitID: string;

  constructor() { }

  ngOnInit() {
  }
  async openModal(data) {
    this.viewOpen = true;
  }
  closeModal() {
    this.viewOpen = false;
  }

}
