import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class ViewEditService {

  editing = false;
  courseCode = ['ACCTG100'];
  comments = '';
  datePrepareFinished = 'Today';
  docEditURL = '.com';
  docPublishURL = '.pub';
  length = '108 seconds';
  lmsURL = '.com';
  parentTranscript = true;
  preparer = 'Him';
  priority = '1';
  requestDate = 'Today';
  requestNotes = 'None';
  requestor = 'Me';
  reviewer = 'Her';
  srcURL = '.com';
  step = 'Finished';
  title = 'Me';
  transcriber = 'You';
  type = 'Video';
  verbit = false;
  verbitID = '';

  id;

  constructor(private db: DatabaseService) {

  }

  async storageEdit(id) {
    this.id = id;
    const file = this.db.getTranscript(id);
    await file.then(async transcript => {
      const data = await transcript.data();
      this.comments = await data.requestNotes;
      this.courseCode = await data.courseCode;
      this.priority = await data.priority;
      this.lmsURL = await data.lmsURL;
      this.docPublishURL = await data.docPublishURL;
      this.docEditURL = await data.docEditURL;
      this.length = await data.length;
      this.preparer = await data.preparer;
      this.requestor = await data.requestor;
      this.reviewer = await data.reviewer;
      this.title = await data.title;
      this.transcriber = await data.transcriber;
      this.type = await data.type;
      this.verbit = await data.verbit;
      this.verbitID = await data.verbitID;
      this.srcURL = await data.srcURL;
      this.step = await data.status;
    });
  }

  confirmEdit() {
    const data = {
      requestNotes: this.comments,
      courseCode: this.courseCode,
      docEditURL: this.docEditURL,
      docPublishURL: this.docPublishURL,
      length: this.length,
      lmsURL: this.lmsURL,
      parentTranscript: this.parentTranscript,
      priority: this.priority,
      srcURL: this.srcURL,
      status: this.step,
      title: this.title,
      type: this.type,
      verbit: this.verbit,
      verbitID: this.verbitID,
    };
    this.db.updateTranscript(data, this.id);
  }
}
