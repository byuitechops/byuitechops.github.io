import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class ViewEditService {

  editing = false;
  courseCode = ['ACCTG100'];
  datePrepareFinished = 'Today';
  docEditURL = '.com';
  docPublishURL = '.pub';
  length = '108 seconds';
  lmsURL = '.com';
  parentTranscript = true;
  preparer = 'Me';
  priority = '1';
  requestDate = 'Today';
  requestNotes = 'None';
  requestor = 'Me';
  srcURL = '.com';
  step = 'Finished';
  title = 'Me';
  type = 'Video';
  verbit = false;
  verbitID = '';

  id;

  constructor(private db: DatabaseService) {

  }

  async storageEdit(id) {
    this.id = id
    const file = this.db.getTranscript(id);
    await file.then(async transcript => {
      const data = await transcript.data();
      this.title = await data.title;
      this.type = await data.type;
      this.courseCode = await data.courseCode;
      this.priority = await data.priority;
      this.lmsURL = await data.lmsURL;
      this.docPublishURL = await data.docPublishURL;
      this.docEditURL = await data.docEditURL;
      this.length = await data.length;
      this.verbit = await data.verbit;
      this.verbitID = await data.verbitID;
      this.srcURL = await data.srcURL;
    });
  }

  confirmEdit() {
    const data = {
      courseCode: this.courseCode,
      datePrepareFinished: this.datePrepareFinished,
      docEditURL: this.docEditURL,
      docPublishURL: this.docPublishURL,
      length: this.length,
      lmsURL: this.lmsURL,
      parentTranscript: this.parentTranscript,
      preparer: this.preparer,
      priority: this.priority,
      requestDate: this.requestDate,
      requestNotes: this.requestNotes,
      requestor: this.requestor,
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
